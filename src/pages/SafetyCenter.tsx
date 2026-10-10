import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  PhoneCall, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Language, ScamCatalogItem, QuizQuestion } from '../types';
import { translations } from '../utils/i18n';

interface SafetyCenterProps {
  language: Language;
  onNavigateToAnalyze: (sampleText?: string) => void;
}

const scamCatalog: ScamCatalogItem[] = [
  {
    id: "digital-arrest",
    title: "Digital Arrest & Police / CBI Skype Impersonation",
    category: "Extortion / Impersonation",
    risk: "critical",
    summary: "Scammers pose as Police, CBI, ED, or Customs officers over Skype or WhatsApp video calls, showing forged police station backgrounds and fake arrest warrants to demand victims transfer funds into 'safe RBI accounts'.",
    attackerScript: "'Your Aadhaar was used to send 140g narcotics and 5 fake passports to Taiwan. You are under Digital Arrest. You cannot cut this call or contact anyone. Transfer your savings to the Supreme Court verification account immediately or police will breach your residence.'",
    redFlags: [
      "No Indian law enforcement agency conducts 'Digital Arrests' over video calls.",
      "Demands to keep Skype call on 24x7 without speaking to family or lawyer.",
      "Requests to transfer money into private bank accounts for 'verification'.",
      "Showing fake police station sets, forged ID badges, and official-looking stamps."
    ],
    targetVictims: "Senior citizens, retirees, homemakers, and working professionals.",
    preventionSteps: [
      "Cut the call immediately. No genuine police officer will interrogate via Skype.",
      "Call your local police station or dial 1930 to report the extortion.",
      "Do not transfer any money regardless of threats of arrest."
    ]
  },
  {
    id: "telegram-task",
    title: "Telegram Part-Time Task & YouTube Like Ponzi",
    category: "Investment / Ponzi",
    risk: "critical",
    summary: "Victims are contacted on WhatsApp/Telegram with offers to earn ₹3,000–₹8,000 daily by liking YouTube videos or writing Google reviews. After paying ₹150–₹500 initially to build trust, fraudsters demand thousands to 'unlock earnings'.",
    attackerScript: "'Congratulations! You completed Task 1. We sent ₹150 to your UPI. Now to unlock Tier-2 VIP Task with 300% return, deposit ₹5,000 into our merchant account. If you don't deposit, your account will be locked.'",
    redFlags: [
      "Unsolicited job messages promising thousands of rupees for clicking likes.",
      "Being added to Telegram VIP groups showing doctored screenshots of massive profits.",
      "Requiring advance deposits or 'recharge' fees to withdraw your own earned money.",
      "Admins communicating exclusively through untraceable Telegram handles."
    ],
    targetVictims: "College students, job seekers, homemakers, and remote workers.",
    preventionSteps: [
      "Block the sender immediately on WhatsApp and Telegram.",
      "Never pay money to receive a salary or investment payout.",
      "Exit any suspicious Telegram groups and report them as scam channels."
    ]
  },
  {
    id: "electricity-bill",
    title: "Electricity Meter Bill Disconnection SMS",
    category: "Utility Phishing",
    risk: "critical",
    summary: "A fraudulent SMS threatens that electricity power supply will be terminated tonight at 9:30 PM due to an un-updated bill, providing a fake officer's personal mobile number or a malicious APK link.",
    attackerScript: "'Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the electricity office because your previous month bill was not updated. Please immediately contact our power officer at 9845123901.'",
    redFlags: [
      "Electricity boards (TNEB, BSES, MSEDCL, Tata Power) never send disconnection notices from personal 10-digit mobile numbers.",
      "Official disconnection notices are served in writing with at least 15 days notice.",
      "Asking the consumer to call a personal phone number rather than calling official 1912 customer care.",
      "Asking to install AnyDesk, TeamViewer, or an unknown .apk file to update the bill."
    ],
    targetVictims: "Residential households, shop owners, and elderly bill payers.",
    preventionSteps: [
      "Ignore the SMS. Check your electricity bill status exclusively on the official state DISCOM portal or app.",
      "Never call the personal phone number mentioned in the SMS.",
      "Never install remote access applications (AnyDesk, QuickSupport) on instruction."
    ]
  },
  {
    id: "bank-kyc",
    title: "Bank Account KYC Revocation / Aadhaar Phishing",
    category: "Banking Phishing",
    risk: "critical",
    summary: "Fake SMS masquerading as SBI, HDFC, ICICI, or Axis Bank warning that the user's account will be blocked within 24 hours unless they update their PAN/KYC via an embedded phishing link.",
    attackerScript: "'Dear SBI Customer, your NetBanking account will be blocked today due to pending KYC document. Please click https://sbi-yono-kycupdate.xyz to verify your Aadhaar and avoid debit suspension.'",
    redFlags: [
      "Banks never send links in SMS to update KYC or enter NetBanking passwords.",
      "Suspicious domain name endings (.xyz, .top, .vip, .site) mimicking bank names.",
      "Threatening immediate blockage within hours.",
      "Webpage asks for NetBanking username, password, profile password, and OTP."
    ],
    targetVictims: "All banking customers holding savings accounts or credit cards.",
    preventionSteps: [
      "Never click links inside SMS alerts claiming to be from your bank.",
      "Always visit official NetBanking URLs directly by typing them into the browser.",
      "Remember: Banks NEVER ask for your OTP or password under any circumstances."
    ]
  },
  {
    id: "apk-sideloading",
    title: "Malicious APK Sideloading (Fake Scheme Apps)",
    category: "Malware / Device Takeover",
    risk: "critical",
    summary: "Scammers send WhatsApp files ending in .apk disguised as PM-Kisan subsidies, wedding invitations, bank rewards, or courier tracking apps. Once installed, the malware reads incoming SMS OTPs and siphons bank funds.",
    attackerScript: "'Please download this official PM-Kisan_Kyc_Update.apk file to receive your ₹6,000 farmer subsidy directly into your bank account. Install and allow all SMS permissions.'",
    redFlags: [
      "Files received via WhatsApp or Telegram ending in '.apk'.",
      "App requests 'Accessibility Services' or 'Read SMS' permissions.",
      "App icon disappears from home screen after installation (running stealth in background).",
      "Phone experiences abnormal battery drain or unprompted reboots."
    ],
    targetVictims: "Android smartphone users across rural and urban regions.",
    preventionSteps: [
      "NEVER install .apk files received from WhatsApp, Telegram, or SMS.",
      "Only install apps from Google Play Store with Play Protect enabled.",
      "If installed: Immediately turn on Airplane Mode, backup essentials, and factory reset the phone."
    ]
  },
  {
    id: "customs-parcel",
    title: "FedEx / India Post International Parcel Seizure",
    category: "Impersonation / Phishing",
    risk: "critical",
    summary: "A message claiming an international parcel is held at airport customs due to incorrect address, requiring a nominal ₹25 re-delivery fee or claiming illegal contraband was discovered inside.",
    attackerScript: "'India Post: Your parcel IND98432 cannot be delivered due to incomplete street address. Update address within 24 hours and pay ₹25 re-delivery charge at https://indiapost-parcelupdate.cc/track'",
    redFlags: [
      "India Post and FedEx do not ask for card details via suspicious non-gov.in web links.",
      "Fake fee page requests full credit card number, CVV, and OTP for a tiny ₹25 charge.",
      "Domain is hosted on an overseas registrar rather than the official indiapost.gov.in."
    ],
    targetVictims: "Frequent online shoppers and package recipients.",
    preventionSteps: [
      "Track parcels directly on the official postal website: www.indiapost.gov.in.",
      "Do not enter card details on unverified third-party pages.",
      "Contact your local delivery postman directly to verify status."
    ]
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "You receive an SMS at 7:30 PM with the following text:",
    sender: "BZ-TNEBPW",
    channel: "SMS",
    message: "Dear Consumer, your electricity supply will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Please immediately contact power officer Rajesh at 9845123901.",
    isScam: true,
    threatType: "Electricity Bill Extortion Phishing",
    redFlags: [
      "Government electricity boards never send disconnection notices via personal mobile numbers.",
      "Official notices require minimum 15 days written intimation.",
      "Power officer's personal 10-digit number is provided instead of the 1912 customer care."
    ],
    options: [
      {
        id: "a",
        text: "Call the officer immediately and pay whatever amount he requests via Google Pay to prevent power cut.",
        isCorrect: false,
        explanation: "Incorrect! Calling the number connects you directly to a scammer who will coerce you into downloading remote access apps or sending money."
      },
      {
        id: "b",
        text: "Ignore the SMS and check your actual bill status on the official electricity DISCOM app or portal.",
        isCorrect: true,
        explanation: "Correct! Electricity utilities never terminate power based on an evening SMS. Checking your account directly on the official app confirms whether your bill is actually pending."
      },
      {
        id: "c",
        text: "Forward the SMS to all your neighbors in the apartment group to warn them.",
        isCorrect: false,
        explanation: "Forwarding unverified scam messages spreads panic. Verify first."
      }
    ]
  },
  {
    id: 2,
    scenario: "A WhatsApp message from an international number (+84 923...) states:",
    sender: "+84 923 881 293",
    channel: "WhatsApp",
    message: "Hello! I am Natasha from Global HR. You have been selected for remote part-time work. Just like 3 YouTube videos per day and earn ₹3,500 daily. To claim your first ₹150 trial bonus, send your UPI ID now.",
    isScam: true,
    threatType: "Task-Based Deposit Ponzi Scam",
    redFlags: [
      "Legitimate global corporations do not hire employees via random WhatsApp messages from foreign numbers.",
      "Nobody pays ₹3,500/day for simply pressing 'Like' on a video.",
      "The initial ₹150 trial payout is bait to extract thousands of rupees later in VIP tasks."
    ],
    options: [
      {
        id: "a",
        text: "Send your UPI ID to take the free ₹150 and then block them.",
        isCorrect: false,
        explanation: "Dangerous! Receiving funds from scam networks can lead to your bank account being frozen as an accomplice by police cyber cells."
      },
      {
        id: "b",
        text: "Block and report the contact on WhatsApp immediately without responding.",
        isCorrect: true,
        explanation: "Correct! Never engage with task scams. Blocking cuts off social engineering attempts before they escalate."
      },
      {
        id: "c",
        text: "Ask them for their company registration certificate before agreeing.",
        isCorrect: false,
        explanation: "Scammers keep fabricated Ministry of Corporate Affairs certificates ready to show victims."
      }
    ]
  },
  {
    id: 3,
    scenario: "You receive an urgent phone call claiming to be a police officer from Mumbai Crime Branch:",
    sender: "Unknown Skype Call (Badge Displayed)",
    channel: "Skype Video",
    message: "A parcel containing 140g MDMA drugs addressed to Taiwan has been seized with your Aadhaar. You are under Digital Arrest. You must stay on video call and transfer ₹2,00,000 to the court verification account or you will be arrested in 2 hours.",
    isScam: true,
    threatType: "Digital Arrest Law Enforcement Extortion",
    redFlags: [
      "There is no legal provision in Indian law for 'Digital Arrest'.",
      "Police or CBI never interrogate suspects via Skype or video calls.",
      "Supreme Court and RBI never operate 'verification bank accounts' for citizen funds."
    ],
    options: [
      {
        id: "a",
        text: "Immediately transfer the funds because police arrest will ruin your reputation.",
        isCorrect: false,
        explanation: "Incorrect! You will lose your entire savings. This is a 100% fabricated criminal extortion scam."
      },
      {
        id: "b",
        text: "Disconnect the call, inform family/friends, and immediately dial Cyber Helpline 1930 or visit your local police station.",
        isCorrect: true,
        explanation: "Correct! Disconnecting ends their psychological grip. Reporting to 1930 registers the extortion attempt with real law enforcement."
      },
      {
        id: "c",
        text: "Beg them to reduce the fine to ₹50,000.",
        isCorrect: false,
        explanation: "Bargaining reinforces their belief that you are scared and will pay."
      }
    ]
  }
];

