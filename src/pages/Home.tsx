import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Radio, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  Network, 
  Volume2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { translations, sampleThreats } from '../utils/i18n';

interface HomeProps {
  language: Language;
  onNavigateToAnalyze: (initialInput?: string, initialType?: 'message' | 'url' | 'screenshot') => void;
  onNavigateToSafety: () => void;
}

export const Home: React.FC<HomeProps> = ({
  language,
  onNavigateToAnalyze,
  onNavigateToSafety,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const t = translations[language];

  const handleQuickScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    const isUrl = /^https?:\/\//i.test(quickInput.trim());
    onNavigateToAnalyze(quickInput, isUrl ? 'url' : 'message');
  };

  const trendingThreats = [
    {
      id: 1,
      tag: "DIGITAL ARREST",
      title: "CBI & Narcotics Skype Impersonation",
      trend: "+142% this week",
      risk: "CRITICAL",
      description: "Scammers pose as police or customs claiming a package with MDMA was intercepted in your name, threatening immediate arrest unless funds are moved to 'RBI security verification accounts'.",
      sample: "Mumbai Customs notice: 140g narcotics found in your DHL parcel to Taiwan. Connect to Skype DCP immediately.",
      langCode: "hi"
    },
    {
      id: 2,
      tag: "TASK FRAUD",
      title: "Telegram YouTube Like / Daily ₹5000 Job",
      trend: "+88% this week",
      risk: "CRITICAL",
      description: "Recruiters lure victims with initial ₹150 payouts for liking videos, then demand ₹5,000 to ₹50,000 deposits to unlock VIP task payouts.",
      sample: "Work from home part time. Like 3 YouTube videos and earn ₹4500 daily. Contact VIP Task admin @recruiter9.",
      langCode: "en"
    },
    {
      id: 3,
      tag: "UTILITY EXTORTION",
      title: "Electricity Meter Bill Disconnection SMS",
      trend: "+65% this week",
      risk: "CRITICAL",
      description: "SMS threatens power supply will be severed at 9:30 PM due to pending bill update, providing a scammer phone number or fake payment portal.",
      sample: "Dear Consumer, your electricity supply will be disconnected tonight at 9:30 PM. Call officer at 9845123901.",
      langCode: "tanglish"
    },
    {
      id: 4,
      tag: "BANK PHISHING",
      title: "Bank KYC Block / Aadhaar Linking Threat",
      trend: "+94% this week",
      risk: "CRITICAL",
      description: "Forged bank warnings claiming accounts will be frozen unless KYC is verified via a lookalike phishing URL.",
      sample: "PRIY GRAHAK, SBI YONO account will be blocked tonight. Update Pan card now at https://sbi-kyc-verify.xyz",
      langCode: "hinglish"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Cyber Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Live Defense Badge & Motto */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold shadow-lg shadow-emerald-500/10 animate-pulse">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.badgeLiveIntel}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span className="text-white font-bold">&quot;Don&apos;t Trust It. Verify It.&quot;</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            {t.heroTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              {t.heroHighlight}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          {/* Quick Scan Input Box */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form onSubmit={handleQuickScan} className="relative flex items-center">
              <div className="absolute left-4 text-slate-400">
                <Search className="w-5 h-5 text-emerald-400" />
              </div>
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder={t.quickScanPlaceholder}
                className="w-full pl-12 pr-36 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder:text-slate-500 text-sm shadow-2xl backdrop-blur-md outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02]"
              >
                {t.quickScanBtn}
              </button>
            </form>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <span className="font-mono text-[11px] text-slate-500">Quick Test Samples:</span>
              {sampleThreats.slice(0, 3).map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateToAnalyze(sample.content, sample.type)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors text-[11px]"
                >
                  ⚡ {sample.title}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToAnalyze()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>{t.heroCtaAnalyze}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToSafety}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>{t.heroCtaSafety}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Live Scam Radar Section */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-xl font-extrabold text-white font-mono tracking-wide">
                  {t.liveRadarTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {t.trendingThreats}
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 inline-flex items-center gap-1.5 self-start sm:self-auto">
              <Zap className="w-3.5 h-3.5" />
              <span>Real-Time Intelligence Stream</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingThreats.map((threat) => (
              <div
                key={threat.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                      {threat.tag}
                    </span>
                    <span className="text-amber-400 font-bold">{threat.trend}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {threat.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {threat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    High Vulnerability Vector
                  </span>
                  <button
                    onClick={() => onNavigateToAnalyze(threat.sample, 'message')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineered for Precision Threat Neutralization
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Combining deterministic zero-hallucination mathematical logic with multi-modal neural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Deterministic Mathematical Scoring
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every score deduction is calculated mathematically with transparent weights. Identifies artificial urgency countdowns, OTP exfiltration attempts, and typosquatted domains with no black-box guesswork.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 font-mono text-[11px] text-emerald-400">
              ✓ Exact Mathematical Transparency
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Interactive Adversary Trust Graph
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maps the entire threat topology into interactive node-link relationships. Visualize how the impersonated sender links to phishing endpoints, exfiltrates target assets, and leverages psychological fear.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 font-mono text-[11px] text-cyan-400">
              ✓ Multi-Entity Threat Correlation
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Indian Dialect & Voice Intelligence
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full forensic analysis and voice readout across English, Tamil, Hindi, Hinglish, and Tanglish. Empowers non-technical citizens and elders to understand threat verdicts in their everyday conversational dialect.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800/60 font-mono text-[11px] text-purple-400">
              ✓ Spoken Audio & Dialect Autodetection
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section: Detect -> Analyze -> Explain -> Verify -> Protect */}
      <section className="py-16 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Verification Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Detect → Analyze → Explain → Verify → Protect
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our 5-stage automated forensic lifecycle safeguards citizens from point of contact to incident containment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: "01", name: "DETECT", desc: "Ingests messages, URLs, screenshots, PDFs, or audio in 5 languages." },
              { num: "02", name: "ANALYZE", desc: "Runs deterministic rule matrix against urgent deadlines, TLD abuse, and OTP theft." },
              { num: "03", name: "EXPLAIN", desc: "Gemini neural model deconstructs psychological levers and attacker playbook." },
              { num: "04", name: "VERIFY", desc: "Maps adversary topology in an interactive multi-node Trust Graph." },
              { num: "05", name: "PROTECT", desc: "Provides spoken audio verdict, golden hour checklist, and direct 1930 reporting." }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded w-max mb-2">
                    PHASE {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-white font-mono">{step.name}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem */}
          <div className="bg-gradient-to-br from-rose-950/20 to-slate-900/60 border border-rose-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">The Threat Reality: Cognitive Exploitation</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Modern digital fraud has evolved past simple spam filters. Attackers now weaponize psychological coercion:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span><strong>Manufactured Panic:</strong> 2-hour disconnection deadlines forcing hasty actions without verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span><strong>Law Enforcement Impersonation:</strong> Digital arrests on video calls with forged police insignia and warrants.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span><strong>Bypassing 2FA:</strong> Tricking victims into verbally reciting OTPs or downloading malicious helper APKs.</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-emerald-950/20 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">The TRUSTLENS Solution: Uncompromised Verification</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              An evidence-first threat defense suite that translates forensic intelligence into accessible citizen safety:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span><strong>Deterministic Truth:</strong> Mathematical itemized score deductions with transparent formulas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span><strong>Native Dialect Forensics:</strong> Understands Tanglish, Hinglish, Tamil, Hindi, and English fraud contexts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span><strong>Immediate Remediation:</strong> 1-click Golden Hour incident guides and pre-filled police complaints.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Trust Score Visualization */}
      <section className="py-12 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Live Architectural Model</span>
            <h3 className="text-xl font-bold text-white mt-1">Sample Trust Score Calculation Preview</h3>
            <p className="text-xs text-slate-400 mt-1">
              Preview how TRUSTLENS AI deterministically dismantles a fake Bank KYC Phishing SMS.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-rose-500 bg-rose-950/30 flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-bold text-rose-400">20</span>
                  <span className="text-[9px] text-slate-400">/ 100</span>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold font-mono">
                    CRITICAL RISK • CONFIRMED SCAM PATTERN
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">Fake SBI YONO Account Suspension SMS</h4>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">100 Base Score - 80 Penalty Points = 20 / 100</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateToAnalyze("PRIY GRAHAK, Aapka SBI YONO khata block ho jayega. Click: https://sbi-yono-kycupdate.xyz/login", "message")}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Run Interactive Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-[11px] font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-rose-400 font-bold">-25 pts</span>
                <p className="text-slate-300 mt-0.5 font-sans">Service Disconnection Threat (&quot;block ho jayega&quot;)</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-rose-400 font-bold">-25 pts</span>
                <p className="text-slate-300 mt-0.5 font-sans">Abuse-Prone TLD (.xyz domain)</p>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-rose-400 font-bold">-30 pts</span>
                <p className="text-slate-300 mt-0.5 font-sans">Brand Typosquatting (sbi-yono spoof)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
