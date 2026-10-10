import { TrustScoreBreakdown, ScoreDeduction, RiskLevel, TrustGraphData, GraphNode, GraphEdge, Language } from '../types';

interface RegexRule {
  category: string;
  title: string;
  penalty: number;
  description: string;
  regex: RegExp;
}

const ENGINE_RULES: RegexRule[] = [
  // 1. High Urgency & Coercion Tactics
  {
    category: "Urgency & Coercion",
    title: "Artificial Immediacy & Pressure Deadline",
    penalty: 20,
    description: "Imposes an artificial ticking clock to induce panic and bypass logical scrutiny.",
    regex: /\b(turant|udane|udaneyaaga|immediately|urgent|urgently|within 24 hours|within 2 hours|aaj raat|today midnight|last warning|final notice|immediate effect|expir(es|ing) soon)\b/i
  },
  {
    category: "Urgency & Coercion",
    title: "Service Disconnection or Account Suspension Threat",
    penalty: 25,
    description: "Threatens punitive disruption of essential services like electricity, banking, or SIM card.",
    regex: /\b(block ho jayega|disconnect|suspended|deactivated|cut aaidum|power supply.*disconnect|sim.*block|account.*freeze|terminated|seizure)\b/i
  },
  {
    category: "Legal & Enforcement Intimidation",
    title: "Law Enforcement / Digital Arrest Coercion",
    penalty: 35,
    description: "Impersonates police, CBI, Customs, Narcotics Control Bureau, or court to fabricate criminal liability.",
    regex: /\b(cbi|narcotics|police|arrest warrant|court order|mumbai customs|taiwan parcel|skype call|digital arrest|dcp|crime branch|ed notice|investigation agency)\b/i
  },

  // 2. Financial & Credential Harvesting
  {
    category: "Credential Harvesting",
    title: "High-Risk Credential or Identity Document Demand",
    penalty: 30,
    description: "Demands sensitive authentication tokens or national identity documents.",
    regex: /\b(otp|one time password|pin|upi pin|cvv|netbanking password|seed phrase|private key|aadhaar|pan card|pan verification|login credential)\b/i
  },
  {
    category: "Financial Vectors",
    title: "Advance Fee or Unsolicited Redelivery Charge",
    penalty: 25,
    description: "Demands a small upfront fee (e.g., ₹25, ₹100, $5) which is used to siphon cards or UPI access.",
    regex: /\b(redelivery fee|processing fee|nominal charge|advance deposit|security deposit|refundable fee|pay ₹\d+|recharge task)\b/i
  },

  // 3. Unrealistic Financial Allure & Task Scams
  {
    category: "Social Engineering",
    title: "Work-From-Home Task / Daily Yield Scam",
    penalty: 25,
    description: "Lures victims with disproportionately high payouts for trivial digital tasks (YouTube likes, reviews).",
    regex: /\b(earn (₹|\$)?\d{3,5}.*daily|part-?time (remote )?job|youtube like|google map review|hotel review|vip task|daily income|telegram manager|telegram admin|vip group)\b/i
  },
  {
    category: "Social Engineering",
    title: "Lottery / Prize / Impersonated Scheme Allure",
    penalty: 25,
    description: "Claims victim won a lottery, prize, or special subsidy without prior entry.",
    regex: /\b(lottery|congratulations you won|kbc|kaun banega crorepati|lucky draw|pm kisan.*subsidy|claim your prize|won.*lakhs)\b/i
  },

  // 4. Insecure / Suspicious Contact Channels
  {
    category: "Channel Anomalies",
    title: "Redirection to Encrypted Channels (Telegram/WhatsApp)",
    penalty: 20,
    description: "Directs victim off official platforms into untraceable Telegram handles or private WhatsApp numbers.",
    regex: /(@[a-zA-Z0-9_]{4,}|t\.me\/[a-zA-Z0-9_]+|wa\.me\/|contact officer \d{10}|call officer \d{10})/i
  },

  // 5. URL & Domain Anomalies
  {
    category: "Domain & Technical Vectors",
    title: "High-Risk Disposable Top-Level Domain (TLD)",
    penalty: 25,
    description: "Uses known cheap, abuse-prone TLDs (.xyz, .top, .vip, .cc, .online, .site, .icu).",
    regex: /https?:\/\/[^\s\/$.?#].[^\s]*\.(xyz|top|vip|cc|online|site|fun|buzz|icu|info|work|club|link|tk|ml|ga|cf|gq)\b/i
  },
  {
    category: "Domain & Technical Vectors",
    title: "Brand Spoofing / Typosquatting in URL",
    penalty: 30,
    description: "Embeds recognized enterprise or government brand names within counterfeit domain strings.",
    regex: /https?:\/\/[^\s\/$.?#]*(sbi-yono|sbi-kyc|hdfc-netbanking|hdfc-secure|icici-login|indiapost-|tneb-bill|paytm-kyc|airtel-5g|tatapower-pay|rbi-sachet)[^\s]*/i
  },
  {
    category: "Domain & Technical Vectors",
    title: "Opaque Shortlink Redirection",
    penalty: 15,
    description: "Employs URL shortener to conceal the final destination server.",
    regex: /https?:\/\/(bit\.ly|tinyurl\.com|is\.gd|cutt\.ly|rb\.gy|t\.co|shorturl\.at)\/[a-zA-Z0-9_-]+/i
  },
  {
    category: "Domain & Technical Vectors",
    title: "Raw IP Address URL",
    penalty: 35,
    description: "Uses a naked numerical IP address rather than a registered registered domain name.",
    regex: /https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?\b/
  },

  // 6. Typographic & Formatting Irregularities
  {
    category: "Syntactic Anomalies",
    title: "Excessive Panic Punctuation & Capitalization",
    penalty: 10,
    description: "Employs multiple exclamation marks or erratic capitalization to trigger heightened adrenaline.",
    regex: /(!{2,}|\b[A-Z]{5,}\b.*!|\?{2,})/
  }
];

export function calculateDeterministicTrustScore(input: string, urlCandidate?: string): TrustScoreBreakdown {
  const contentToScan = `${input} ${urlCandidate || ''}`.trim();
  const deductions: ScoreDeduction[] = [];
  const baseScore = 100;

  for (const rule of ENGINE_RULES) {
    const match = contentToScan.match(rule.regex);
    if (match) {
      deductions.push({
        category: rule.category,
        title: rule.title,
        penalty: rule.penalty,
        description: rule.description,
        triggerFound: match[0].length > 40 ? match[0].substring(0, 37) + '...' : match[0]
      });
    }
  }

  // Deduplicate penalties by title
  const uniqueDeductions = deductions.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);

  const totalDeductions = uniqueDeductions.reduce((acc, curr) => acc + curr.penalty, 0);
  const finalScore = Math.max(0, Math.min(100, baseScore - totalDeductions));

  let riskLevel: RiskLevel = 'safe';
  if (finalScore <= 39) {
    riskLevel = 'critical';
  } else if (finalScore <= 69) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'safe';
  }

  // Confidence calculation
  const indicatorCount = uniqueDeductions.length;
  let confidence = 85;
  if (indicatorCount >= 3) confidence = 96;
  else if (indicatorCount >= 1) confidence = 91;
  else if (contentToScan.length > 50) confidence = 88;

  // Formula string
  const penaltyFormula = uniqueDeductions.length > 0 
    ? uniqueDeductions.map(d => `${d.penalty} [${d.title.substring(0, 20)}...]`).join(' + ')
    : '0';

  const formula = `Trust Score = 100 - (${penaltyFormula}) = ${finalScore} / 100`;

  return {
    baseScore,
    totalDeductions,
    finalScore,
    riskLevel,
    confidence,
    formula,
    deductions: uniqueDeductions
  };
}

