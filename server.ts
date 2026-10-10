import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculateDeterministicTrustScore, generateDefaultTrustGraph } from './src/utils/trustEngine.ts';
import { GeminiExplanation, TrustGraphData } from './src/types.ts';

dotenv.config();

const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'TRUSTLENS AI Threat Engine',
    geminiConfigured: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

// URL Inspection endpoint
app.post('/api/url-inspect', (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  try {
    let normalized = url.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = 'https://' + normalized;
    }

    const parsed = new URL(normalized);
    const hostname = parsed.hostname.toLowerCase();
    const parts = hostname.split('.');
    const tld = parts[parts.length - 1];

    const suspiciousTlds = ['xyz', 'top', 'vip', 'cc', 'online', 'site', 'fun', 'buzz', 'icu', 'club', 'tk', 'ml', 'cf', 'gq'];
    const knownBrands = ['sbi', 'hdfc', 'icici', 'axis', 'paytm', 'tneb', 'indiapost', 'airtel', 'jio', 'amazon', 'flipkart', 'netflix', 'google'];

    const hasSuspiciousTld = suspiciousTlds.includes(tld);
    const spoofedBrand = knownBrands.find(b => hostname.includes(b) && !hostname.endsWith(`.${b}.com`) && !hostname.endsWith(`.${b}.co.in`) && hostname !== `${b}.com` && hostname !== `${b}.co.in`);
    const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
    const hasMultipleSubdomains = parts.length > 3;

    res.json({
      originalUrl: url,
      normalizedUrl: normalized,
      hostname,
      tld,
      protocol: parsed.protocol,
      pathname: parsed.pathname,
      searchParams: Object.fromEntries(parsed.searchParams.entries()),
      indicators: {
        hasSuspiciousTld,
        spoofedBrand: spoofedBrand || null,
        isIpAddress,
        hasMultipleSubdomains,
      },
    });
  } catch (err: any) {
    console.warn('URL inspection format validation warning');
    const isProd = process.env.NODE_ENV === 'production';
    res.status(400).json({
      error: 'Invalid URL format',
      ...(isProd ? {} : { details: err?.message }),
    });
  }
});