export const SafetyCenter: React.FC<SafetyCenterProps> = ({
  language,
  onNavigateToAnalyze,
}) => {
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'emergency' | 'quiz' | 'complaint'>('emergency');
  const [selectedScam, setSelectedScam] = useState<ScamCatalogItem>(scamCatalog[0]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Complaint Drafter state
  const [victimName, setVictimName] = useState('');
  const [scamType, setScamType] = useState('Digital Arrest Extortion');
  const [amountLost, setAmountLost] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [suspectPhone, setSuspectPhone] = useState('');
  const [suspectUrl, setSuspectUrl] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const t = translations[language];

  // Handle Quiz Answer
  const handleSelectOption = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      const selected = selectedAnswers[q.id];
      const opt = q.options.find(o => o.id === selected);
      if (opt?.isCorrect) score += 1;
    });
    setQuizScore(score);
  };

  // Generate Complaint Text
  const handleGenerateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const draft = `TO:
The Station House Officer / Cyber Crime Police Station &
National Cyber Crime Reporting Portal (https://cybercrime.gov.in)

SUBJECT: Formal Complaint Regarding Financial Cyber Fraud / ${scamType.toUpperCase()}

Respected Officer,

I, ${victimName || '[Complainant Name]'}, am submitting this formal complaint to report an incident of cyber fraud that transpired on ${dateStr}.

INCIDENT DETAILS:
1. Nature of Cyber Crime: ${scamType}
2. Financial Loss Incurred: ₹${amountLost || '0'}
3. Transaction / UTR Number: ${transactionId || '[Not Applicable / Pending]'}
4. Suspect Mobile / WhatsApp Number: ${suspectPhone || '[Unknown]'}
5. Suspect Website / Phishing URL: ${suspectUrl || '[Not Applicable]'}

NARRATIVE SUMMARY:
The perpetrator contacted me claiming an official pretext (${scamType}), induced severe urgency, and engaged in deception that resulted in unauthorized financial extraction. Evidence including chat logs, SMS records, and banking debits have been preserved.

RELIEF REQUESTED:
1. Registration of an FIR / NCR against the perpetrator under relevant sections of the Information Technology Act 2000 and the Bharatiya Nyaya Sanhita (BNS).
2. Immediate coordination with the destination bank / payment gateway to freeze the beneficiary account under the National 1930 Cyber Fraud Helpline protocol.
3. Restoration of siphoned funds to my legitimate source bank account.

I declare that the information provided above is true to the best of my knowledge and belief.

Sincerely,
${victimName || '[Complainant Name]'}
Contact: [Complainant Phone Number]
Date: ${dateStr}`;

    setComplaintText(draft);
  };

  const handleCopyDraft = () => {
    if (!complaintText) return;
    navigator.clipboard.writeText(complaintText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.safetyCenterTitle}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          {t.safetyCenterSub}
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'emergency'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-rose-400" />
          <span>{t.tabEmergency}</span>
        </button>

        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'encyclopedia'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>{t.tabEncyclopedia}</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'quiz'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>{t.tabQuiz}</span>
        </button>

        <button
          onClick={() => setActiveTab('complaint')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'complaint'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>{t.tabComplaintGen}</span>
        </button>
      </div>

      {/* Tab 1: Emergency & Golden Hour */}
      {activeTab === 'emergency' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Golden Hour Playbook Banner */}
          <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-rose-500/20 text-rose-400">
                <Clock className="w-4 h-4 animate-spin" />
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">
                {t.goldenHourTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {t.goldenHourDesc}
            </p>

            {/* 5-Step Emergency Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
              {[
                { step: "01", title: "Call 1930 Immediately", desc: "Citizen Financial Cyber Fraud Reporting System alerts destination banks to freeze the money." },
                { step: "02", title: "Freeze Bank Account", desc: "Call your bank customer care to immediately block NetBanking, debit card, and UPI IDs." },
                { step: "03", title: "Preserve Evidence", desc: "Take screenshots of WhatsApp chats, SMS, call logs, and bank statement UTR reference numbers." },
                { step: "04", title: "Lodge Online FIR", desc: "Submit full incident details on official portal https://cybercrime.gov.in." },
                { step: "05", title: "Block SIM if Cloned", desc: "If you lost mobile network connectivity abruptly, visit telecom store to block SIM swap." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      STEP {item.step}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-2 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Directory of Helplines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">National Helpline</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-bold">24x7 Free</span>
              </div>
              <h3 className="text-base font-bold text-white">Indian Cybercrime Helpline</h3>
              <p className="text-xs text-slate-400 mt-1">Directly coordinates debit freezes across Indian banks & gateways.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Toll-Free Dial:</span>
                <a href="tel:1930" className="text-sm font-mono font-bold text-rose-400 hover:underline">
                  1930
                </a>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Central Bank Portal</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold">Official</span>
              </div>
              <h3 className="text-base font-bold text-white">RBI Sachet Portal</h3>
              <p className="text-xs text-slate-400 mt-1">Register complaints against illegal lending apps and deposit schemes.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Web Portal:</span>
                <a href="https://sachet.rbi.org.in" target="_blank" rel="noreferrer" className="text-xs font-mono text-emerald-400 flex items-center gap-1 hover:underline">
                  <span>sachet.rbi.org.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Telecom Ministry</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold">DoT Portal</span>
              </div>
              <h3 className="text-base font-bold text-white">Chakshu / Sanchar Saathi</h3>
              <p className="text-xs text-slate-400 mt-1">Report fraudulent WhatsApp calls, SMS senders, and check SIMs in your name.</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Web Portal:</span>
                <a href="https://sancharsaathi.gov.in" target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-400 flex items-center gap-1 hover:underline">
                  <span>sancharsaathi.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Scam Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Left: Scam List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Cataloged Threat Playbooks ({scamCatalog.length})
            </h3>
            {scamCatalog.map((scam) => (
              <button
                key={scam.id}
                onClick={() => setSelectedScam(scam)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedScam.id === scam.id
                    ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">{scam.category}</span>
                  <span className="text-rose-400 font-bold uppercase">CRITICAL</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {scam.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Right: Selected Scam Deep Dive */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase">
                  {selectedScam.category}
                </span>
                <h2 className="text-lg font-bold text-white mt-1.5">
                  {selectedScam.title}
                </h2>
              </div>
              <button
                onClick={() => onNavigateToAnalyze(selectedScam.attackerScript)}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                <span>Analyze Script</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-4">
              {selectedScam.summary}
            </p>

            {/* Real Attacker Script Quote Box */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Typical Attacker Message / Dialogue:
              </span>
              <p className="text-xs font-mono text-slate-300 italic leading-relaxed">
                {selectedScam.attackerScript}
              </p>
            </div>

            {/* Warning Signs & Red Flags */}
            <div className="mt-5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Deadly Warning Signs (Red Flags)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedScam.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Playbook */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Proven Prevention Protocols
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedScam.preventionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Scam IQ Simulator Quiz */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                Interactive Social Engineering Test
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Spot the Threat: Scam IQ Challenge
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
              Question {quizIndex + 1} of {quizQuestions.length}
            </span>
          </div>

          {quizScore === null ? (
            <div>
              {/* Question card */}
              {(() => {
                const currentQ = quizQuestions[quizIndex];
                const selected = selectedAnswers[currentQ.id];

                return (
                  <div>
                    <p className="text-xs text-slate-300 font-semibold mb-3">
                      {currentQ.scenario}
                    </p>

                    {/* Simulated Message Card */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5 font-mono text-xs text-slate-200 leading-relaxed relative">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 border-b border-slate-800/80 pb-1.5">
                        <span>Sender: <strong className="text-slate-300">{currentQ.sender}</strong></span>
                        <span>Channel: {currentQ.channel}</span>
                      </div>
                      <p className="text-slate-200">{currentQ.message}</p>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2.5 mb-6">
                      {currentQ.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQ.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                            selected === opt.id
                              ? 'bg-purple-500/20 border-purple-500/50 text-white font-medium'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-950'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                              {opt.id.toUpperCase()}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Feedback if selected */}
                    {selected && (
                      <div className={`p-3 rounded-xl mb-6 text-xs ${
                        currentQ.options.find(o => o.id === selected)?.isCorrect
                          ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-300'
                          : 'bg-rose-950/20 border border-rose-900/40 text-rose-300'
                      }`}>
                        <strong>
                          {currentQ.options.find(o => o.id === selected)?.isCorrect ? '✓ Correct Choice! ' : '✗ High Risk Action! '}
                        </strong>
                        {currentQ.options.find(o => o.id === selected)?.explanation}
                      </div>
                    )}

                    {/* Nav Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <button
                        onClick={() => setQuizIndex(prev => Math.max(0, prev - 1))}
                        disabled={quizIndex === 0}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {quizIndex < quizQuestions.length - 1 ? (
                        <button
                          onClick={() => setQuizIndex(prev => prev + 1)}
                          disabled={!selected}
                          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-40"
                        >
                          Next Scenario
                        </button>
                      ) : (
                        <button
                          onClick={handleFinishQuiz}
                          disabled={!selected}
                          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold disabled:opacity-40"
                        >
                          See Final Score
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Quiz Score Card */
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold text-white">
                Resilience Test Completed!
              </h4>
              <p className="text-sm font-mono text-emerald-400 mt-1">
                You scored {quizScore} out of {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
              </p>

              <div className="max-w-md mx-auto bg-slate-950 p-4 rounded-xl border border-slate-800 mt-6 text-xs text-slate-300 text-left space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Certified Cyber Vigilance Grade: {quizScore === 3 ? 'A+ (Fraud Resistant)' : 'B (Needs Attention)'}</span>
                </div>
                <p className="text-slate-400">
                  You demonstrated solid awareness of digital arrest coercion, suspicious SMS links, and task Ponzi traps. Share this test with your family and elders to protect them!
                </p>
              </div>

              <button
                onClick={() => {
                  setQuizScore(null);
                  setSelectedAnswers({});
                  setQuizIndex(0);
                }}
                className="mt-6 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                Retake Scam IQ Test
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Police Complaint Drafter */}
      {activeTab === 'complaint' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
          {/* Form */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Police Complaint Drafter
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill in what happened to generate an official legal complaint ready for the National Cyber Crime Reporting Portal (cybercrime.gov.in).
            </p>

            <form onSubmit={handleGenerateComplaint} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Full Name:</label>
                <input
                  type="text"
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Scam Type:</label>
                <select
                  value={scamType}
                  onChange={(e) => setScamType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                >
                  <option value="Digital Arrest Law Enforcement Extortion">Digital Arrest Law Enforcement Extortion</option>
                  <option value="Bank NetBanking KYC Phishing Trap">Bank NetBanking KYC Phishing Trap</option>
                  <option value="Telegram Task / YouTube Like Investment Fraud">Telegram Task / YouTube Like Investment Fraud</option>
                  <option value="Electricity Bill Disconnection Threat">Electricity Bill Disconnection Threat</option>
                  <option value="Fake India Post / Customs Parcel Link">Fake India Post / Customs Parcel Link</option>
                  <option value="Malicious APK Download Sideloading">Malicious APK Download Sideloading</option>
                  <option value="Sextortion / Video Call Blackmail">Sextortion / Video Call Blackmail</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount Lost (₹):</label>
                  <input
                    type="text"
                    value={amountLost}
                    onChange={(e) => setAmountLost(e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Bank UTR / Txn ID:</label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 408928371928"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Suspect Phone/WhatsApp:</label>
                  <input
                    type="text"
                    value={suspectPhone}
                    onChange={(e) => setSuspectPhone(e.target.value)}
                    placeholder="+91 98451..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phishing URL / Domain:</label>
                  <input
                    type="text"
                    value={suspectUrl}
                    onChange={(e) => setSuspectUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-colors mt-2"
              >
                Draft Legal Complaint Letter
              </button>
            </form>
          </div>

          {/* Draft Output */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Formatted Legal Notice Draft
                </span>
                {complaintText && (
                  <button
                    onClick={handleCopyDraft}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraft ? 'Copied' : 'Copy Text'}</span>
                  </button>
                )}
              </div>

              <textarea
                readOnly
                value={complaintText || "Click 'Draft Legal Complaint Letter' to generate your ready-to-file complaint draft."}
                rows={16}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300 outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Ready for cybercrime.gov.in</span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