export function generateDefaultTrustGraph(input: string, breakdown: TrustScoreBreakdown): TrustGraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Central Actor Node
  const hasLawEnforcement = breakdown.deductions.some(d => d.title.includes("Law Enforcement"));
  const hasBankSpoof = breakdown.deductions.some(d => d.title.includes("Brand Spoofing") || d.description.includes("banking"));
  const hasTaskScam = breakdown.deductions.some(d => d.title.includes("Work-From-Home"));
  const hasUtilityScam = /electricity|tneb|power|bill/i.test(input);

  let actorLabel = "Unverified External Sender";
  if (hasLawEnforcement) actorLabel = "Impersonated Police / CBI / Customs";
  else if (hasBankSpoof) actorLabel = "Impersonated Bank (SBI / HDFC / ICICI)";
  else if (hasUtilityScam) actorLabel = "Fake Electricity Utility Official";
  else if (hasTaskScam) actorLabel = "Fake Recruitment Agency (VIP Tasks)";

  const actorId = "node_actor_1";
  nodes.push({
    id: actorId,
    label: actorLabel,
    category: "actor",
    riskLevel: breakdown.riskLevel,
    description: "Purported origin claiming legitimate organizational authority without verifiable cryptographic signature.",
    x: 250,
    y: 120
  });

  // Extract domain/URL
  const urlMatch = input.match(/https?:\/\/[^\s]+/i);
  let domainId = "node_domain_1";
  if (urlMatch) {
    try {
      const parsed = new URL(urlMatch[0]);
      nodes.push({
        id: domainId,
        label: parsed.hostname,
        category: "domain",
        riskLevel: breakdown.riskLevel === 'safe' ? 'safe' : 'critical',
        description: `External destination endpoint. Registered under ${parsed.hostname.split('.').pop()?.toUpperCase()} zone.`,
        x: 480,
        y: 130
      });

      edges.push({
        id: "edge_actor_domain",
        source: actorId,
        target: domainId,
        label: "Lures Victim To",
        threatLevel: breakdown.riskLevel
      });
    } catch {
      // Fallback if URL parsing fails
    }
  }

  // Vector Node: Urgency / Coercion
  if (breakdown.deductions.some(d => d.category.includes("Urgency") || d.category.includes("Legal"))) {
    const vectorId = "node_vector_urgency";
    nodes.push({
      id: vectorId,
      label: "Psychological Panic / Deadline Pressure",
      category: "vector",
      riskLevel: "critical",
      description: "Manufactured emergency designed to suppress logical verification and induce impulsive compliance.",
      x: 140,
      y: 260
    });

    edges.push({
      id: "edge_actor_urgency",
      source: actorId,
      target: vectorId,
      label: "Deploys Coercion Vector",
      threatLevel: "critical"
    });
  }

  // Credential Target Node
  const hasCredentialDemand = breakdown.deductions.some(d => d.category.includes("Credential") || d.category.includes("Financial"));
  if (hasCredentialDemand) {
    const credId = "node_cred_target";
    nodes.push({
      id: credId,
      label: "Target Asset: Banking OTP / UPI PIN / Funds",
      category: "credential",
      riskLevel: "critical",
      description: "Primary objective of threat actor: unauthorized fund exfiltration or account takeover.",
      x: 440,
      y: 320
    });

    if (nodes.some(n => n.id === domainId)) {
      edges.push({
        id: "edge_domain_cred",
        source: domainId,
        target: credId,
        label: "Harvests Input Credentials",
        threatLevel: "critical"
      });
    } else {
      edges.push({
        id: "edge_actor_cred",
        source: actorId,
        target: credId,
        label: "Demands Direct Disclosure",
        threatLevel: "critical"
      });
    }
  }

  // Platform Node: WhatsApp/Telegram/SMS
  const platformId = "node_platform_channel";
  let platformLabel = "Unsecured Communication Channel";
  if (/@|t\.me/i.test(input)) platformLabel = "Telegram Messenger (@handle)";
  else if (/whatsapp|wa\.me/i.test(input)) platformLabel = "WhatsApp Direct Message";
  else if (/sms|phone|\+91/i.test(input)) platformLabel = "Unregistered Mobile SMS Gateway";

  nodes.push({
    id: platformId,
    label: platformLabel,
    category: "platform",
    riskLevel: "moderate",
    description: "Transmission vector used to evade enterprise spam and domain reputation filters.",
    x: 290,
    y: 380
  });

  edges.push({
    id: "edge_platform_actor",
    source: platformId,
    target: actorId,
    label: "Facilitates Outreach",
    threatLevel: "moderate"
  });

  // Victim Impact Node
  const impactId = "node_impact_risk";
  nodes.push({
    id: impactId,
    label: breakdown.riskLevel === 'critical' ? "High Financial Loss & Identity Theft" : "Potential Data Profiling",
    category: "victim_impact",
    riskLevel: breakdown.riskLevel,
    description: breakdown.riskLevel === 'critical' 
      ? "Immediate risk of unauthorized debit, secondary loan fraud, or extortion."
      : "Low to moderate telemetry and phishing probe exposure.",
    x: 600,
    y: 260
  });

  if (nodes.some(n => n.id === "node_cred_target")) {
    edges.push({
      id: "edge_cred_impact",
      source: "node_cred_target",
      target: impactId,
      label: "Results in Direct Siphoning",
      threatLevel: "critical"
    });
  }

  return { nodes, edges };
}