// Main Analysis Endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const {
      type = 'message',
      text = '',
      url = '',
      imageBase64 = '',
      mimeType = 'image/png',
      language = 'en',
    } = req.body;

    const combinedInput = `${text} ${url}`.trim();

    // 1. Calculate deterministic score and base graph
    const deterministicScore = calculateDeterministicTrustScore(combinedInput, url);
    const baseGraph = generateDefaultTrustGraph(combinedInput, deterministicScore);

    // 2. Query Gemini for deep cognitive and multimodal threat analysis
    let geminiExplanation: GeminiExplanation;
    let trustGraph: TrustGraphData = baseGraph;

    if (ai) {
      try {
        const langInstructions: Record<string, string> = {
          en: "Explain in fluent, authoritative English.",
          ta: "Explain in clear, respectful Tamil (தமிழ்) script.",
          hi: "Explain in clear, formal Hindi (हिन्दी) script.",
          hinglish: "Explain in conversational Hinglish (Hindi written in Roman/English alphabet, popular among Indian youth and internet users).",
          tanglish: "Explain in conversational Tanglish (Tamil written in Roman/English alphabet, popular among Tamil smartphone users).",
        };

        const targetLangInstruction = langInstructions[language] || langInstructions.en;

        const systemPrompt = `You are TRUSTLENS AI, a world-class cyber threat intelligence investigator and anti-phishing forensic specialist.
Your mission is to rigorously analyze suspicious messages, phishing URLs, fake SMS alerts, extortion demands, part-time job scams, and forged documents/screenshots.

You must provide your analysis as a strictly valid JSON object matching this schema:
{
  "threatType": "String (e.g., 'Digital Arrest / Police Impersonation Scam', 'Bank KYC Suspension Phishing', 'Task-Based Telegram Deposit Ponzi', 'Electricity Disconnection Extortion', 'Unsolicited Lottery / Advance-Fee Fraud')",
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "SAFE",
  "summary": "String (A direct, high-impact 2-3 sentence verdict explaining if this is dangerous and why, written in: ${targetLangInstruction})",
  "psychologicalTactics": ["Array of 3-4 strings detailing psychological levers e.g., 'Manufactured False Urgency with 12AM Deadline', 'Authority Exploitation using CBI / Customs Insignia', 'Fear of Disconnection or Legal Prosecution', 'Greed Allure with Guaranteed Daily Income']",
  "redFlags": ["Array of 4-6 specific technical and behavioral red flags extracted directly from the input"]",
  "modusOperandi": "String (Paragraph dissecting the attacker's step-by-step game plan and how victims are financially exploited)",
  "counterMeasures": ["Array of 4-5 immediate, actionable instructions for the victim, written in ${targetLangInstruction}"]",
  "urgencyTactics": "String describing the specific deadline or coercion used",
  "credentialRisk": "String detailing what specific credentials, OTPs, or funds the attacker attempts to harvest",
  "graphNodes": [
    {
      "id": "String (e.g. 'actor_1', 'domain_1', 'asset_1', 'tactic_1')",
      "label": "String (Short clean name e.g. 'Fake SBI SMS Gateway', 'phish-sbi.xyz', 'Target: Netbanking OTP')",
      "category": "actor" | "domain" | "credential" | "vector" | "platform" | "victim_impact",
      "riskLevel": "critical" | "moderate" | "safe",
      "description": "String (Forensic description)"
    }
  ],
  "graphEdges": [
    {
      "id": "String",
      "source": "String (matching node id)",
      "target": "String (matching node id)",
      "label": "String (e.g. 'Impersonates', 'Lures To', 'Demands', 'Exfiltrates')",
      "threatLevel": "critical" | "moderate" | "safe"
    }
  ]
}

Language formatting rule: The fields "summary", "counterMeasures", "psychologicalTactics", and "redFlags" MUST strictly adhere to the requested language (${language}: ${targetLangInstruction}).
Return ONLY the raw JSON with no markdown backticks or markdown fences.`;

        let contents: any;

        if (imageBase64) {
          // Multimodal image/PDF analysis
          const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
          contents = {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'image/png',
                  data: cleanBase64,
                },
              },
              {
                text: `Analyze this image/screenshot/document for cyber fraud, fake logos, phishing links, forged stamps, or extortion threats.
User context notes: ${combinedInput || 'None provided'}
Analysis language preference: ${language}`,
              },
            ],
          };
        } else {
          contents = `Perform comprehensive threat analysis on the following suspicious input:
Input Type: ${type}
Content: "${combinedInput}"
Analysis language preference: ${language}`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '';
        let parsed: any;
        try {
          parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (_parseError) {
          console.warn('Direct JSON parse format discrepancy, attempting recovery extraction');
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          }
        }

        if (parsed) {
          geminiExplanation = {
            threatType: parsed.threatType || (deterministicScore.riskLevel === 'critical' ? 'High-Risk Cyber Scam' : 'Low-Risk Communication'),
            severity: parsed.severity || (deterministicScore.riskLevel === 'critical' ? 'CRITICAL' : 'LOW'),
            summary: parsed.summary || 'Threat analysis completed.',
            psychologicalTactics: parsed.psychologicalTactics || ['Artificial Urgency', 'Authority Exploitation'],
            redFlags: parsed.redFlags || ['Unverified contact channel', 'Suspicious link'],
            modusOperandi: parsed.modusOperandi || 'Attacker uses deception to illicitly extract funds or private credentials.',
            counterMeasures: parsed.counterMeasures || [
              'Do not click any embedded links or provide OTPs.',
              'Block the sender immediately on SMS/WhatsApp.',
              'If money was deducted, call Cyber Helpline 1930 within the Golden Hour.',
              'Report the incident to the official portal at cybercrime.gov.in.'
            ],
            urgencyTactics: parsed.urgencyTactics || 'Artificial deadline to bypass scrutiny.',
            credentialRisk: parsed.credentialRisk || 'Banking credentials, OTP, or identity documents.',
          };

          if (Array.isArray(parsed.graphNodes) && parsed.graphNodes.length > 0) {
            // Assign spatial coordinates to graph nodes for visualization
            const nodesWithCoords = parsed.graphNodes.map((n: any, idx: number) => {
              const total = parsed.graphNodes.length;
              const angle = (idx / total) * 2 * Math.PI;
              const radius = 180;
              return {
                ...n,
                x: 380 + Math.cos(angle) * radius,
                y: 220 + Math.sin(angle) * radius,
              };
            });

            trustGraph = {
              nodes: nodesWithCoords,
              edges: Array.isArray(parsed.graphEdges) ? parsed.graphEdges : baseGraph.edges,
            };
          }
        } else {
          throw new Error('Failed to parse Gemini output structure');
        }
      } catch (_geminiError: any) {
        console.warn('Gemini API call unavailable or timed out, executing deterministic fallback intelligence');
        geminiExplanation = buildDeterministicExplanation(combinedInput, deterministicScore, language);
      }
    } else {
      // Offline/Deterministic fallback
      geminiExplanation = buildDeterministicExplanation(combinedInput, deterministicScore, language);
    }

    const result = {
      id: 'scan_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      type,
      inputContent: combinedInput,
      language,
      trustScore: deterministicScore,
      geminiExplanation,
      trustGraph,
    };

    res.json(result);
  } catch (error: any) {
    console.error('Threat analysis pipeline execution failed safely');
    const isProd = process.env.NODE_ENV === 'production';
    res.status(500).json({
      error: 'Internal analysis error',
      ...(isProd ? {} : { details: error?.message }),
    });
  }
});

