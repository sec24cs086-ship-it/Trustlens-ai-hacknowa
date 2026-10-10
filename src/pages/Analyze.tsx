import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Globe, 
  FileImage, 
  Mic, 
  MicOff, 
  Upload, 
  Sparkles, 
  RefreshCw, 
  ShieldAlert, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  X,
  FileText
} from 'lucide-react';
import { Language, AnalysisType, AnalysisResult } from '../types';
import { translations, sampleThreats } from '../utils/i18n';
import { voiceController } from '../utils/voice';
import { TrustScoreGauge } from '../components/TrustScoreGauge';
import { TrustGraph } from '../components/TrustGraph';
import { VoiceReader } from '../components/VoiceReader';

interface AnalyzeProps {
  language: Language;
  initialInput?: string;
  initialType?: AnalysisType;
}

export const Analyze: React.FC<AnalyzeProps> = ({
  language,
  initialInput = '',
  initialType = 'message',
}) => {
  const [activeTab, setActiveTab] = useState<AnalysisType>(initialType);
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>(initialInput);
  const [urlInput, setUrlInput] = useState<string>(initialType === 'url' ? initialInput : '');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [fileName, setFileName] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');

  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  // If initialInput changes
  useEffect(() => {
    if (initialInput) {
      if (initialType === 'url') {
        setUrlInput(initialInput);
        setActiveTab('url');
      } else {
        setMessageInput(initialInput);
        setActiveTab('message');
      }
      runAnalysis(initialInput, initialType);
    }
  }, [initialInput, initialType]);

  // Voice Speech Recognition
  const toggleListening = () => {
    if (isListening) {
      voiceController.stopListening();
      setIsListening(false);
      return;
    }

    setSpeechError(null);
    const started = voiceController.startListening(
      language,
      (transcript, isFinal) => {
        setVoiceTranscript(prev => isFinal ? `${prev} ${transcript}`.trim() : prev || transcript);
        if (activeTab === 'message') {
          setMessageInput(prev => isFinal ? `${prev} ${transcript}`.trim() : prev || transcript);
        } else if (activeTab === 'url') {
          setUrlInput(transcript.replace(/\s+/g, ''));
        }
      },
      (err) => {
        setSpeechError(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  // Image / PDF File Handling with 10MB limit validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isPdfMode = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processFile(file, isPdfMode);
  };

  const processFile = (file: File, isPdfMode = false) => {
    setFileError(null);

    // Enforce 10MB size limit
    if (file.size > 10 * 1024 * 1024) {
      setFileError(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum allowable limit of 10MB.`);
      return;
    }

    // Validate mime type
    if (isPdfMode && file.type !== 'application/pdf') {
      setFileError("Please upload a valid PDF document (.pdf).");
      return;
    }

    setFileName(file.name);
    setMimeType(file.type || (isPdfMode ? 'application/pdf' : 'image/png'));

    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result as string;
      setImagePreview(isPdfMode ? null : b64);
      setImageBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, isPdfMode = false) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file, isPdfMode);
    }
  };

  // Preset Sample loader
  const handleLoadSample = (sample: typeof sampleThreats[0]) => {
    setActiveTab(sample.type);
    if (sample.type === 'url') {
      setUrlInput(sample.url || sample.content);
    } else {
      setMessageInput(sample.content);
    }
    setImagePreview(null);
    setImageBase64('');
    setFileError(null);
  };

  // Run Threat Analysis
  const runAnalysis = async (customContent?: string, customType?: AnalysisType) => {
    const currentType = customType || activeTab;
    let textToSend = '';
    let urlToSend = '';

    if (currentType === 'message') {
      textToSend = customContent !== undefined ? customContent : messageInput;
      if (!textToSend.trim() && !imageBase64) return;
    } else if (currentType === 'url') {
      urlToSend = customContent !== undefined ? customContent : urlInput;
      if (!urlToSend.trim()) return;
    } else if (currentType === 'screenshot' || currentType === 'pdf') {
      textToSend = messageInput;
      if (!imageBase64 && !textToSend.trim()) return;
    } else if (currentType === 'voice') {
      textToSend = voiceTranscript || messageInput;
      if (!textToSend.trim()) return;
    }

    setIsAnalyzing(true);
    setSpeechError(null);

    // Simulated progress steps for telemetry
    setAnalysisStep("Parsing semantic markers & linguistic syntax...");
    await new Promise(r => setTimeout(r, 200));

    try {
      setAnalysisStep("Auditing urgency vectors & credential harvesting matrices...");

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: currentType,
          text: textToSend,
          url: urlToSend,
          imageBase64: imageBase64,
          mimeType: mimeType,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis server returned ${response.status}`);
      }

      setAnalysisStep("Synthesizing Adversary Trust Graph & Forensic Dossier...");
      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Analysis execution error:", err);
      setSpeechError(`Analysis could not complete: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  // Copy forensic dossier to clipboard
  const handleCopyDossier = () => {
    if (!result) return;
    const textToCopy = `[TRUSTLENS AI FORENSIC DOSSIER]
Timestamp: ${result.timestamp}
Trust Score: ${result.trustScore.finalScore}/100 (${result.trustScore.riskLevel.toUpperCase()})
Threat Type: ${result.geminiExplanation.threatType}
Severity: ${result.geminiExplanation.severity}

Summary:
${result.geminiExplanation.summary}

Psychological Tactics:
${result.geminiExplanation.psychologicalTactics.map(t => `- ${t}`).join('\n')}

Identified Red Flags:
${result.geminiExplanation.redFlags.map(r => `- ${r}`).join('\n')}

Immediate Countermeasures:
${result.geminiExplanation.counterMeasures.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Formula: ${result.trustScore.formula}
Generated by TRUSTLENS AI Threat Platform (https://cybercrime.gov.in)`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>Forensic Threat Analyzer</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Multi-Modal Intel
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detect phishing links, extortion coercion, fake SMS KYC notices, and deceptive documents across 5 languages.
        </p>
      </div>

      {/* Input Panel Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl p-5 mb-8">
        {/* Modality Tabs & Demo Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setActiveTab('message'); setFileError(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'message'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.tabMessage}</span>
            </button>
            <button
              onClick={() => { setActiveTab('url'); setFileError(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'url'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.tabUrl}</span>
            </button>
            <button
              onClick={() => { setActiveTab('screenshot'); setFileError(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileImage className="w-3.5 h-3.5" />
              <span>{t.tabScreenshot}</span>
            </button>
            <button
              onClick={() => { setActiveTab('pdf'); setFileError(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pdf'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.tabPdf}</span>
            </button>
            <button
              onClick={() => { setActiveTab('voice'); setFileError(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'voice'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{t.tabVoice}</span>
            </button>
          </div>

          {/* Demo Mode Toggle & Preset Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                demoMode
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚡ Demo Mode: {demoMode ? 'ON' : 'OFF'}
            </button>
            <select
              onChange={(e) => {
                const sample = sampleThreats.find(s => s.title === e.target.value);
                if (sample) handleLoadSample(sample);
              }}
              defaultValue=""
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-1.5 outline-none focus:border-emerald-500 transition-colors hidden sm:block"
            >
              <option value="" disabled>Load Threat Preset...</option>
              {sampleThreats.map((sample, idx) => (
                <option key={idx} value={sample.title}>
                  [{sample.language.toUpperCase()}] {sample.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Demo Mode Quick Scenarios Ribbon */}
        {demoMode && (
          <div className="mb-5 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/50 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 font-bold mb-2">
              <span>⚡ STAGE 3B VERIFIED AUDIT SUITE (Click to test):</span>
              <span className="text-slate-400 text-[10px]">Deterministic + Neural Pipeline</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("Pay ₹1,999 to confirm your internship."); runAnalysis("Pay ₹1,999 to confirm your internship.", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                1. Internship Fee (₹1,999)
              </button>
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("Meeting at 10 AM tomorrow."); runAnalysis("Meeting at 10 AM tomorrow.", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                2. Safe Meeting Notice
              </button>
              <button
                onClick={() => { setActiveTab('url'); setUrlInput("http://192.168.1.1:8080/login"); runAnalysis("http://192.168.1.1:8080/login", 'url'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                3. Raw IP Login URL
              </button>
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("உடனே உங்கள் OTP சொல்லுங்கள்"); runAnalysis("உடனே உங்கள் OTP சொல்லுங்கள்", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                4. Tamil Urgent OTP
              </button>
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("Job select aayiduchu, fee pay pannunga."); runAnalysis("Job select aayiduchu, fee pay pannunga.", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                5. Tanglish Job Fee
              </button>
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("तुरंत अपना OTP बताइए।"); runAnalysis("तुरंत अपना OTP बताइए।", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                6. Hindi Urgent OTP
              </button>
              <button
                onClick={() => { setActiveTab('message'); setMessageInput("Registration fee pay karo."); runAnalysis("Registration fee pay karo.", 'message'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:text-white transition-colors"
              >
                7. Hinglish Registration Fee
              </button>
            </div>
          </div>
        )}

        {/* File Error Notification */}
        {fileError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/30 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
            <span>{fileError}</span>
            <button onClick={() => setFileError(null)} className="text-rose-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab 1: Text / Message Input */}
        {activeTab === 'message' && (
          <div>
            <div className="relative">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={t.inputMessagePlaceholder}
                rows={4}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder:text-slate-500 text-sm outline-none resize-none transition-all font-sans leading-relaxed"
              />
              {/* Clear button */}
              {messageInput && (
                <button
                  onClick={() => setMessageInput('')}
                  className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: URL / Domain Inspector */}
        {activeTab === 'url' && (
          <div>
            <div className="relative">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={t.inputUrlPlaceholder}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder:text-slate-500 text-sm font-mono outline-none transition-all"
              />
              {urlInput && (
                <button
                  onClick={() => setUrlInput('')}
                  className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Analyzes typosquatting, brand spoofing, abnormal TLDs (.xyz, .top), homoglyph substitutions, and credential harvesting paths.
            </p>
          </div>
        )}

        {/* Tab 3: Screenshot Upload */}
        {activeTab === 'screenshot' && (
          <div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, false)}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => handleFileUpload(e, false)}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                {fileName && mimeType.startsWith('image/') ? `Loaded Screenshot: ${fileName}` : "Upload Screenshot (PNG, JPG, WebP)"}
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                Maximum file size: 10MB. Inspects visual signatures, forged bank headers, and QR codes.
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4 flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex-shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{fileName || 'Uploaded Screenshot'}</p>
                  <p className="text-[10px] font-mono text-slate-400">{mimeType}</p>
                </div>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageBase64('');
                    setFileName('');
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: PDF Document Upload (10MB limit enforcement) */}
        {activeTab === 'pdf' && (
          <div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, true)}
              onClick={() => pdfInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all group"
            >
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, true)}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {fileName && mimeType === 'application/pdf' ? `Loaded PDF: ${fileName}` : "Upload Suspicious PDF Document (.pdf)"}
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                Strict 10MB file limit enforced. Audits forged appointment letters, fake arrest warrants, and suspicious invoice attachments.
              </p>
            </div>

            {/* PDF Loaded Display */}
            {fileName && mimeType === 'application/pdf' && (
              <div className="mt-4 flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center justify-center text-red-400 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{fileName}</p>
                  <p className="text-[10px] font-mono text-emerald-400">PDF Document Validated (&lt; 10MB)</p>
                </div>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageBase64('');
                    setFileName('');
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Voice / Speech Input */}
        {activeTab === 'voice' && (
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="max-w-md mx-auto">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-400 shadow-xl shadow-rose-500/30 animate-pulse'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              }`}>
                {isListening ? <Mic className="w-8 h-8 animate-bounce" /> : <Mic className="w-8 h-8" />}
              </div>

              <h3 className="text-sm font-bold text-white mt-4">
                {isListening ? "Listening to your voice..." : "Voice Threat Speech Recognition"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isListening ? "Speak clearly into your microphone now." : `Configured for ${language.toUpperCase()} dialect recognition. Click to speak.`}
              </p>

              {/* Transcript Preview */}
              {voiceTranscript && (
                <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-sans text-slate-200">
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">Transcribed Voice Audio:</span>
                  <p className="italic">&quot;{voiceTranscript}&quot;</p>
                </div>
              )}

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={toggleListening}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isListening
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {isListening ? "Stop Recording" : "Start Voice Recording"}
                </button>
                {voiceTranscript && (
                  <button
                    onClick={() => runAnalysis(voiceTranscript, 'voice')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Analyze Spoken Text
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Controls & Voice Input */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Voice Input Button */}
            <button
              onClick={toggleListening}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isListening ? t.listeningVoice : t.voiceInputBtn}</span>
            </button>

            {speechError && (
              <span className="text-xs text-rose-400 truncate max-w-xs">{speechError}</span>
            )}
          </div>

          {/* Submit / Run Button */}
          <button
            onClick={() => runAnalysis()}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Scanning Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{t.runAnalysisBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analyzing Progress State */}
      {isAnalyzing && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center my-8 shadow-xl animate-pulse">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto mb-3" />
          <h3 className="font-bold text-white text-sm font-mono tracking-wide">
            {t.analyzingState}
          </h3>
          <p className="text-xs text-emerald-400 font-mono mt-1">
            {analysisStep}
          </p>
        </div>
      )}

      {/* Forensic Results Dashboard */}
      {result && !isAnalyzing && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* 1. Score Gauge & Mathematical Breakdown */}
          <TrustScoreGauge scoreBreakdown={result.trustScore} />

          {/* 2. Audio Briefing Voice Reader */}
          <VoiceReader 
            score={result.trustScore} 
            explanation={result.geminiExplanation} 
            language={language} 
          />

          {/* 3. Gemini Deep Threat Intelligence Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-white text-base">
                    {t.geminiIntelTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-slate-400">Threat Archetype:</span>
                  <span className="text-xs font-mono font-bold text-rose-300">
                    {result.geminiExplanation.threatType}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border ${
                  result.geminiExplanation.severity === 'CRITICAL'
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                    : result.geminiExplanation.severity === 'HIGH'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                }`}>
                  SEVERITY: {result.geminiExplanation.severity}
                </span>

                <button
                  onClick={handleCopyDossier}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  title="Copy full forensic text dossier"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Dossier'}</span>
                </button>
              </div>
            </div>

            {/* Forensic Summary */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm leading-relaxed text-slate-200">
              <span className="font-semibold text-emerald-400">Forensic Verdict: </span>
              {result.geminiExplanation.summary}
            </div>

            {/* Attacker Modus Operandi */}
            <div className="mt-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Attacker Modus Operandi & Game Plan
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                {result.geminiExplanation.modusOperandi}
              </p>
            </div>

            {/* Grid of Red Flags & Psychological Tactics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {/* Psychological Tactics */}
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.psychologicalTacticsTitle}
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.geminiExplanation.psychologicalTactics.map((tactic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flags Identified */}
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {t.redFlagsTitle}
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.geminiExplanation.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Checklist Countermeasures */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.countermeasuresTitle}
              </h4>
              <div className="space-y-2">
                {result.geminiExplanation.counterMeasures.map((measure, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-950/15 border border-emerald-900/30 text-xs text-emerald-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0">
                      {i + 1}
                    </span>
                    <span>{measure}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Escalation Links */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-mono">
                Urgent Action: Did you already lose money or click the link?
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:1930"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Dial 1930 Hotline</span>
                </a>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>{t.fileReportBtn}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* 4. Interactive Trust Graph */}
          <TrustGraph data={result.trustGraph} />
        </div>
      )}
    </div>
  );
};