function buildDeterministicExplanation(
  input: string,
  score: ReturnType<typeof calculateDeterministicTrustScore>,
  lang: string
): GeminiExplanation {
  const isScam = score.riskLevel === 'critical';
  const isModerate = score.riskLevel === 'moderate';

  let threatType = 'Legitimate or Low-Risk Communication';
  if (isScam) {
    if (/cbi|police|narcotics|arrest|customs/i.test(input)) {
      threatType = 'Digital Arrest & Law Enforcement Impersonation Scam';
    } else if (/sbi|hdfc|icici|yono|kyc|bank|account.*block/i.test(input)) {
      threatType = 'Deceptive Bank KYC Revocation & Phishing Trap';
    } else if (/electricity|power|tneb|disconnection/i.test(input)) {
      threatType = 'Urgent Electricity Bill Disconnection Extortion';
    } else if (/job|earn.*daily|youtube like|telegram manager/i.test(input)) {
      threatType = 'Part-Time Task Deposit & Ponzi Fraud';
    } else {
      threatType = 'Credential Harvesting & Social Engineering Vector';
    }
  } else if (isModerate) {
    threatType = 'Unverified Communication with Behavioral Anomalies';
  }

  // Localized summaries
  let summary = `This input has been analyzed with a deterministic trust score of ${score.finalScore}/100. `;
  if (isScam) {
    if (lang === 'ta') {
      summary = `எச்சரிக்கை! இந்த செய்தி மிகவும் ஆபத்தான மோசடி (${score.finalScore}/100). வங்கி அல்லது அரசு அதிகாரிகளைப் போல நடித்து உங்கள் பணம் அல்லது OTP ஐ திருட முயற்சிக்கிறார்கள். எந்த இணைப்பையும் தொடாதீர்கள்!`;
    } else if (lang === 'hi') {
      summary = `सावधान! यह एक प्रमाणित साइबर फ्रॉड है (ट्रस्ट स्कोर: ${score.finalScore}/100)। इसमें भय और नकली पहचान का सहारा लेकर आपसे गोपनीय जानकारी या पैसे ऐंठने की कोशिश की जा रही है।`;
    } else if (lang === 'hinglish') {
      summary = `WARNING! Yeh ek confirmed high-risk scam hai (Trust Score: ${score.finalScore}/100). Scammer aapko darr ya lalach dikhakar fake link par click karwana chahta hai. Bilkul reply mat karein!`;
    } else if (lang === 'tanglish') {
      summary = `ALERT! Idhu oru confirmed scam message (Trust Score: ${score.finalScore}/100). Bayam kaati illa fake link kuduthu unga bank account details edukka pakkuranga. Reply pannathinga!`;
    } else {
      summary = `CRITICAL THREAT: Verified scam pattern detected with a Trust Score of ${score.finalScore}/100. Employs coercion and deceptive identity to harvest sensitive credentials or siphon funds.`;
    }
  } else {
    summary = `Input evaluated with a safe Trust Score of ${score.finalScore}/100. No immediate high-risk coercion or phishing indicators detected. Always remain vigilant.`;
  }

  return {
    threatType,
    severity: isScam ? 'CRITICAL' : isModerate ? 'MEDIUM' : 'SAFE',
    summary,
    psychologicalTactics: isScam ? [
      'Artificial Countdown to bypass cognitive evaluation',
      'Authority Intimidation (Police, Bank, or Public Utility impersonation)',
      'Threat of Service Severance or Arrest'
    ] : ['Standard informational tone'],
    redFlags: score.deductions.map(d => `${d.title}: ${d.description}`),
    modusOperandi: isScam 
      ? 'The perpetrator contacts the target via unverified channels, triggers panic via fabricated penalties, and channels the victim toward fake payment gateways or malicious APK installations.'
      : 'Standard communication devoid of suspicious domain redirects or credential harvesting triggers.',
    counterMeasures: [
      'NEVER share OTP, NetBanking passwords, or UPI PIN with anyone.',
      'Do not click the provided link or install any APK/AnyDesk software.',
      'Verify directly through official bank apps or call 1930 Cyber Helpline immediately if money was transferred.',
      'Report the phishing number or domain at https://cybercrime.gov.in.'
    ],
    urgencyTactics: isScam ? 'Manufactured urgency with immediate consequences promised.' : 'None detected.',
    credentialRisk: isScam ? 'NetBanking OTP, UPI authentication PIN, Aadhaar/PAN data.' : 'Minimal risk.',
  };
}

// Vite Dev Server / Static Production Server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TRUSTLENS AI] Server operational at http://0.0.0.0:${PORT}`);
  });
}

startServer();
