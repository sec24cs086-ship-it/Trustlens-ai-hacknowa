import { Language } from '../types';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  badgeLiveIntel: string;
  navHome: string;
  navAnalyze: string;
  navSafetyCenter: string;
  emergencyHelpline: string;
  emergencyCall: string;

  // Home Hero
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  heroCtaAnalyze: string;
  heroCtaSafety: string;
  quickScanPlaceholder: string;
  quickScanBtn: string;
  liveRadarTitle: string;
  trendingThreats: string;

  // Analyze page
  tabMessage: string;
  tabUrl: string;
  tabScreenshot: string;
  tabPdf: string;
  tabVoice: string;
  inputMessagePlaceholder: string;
  inputUrlPlaceholder: string;
  uploadAreaText: string;
  uploadAreaSub: string;
  voiceInputBtn: string;
  listeningVoice: string;
  runAnalysisBtn: string;
  analyzingState: string;
  loadSampleBtn: string;
  selectLanguageLabel: string;

  // Results
  trustVerdictTitle: string;
  trustScoreLabel: string;
  criticalRiskBadge: string;
  moderateRiskBadge: string;
  safeBadge: string;
  formulaBreakdownTitle: string;
  geminiIntelTitle: string;
  trustGraphTitle: string;
  voiceAudioBtn: string;
  readAloud: string;
  stopAudio: string;
  countermeasuresTitle: string;
  redFlagsTitle: string;
  psychologicalTacticsTitle: string;
  exportReportBtn: string;
  copiedNotice: string;
  fileReportBtn: string;

  // Safety Center
  safetyCenterTitle: string;
  safetyCenterSub: string;
  tabEncyclopedia: string;
  tabEmergency: string;
  tabQuiz: string;
  tabComplaintGen: string;
  goldenHourTitle: string;
  goldenHourDesc: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "TRUSTLENS AI",
    tagline: "Don't Trust It. Verify It.",
    badgeLiveIntel: "DEFENSE LEVEL 4 • LIVE SCAM RADAR ACTIVE",
    navHome: "Home",
    navAnalyze: "Analyze Hub",
    navSafetyCenter: "Safety Center",
    emergencyHelpline: "Cybercrime Helpline",
    emergencyCall: "Call 1930",

    heroTitle: "Decode Cyber Scams with",
    heroHighlight: "Deterministic Trust & Gemini Intelligence",
    heroSub: "Instant forensic analysis of deceptive messages, phishing links, and forged documents across English, Tamil, Hindi, Hinglish, and Tanglish with interactive threat network graphs.",
    heroCtaAnalyze: "Launch Threat Scanner",
    heroCtaSafety: "Safety & Emergency Hub",
    quickScanPlaceholder: "Paste suspicious WhatsApp message, SMS, telegram text or URL...",
    quickScanBtn: "Analyze Threat",
    liveRadarTitle: "Live Scam Intelligence Radar",
    trendingThreats: "Trending Attack Vectors (Last 24 Hours)",

    tabMessage: "Message / SMS / Chat",
    tabUrl: "URL / Domain Inspector",
    tabScreenshot: "Screenshot / Image",
    tabPdf: "PDF Document",
    tabVoice: "Voice / Speech",
    inputMessagePlaceholder: "Paste the suspicious message, SMS, email, WhatsApp forward, or job offer here...",
    inputUrlPlaceholder: "https://suspicious-bank-login.xyz/verify-kyc?account=...",
    uploadAreaText: "Drag & drop suspicious screenshot or PDF here, or browse files",
    uploadAreaSub: "Supports PNG, JPG, WebP, PDF up to 20MB. Analyzes visual typography, spoofed logos, fake seals & payment slips.",
    voiceInputBtn: "Voice Input",
    listeningVoice: "Listening... Speak your message now",
    runAnalysisBtn: "Inspect & Generate Trust Score",
    analyzingState: "Running Deterministic Matrix & Gemini Neural Analysis...",
    loadSampleBtn: "Try Real-World Scam Preset",
    selectLanguageLabel: "Forensic Analysis Language",

    trustVerdictTitle: "Forensic Trust Verdict",
    trustScoreLabel: "Deterministic Trust Score",
    criticalRiskBadge: "CRITICAL THREAT • CONFIRMED SCAM PATTERN",
    moderateRiskBadge: "MODERATE RISK • SUSPICIOUS ANOMALIES",
    safeBadge: "LOW RISK • NO IMMEDIATE EXPLOITS FOUND",
    formulaBreakdownTitle: "Deterministic Score Calculation & Penalties",
    geminiIntelTitle: "Gemini Forensic Intelligence Report",
    trustGraphTitle: "Interactive Trust Network Graph (Threat Vectors & Entities)",
    voiceAudioBtn: "Audio Briefing",
    readAloud: "Listen to Threat Verdict",
    stopAudio: "Stop Voice Readout",
    countermeasuresTitle: "Immediate Action Plan (Do This Right Now)",
    redFlagsTitle: "Identified Critical Red Flags",
    psychologicalTacticsTitle: "Cognitive Manipulation Tactics",
    exportReportBtn: "Copy Forensic Dossier",
    copiedNotice: "Dossier copied to clipboard!",
    fileReportBtn: "File Complaint on 1930 Portal",

    safetyCenterTitle: "Cyber Resilience & Incident Command",
    safetyCenterSub: "Explore real attack playbooks, emergency incident protocols, interactive Scam IQ tests, and police complaint drafts.",
    tabEncyclopedia: "Scam Playbook Library",
    tabEmergency: "Emergency Numbers & Golden Hour",
    tabQuiz: "Scam IQ Simulator",
    tabComplaintGen: "Police Complaint Drafter",
    goldenHourTitle: "The Golden Hour Incident Protocol",
    goldenHourDesc: "If you transferred money or gave away bank credentials in the last 2 hours, follow this sequence to freeze accounts and salvage funds.",
  },

  ta: {
    appName: "TRUSTLENS AI",
    tagline: "பன்மொழி மோசடி மற்றும் ஃபிஷிங் அச்சுறுத்தல் நுண்ணறிவு",
    badgeLiveIntel: "பாதுகாப்பு நிலை 4 • நேரடி மோசடி ரேடார் செயல்படுகிறது",
    navHome: "முகப்பு",
    navAnalyze: "பகுப்பாய்வு கூடம்",
    navSafetyCenter: "பாதுகாப்பு மையம்",
    emergencyHelpline: "சைபர் கிரைம் உதவி எண்",
    emergencyCall: "1930 ஐ அழைக்கவும்",

    heroTitle: "சைபர் மோசடிகளை உடனுக்குடன் கண்டறியுங்கள்",
    heroHighlight: "நம்பகத்தன்மை மதிப்பீடு & ஜெமினி நுண்ணறிவு",
    heroSub: "சந்தேகத்திற்கிடமான வாட்ஸ்அப், எஸ்எம்எஸ், வங்கி இணைப்புகள் மற்றும் போலி ஆவணங்களை தமிழ், ஆங்கிலம், இந்தி மற்றும் டாங்லிஷில் விரிவாக ஆய்வு செய்து எச்சரிக்கிறது.",
    heroCtaAnalyze: "ஸ்கேனரை துவங்குங்கள்",
    heroCtaSafety: "பாதுகாப்பு & அவசர மையம்",
    quickScanPlaceholder: "சந்தேகத்திற்குரிய செய்தி, வங்கி எஸ்எம்எஸ் அல்லது லிங்கை இங்கே ஒட்டவும்...",
    quickScanBtn: "ஆய்வு செய்",
    liveRadarTitle: "நேரடி மோசடி ரேடார் நுண்ணறிவு",
    trendingThreats: "தற்போது அதிகம் பரவும் மோசடி முறைகள்",

    tabMessage: "செய்தி / எஸ்எம்எஸ் / வாட்ஸ்அப்",
    tabUrl: "இணைய முகவரி / டொமைன் ஆய்வு",
    tabScreenshot: "ஸ்கிரீன்ஷாட் / படம்",
    tabPdf: "பிடிஎஃப் ஆவணம்",
    tabVoice: "குரல் வழி ஆய்வு",
    inputMessagePlaceholder: "சந்தேகத்திற்குரிய செய்தி, வங்கி KYC எச்சரிக்கை அல்லது போலி வேலை வாய்ப்பு தகவலை உள்ளிடவும்...",
    inputUrlPlaceholder: "https://suspicious-bank-login.xyz/verify-kyc...",
    uploadAreaText: "சந்தேகத்திற்குரிய ஸ்கிரீன்ஷாட் அல்லது பிடிஎஃப் கோப்பை இங்கே பதிவேற்றவும்",
    uploadAreaSub: "PNG, JPG, PDF ஆதரிக்கப்படுகிறது. போலி வங்கி முத்திரைகள் மற்றும் ரசீதுகளை ஆய்வு செய்யும்.",
    voiceInputBtn: "குரல் வழி உள்ளீடு",
    listeningVoice: "கேட்கிறது... இப்போது பேசுங்கள்",
    runAnalysisBtn: "நம்பகத்தன்மை மதிப்பெண் கணக்கிடு",
    analyzingState: "நுண்ணறிவு ஆய்வு நடைபெறுகிறது...",
    loadSampleBtn: "உண்மை மாதிரி மோசடியை சோதிக்கவும்",
    selectLanguageLabel: "விளக்க மொழி",

    trustVerdictTitle: "ஆய்வு முடிவு மற்றும் தீர்ப்பு",
    trustScoreLabel: "நம்பகத்தன்மை மதிப்பெண்",
    criticalRiskBadge: "அபாயகரமான அச்சுறுத்தல் • உறுதிசெய்யப்பட்ட மோசடி",
    moderateRiskBadge: "மிதமான அபாயம் • எச்சரிக்கை தேவை",
    safeBadge: "குறைந்த அபாயம் • உடனடி அச்சுறுத்தல் இல்லை",
    formulaBreakdownTitle: "கணக்கீட்டு சூத்திரம் மற்றும் கழிவுப் புள்ளிகள்",
    geminiIntelTitle: "ஜெமினி விரிவான புலனாய்வு அறிக்கை",
    trustGraphTitle: "அச்சுறுத்தல் தொடர்பு வரைபடம் (Trust Graph)",
    voiceAudioBtn: "குரல் விளக்கம்",
    readAloud: "தீர்ப்பை குரலில் கேட்க",
    stopAudio: "குரலை நிறுத்து",
    countermeasuresTitle: "உடனடி தற்காப்பு நடவடிக்கைகள்",
    redFlagsTitle: "கண்டறியப்பட்ட முக்கிய ஆபத்து அறிகுறிகள்",
    psychologicalTacticsTitle: "பயமுறுத்தல் & ஏமாற்றும் உளவியல் தந்திரங்கள்",
    exportReportBtn: "அறிக்கையை நகலெடு",
    copiedNotice: "அறிக்கை நகலெடுக்கப்பட்டது!",
    fileReportBtn: "1930 தளத்தில் புகார் அளிக்க",

    safetyCenterTitle: "சைபர் பாதுகாப்பு & அவசர கால மையம்",
    safetyCenterSub: "பிரபலமான ஆன்லைன் மோசடிகள், அவசர உதவி எண்கள், மற்றும் விழிப்புணர்வு வினாடி வினா.",
    tabEncyclopedia: "மோசடி தகவல் களஞ்சியம்",
    tabEmergency: "அவசர எண்கள் & கோல்டன் ஹவர்",
    tabQuiz: "மோசடி விழிப்புணர்வு தேர்வு",
    tabComplaintGen: "புகார் மனு வரைவு தயார் செய்தல்",
    goldenHourTitle: "கோல்டன் ஹவர் அவசர நெறிமுறை",
    goldenHourDesc: "பணம் இழந்திருந்தால் முதல் 2 மணி நேரத்திற்குள் செய்ய வேண்டிய 5 கட்டாய நடவடிக்கைகள்.",
  },

  hi: {
    appName: "TRUSTLENS AI",
    tagline: "बहुभाषी साइबर फ्रॉड एवं फ़िशिंग थ्रेट इंटेलिजेंस",
    badgeLiveIntel: "सुरक्षा स्तर 4 • लाइव फ्रॉड रडार सक्रिय",
    navHome: "होम",
    navAnalyze: "एनालिसिस हब",
    navSafetyCenter: "सुरक्षा केंद्र",
    emergencyHelpline: "साइबर क्राइम हेल्पलाइन",
    emergencyCall: "1930 पर कॉल करें",

    heroTitle: "साइबर फ्रॉड की पहचान करें",
    heroHighlight: "सटीक ट्रस्ट स्कोर और जेमिनी एआई द्वारा",
    heroSub: "संदिग्ध वॉट्सऐप, बैंक एसएमएस, बिजली बिल धमकी, टेलीग्राम जॉब स्कैम और फर्जी फाइलों की हिंदी, तमिल, अंग्रेजी और हिंग्लिश में तुरंत जांच करें।",
    heroCtaAnalyze: "थ्रेट स्कैनर शुरू करें",
    heroCtaSafety: "सुरक्षा व आपातकालीन हब",
    quickScanPlaceholder: "संदिग्ध वॉट्सऐप मैसेज, एसएमएस या लिंक यहाँ पेस्ट करें...",
    quickScanBtn: "जांच करें",
    liveRadarTitle: "लाइव फ्रॉड रडार इंटेलिजेंस",
    trendingThreats: "आज के प्रमुख साइबर फ्रॉड पैटर्न्स",

    tabMessage: "मैसेज / एसएमएस / चैट",
    tabUrl: "यूआरएल / डोमेन जांच",
    tabScreenshot: "स्क्रीनशॉट / इमेज",
    tabPdf: "पीडीएफ दस्तावेज",
    tabVoice: "वॉइस इनपुट",
    inputMessagePlaceholder: "संदिग्ध एसएमएस, फर्जी बैंक केवाईसी, बिजली बिल काटने की धमकी या जॉब मैसेज यहाँ डालें...",
    inputUrlPlaceholder: "https://suspicious-bank-login.xyz/verify-kyc...",
    uploadAreaText: "संदिग्ध स्क्रीनशॉट या पीडीएफ फाइल यहाँ अपलोड करें",
    uploadAreaSub: "फर्जी बैंक लोगो, सील, क्यूआर कोड और जाली चालान की सटीक पहचान।",
    voiceInputBtn: "वॉइस इनपुट",
    listeningVoice: "सुन रहा हूँ... अब बोलिए",
    runAnalysisBtn: "ट्रस्ट स्कोर और विस्तृत रिपोर्ट निकालें",
    analyzingState: "एआई द्वारा विस्तृत सुरक्षा परीक्षण जारी है...",
    loadSampleBtn: "असली फ्रॉड का उदाहरण लोड करें",
    selectLanguageLabel: "रिपोर्ट की भाषा",

    trustVerdictTitle: "सुरक्षा जांच का अंतिम फैसला",
    trustScoreLabel: "सटीक ट्रस्ट स्कोर",
    criticalRiskBadge: "गंभीर खतरा • प्रमाणित साइबर फ्रॉड",
    moderateRiskBadge: "मध्यम जोखिम • अत्यधिक सावधानी आवश्यक",
    safeBadge: "सुरक्षित • कोई तत्काल खतरा नहीं",
    formulaBreakdownTitle: "ट्रस्ट स्कोर गणना एवं पेनल्टी विवरण",
    geminiIntelTitle: "जेमिनी विस्तृत साइबर फोरेंसिक रिपोर्ट",
    trustGraphTitle: "इंटरएक्टिव ट्रस्ट नेटवर्क ग्राफ (थ्रेट वेक्टर्स)",
    voiceAudioBtn: "ऑडियो ब्रीफिंग",
    readAloud: "आवाज में फैसला सुनें",
    stopAudio: "ऑडियो रोकें",
    countermeasuresTitle: "तत्काल आवश्यक कदम (अभी क्या करें)",
    redFlagsTitle: "पहचाने गए मुख्य खतरे (Red Flags)",
    psychologicalTacticsTitle: "धमकाने और लालच देने के मनोवैज्ञानिक हथकंडे",
    exportReportBtn: "फोरेंसिक रिपोर्ट कॉपी करें",
    copiedNotice: "रिपोर्ट क्लिपबोर्ड पर कॉपी हो गई!",
    fileReportBtn: "1930 पोर्टल पर शिकायत दर्ज करें",

    safetyCenterTitle: "साइबर सुरक्षा एवं आपातकालीन प्रतिक्रिया",
    safetyCenterSub: "प्रमुख साइबर अपराधों के तरीके, आपातकालीन हेल्पलाइन और पुलिस शिकायत ड्राफ्ट।",
    tabEncyclopedia: "स्कैम इनसाइक्लोपीडिया",
    tabEmergency: "आपातकालीन नंबर और गोल्डन ऑवर",
    tabQuiz: "स्कैम आईक्यू टेस्ट (क्विज)",
    tabComplaintGen: "पुलिस शिकायत ड्राफ्ट जनरेटर",
    goldenHourTitle: "गोल्डन ऑवर आपातकालीन प्रोटोकॉल",
    goldenHourDesc: "यदि पैसे कट गए हों तो पहले 2 घंटों में खाता फ्रीज करवाने के जरूरी 5 कदम।",
  },

  hinglish: {
    appName: "TRUSTLENS AI",
    tagline: "Multilingual Scam & Phishing Threat Intelligence (Hinglish Supported)",
    badgeLiveIntel: "DEFENSE LEVEL 4 • LIVE SCAM RADAR ACTIVE",
    navHome: "Home",
    navAnalyze: "Analyze Hub",
    navSafetyCenter: "Safety Center",
    emergencyHelpline: "Cybercrime Helpline",
    emergencyCall: "Call 1930",

    heroTitle: "Spot Fake SMS & WhatsApp Scams with",
    heroHighlight: "Deterministic Trust Score & Gemini AI",
    heroSub: "Bank KYC block threats, electricity bill disconnection, Telegram part-time job fraud aur suspicious links ko turant verify karein with clear breakdown.",
    heroCtaAnalyze: "Scan Karo Abhi",
    heroCtaSafety: "Safety & Emergency Hub",
    quickScanPlaceholder: "Suspicious WhatsApp message, bank SMS ya link yahan paste karein...",
    quickScanBtn: "Analyze Threat",
    liveRadarTitle: "Live Scam Intelligence Radar",
    trendingThreats: "Top Trending Scams Right Now",

    tabMessage: "Message / SMS / WhatsApp",
    tabUrl: "URL / Website Link",
    tabScreenshot: "Screenshot / Photo",
    tabPdf: "PDF Document",
    tabVoice: "Voice Recording",
    inputMessagePlaceholder: "Aapko aaya hua suspicious message, lottery SMS, job offer ya bank warning yahan daalein...",
    inputUrlPlaceholder: "https://sbi-kyc-update-portal.top/login...",
    uploadAreaText: "Suspicious screenshot ya payment slip yahan drag karein ya browse karein",
    uploadAreaSub: "PNG, JPG, PDF support hai. Fake stamps aur logos ko AI detect karta hai.",
    voiceInputBtn: "Bol kar input karein",
    listeningVoice: "Sun rahe hain... Ab boliye",
    runAnalysisBtn: "Trust Score Check Karo",
    analyzingState: "Gemini AI aur Rule Matrix scan kar rahe hain...",
    loadSampleBtn: "Real Scam Sample Try Karein",
    selectLanguageLabel: "Analysis Explanation Language",

    trustVerdictTitle: "Forensic Investigation Verdict",
    trustScoreLabel: "Deterministic Trust Score",
    criticalRiskBadge: "CRITICAL KHATRA • CONFIRMED SCAM DETECTED",
    moderateRiskBadge: "SUSPICIOUS • CAUTION KE SAATH CHALEIN",
    safeBadge: "SAFE • KOI DANGER NAHI MILA",
    formulaBreakdownTitle: "Score Kaise Calculate Hua (Deduction Points)",
    geminiIntelTitle: "Gemini Deep AI Threat Intelligence",
    trustGraphTitle: "Interactive Trust Network Graph",
    voiceAudioBtn: "Voice Me Suno",
    readAloud: "Verdict Bol Kar Sunayein",
    stopAudio: "Audio Stop Karein",
    countermeasuresTitle: "Abhi Turant Kya Steps Lene Hain",
    redFlagsTitle: "Pakde Gaye Big Red Flags",
    psychologicalTacticsTitle: "Darr aur Lalach Ke Tactics",
    exportReportBtn: "Report Copy Karein",
    copiedNotice: "Report copy ho gayi!",
    fileReportBtn: "1930 Portal Par Complain Karein",

    safetyCenterTitle: "Safety Center & Emergency Hub",
    safetyCenterSub: "Top scams ki list, Golden Hour checklist, Scam IQ Quiz aur police complaint draft.",
    tabEncyclopedia: "Scam Directory",
    tabEmergency: "Emergency Numbers & Golden Hour",
    tabQuiz: "Scam IQ Simulator",
    tabComplaintGen: "Complaint Draft Ready Karein",
    goldenHourTitle: "The Golden Hour Rule (First 2 Hours)",
    goldenHourDesc: "Agar paise cut gaye ya OTP de diya, toh 2 ghante ke andar ye 5 steps lena bohot zaroori hai.",
  },

  tanglish: {
    appName: "TRUSTLENS AI",
    tagline: "Multilingual Scam Threat Intelligence (Tanglish Supported)",
    badgeLiveIntel: "DEFENSE LEVEL 4 • LIVE SCAM RADAR ACTIVE",
    navHome: "Home",
    navAnalyze: "Analyze Hub",
    navSafetyCenter: "Safety Center",
    emergencyHelpline: "Cybercrime Helpline",
    emergencyCall: "Call 1930",

    heroTitle: "Online Scams-ah உடனே Kandupudiyunga with",
    heroHighlight: "Deterministic Trust Score & Gemini AI",
    heroSub: "Bank KYC block warning, EB current bill cut aagidum nu vara SMS, Telegram task jobs, and fake links ah instant ah scan panni unmaiya nu sollum.",
    heroCtaAnalyze: "Scanner Start Pannunga",
    heroCtaSafety: "Safety & Emergency Hub",
    quickScanPlaceholder: "Suspicious WhatsApp message, bank SMS illa link ah inga paste pannunga...",
    quickScanBtn: "Analyze Threat",
    liveRadarTitle: "Live Scam Radar",
    trendingThreats: "Current Trending Scams",

    tabMessage: "Message / SMS / WhatsApp",
    tabUrl: "URL / Website Link",
    tabScreenshot: "Screenshot / Photo",
    tabPdf: "PDF Document",
    tabVoice: "Voice Recording",
    inputMessagePlaceholder: "Ungluku vandha suspicious SMS, bank KYC update illa job offer message ah inga paste pannunga...",
    inputUrlPlaceholder: "https://tneb-bill-update.online/pay...",
    uploadAreaText: "Suspicious screenshot illa PDF ah inga upload pannunga",
    uploadAreaSub: "Fake bank logo, fake stamps and QR codes ah AI detect pannum.",
    voiceInputBtn: "Pesiyே Input Pannunga",
    listeningVoice: "Kekkudhu... Ippo pesunga",
    runAnalysisBtn: "Trust Score Check Pannunga",
    analyzingState: "AI Scan pannitu irukku...",
    loadSampleBtn: "Real Scam Sample Check Panna",
    selectLanguageLabel: "Vilakkum Mozhi",

    trustVerdictTitle: "Investigation Result & Verdict",
    trustScoreLabel: "Deterministic Trust Score",
    criticalRiskBadge: "CRITICAL DANGER • CONFIRMED SCAM!",
    moderateRiskBadge: "SUSPICIOUS • CAREFUL AH IRUKKANUM",
    safeBadge: "SAFE • EDHUM PERIYA THREAT ILLA",
    formulaBreakdownTitle: "Score Eppadi Calculate Aachu (Deductions)",
    geminiIntelTitle: "Gemini Detailed Forensic Report",
    trustGraphTitle: "Interactive Trust Network Graph",
    voiceAudioBtn: "Audio Vilakkam",
    readAloud: "Result ah Voice la Keka",
    stopAudio: "Voice Stop Panna",
    countermeasuresTitle: "Ippo Udane Enna Pannanum",
    redFlagsTitle: "Kandupudicha Mukkiya Red Flags",
    psychologicalTacticsTitle: "Bayam & Aasai Kaati Emathura Tactics",
    exportReportBtn: "Report Copy Pannunga",
    copiedNotice: "Report copy aaiduchu!",
    fileReportBtn: "1930 Portal la Complaint Kudukka",

    safetyCenterTitle: "Safety Center & Emergency Hub",
    safetyCenterSub: "Top scam list, Golden hour checklist, Scam IQ Quiz and ready police complaint draft.",
    tabEncyclopedia: "Scam Directory",
    tabEmergency: "Emergency Numbers & Golden Hour",
    tabQuiz: "Scam IQ Simulator",
    tabComplaintGen: "Police Complaint Draft",
    goldenHourTitle: "Golden Hour Rule (Mudhal 2 Mani Neram)",
    goldenHourDesc: "Panam poirundha modhal 2 mani nerathula bank account freeze panna indha 5 steps follow pannunga.",
  }
};

export interface SampleThreat {
  title: string;
  type: 'message' | 'url' | 'screenshot';
  language: Language;
  content: string;
  url?: string;
  description: string;
}

export const sampleThreats: SampleThreat[] = [
  {
    title: "Bank KYC Block Phishing (Hinglish)",
    type: "message",
    language: "hinglish",
    content: "PRIY GRAHAK, Aapka SBI YONO khata aaj raat 12 baje se block ho jayega kyonki aapka KYC update pending hai. Turant diye gaye link par click karke apna Aadhaar aur Pan card verify karein: https://sbi-yono-kycupdate.xyz/login. Dhanyawad, State Bank Team.",
    description: "Impersonates SBI Bank, creates artificial urgency (12 AM deadline) with typosquatting URL."
  },
  {
    title: "TNEB Electricity Bill Disconnection (Tanglish)",
    type: "message",
    language: "tanglish",
    content: "Dear Consumer, Unga Electricity power supply innaiku night 9:30 PM ku disconnect aaidum bcoz unga previous month bill update aagala. Udane call pannunga Officer Rajesh Kumar 9845123901 ku or indha link la pay pannunga: https://tneb-billquick.info/pay",
    description: "Fake TNEB power disconnection threat coercing user to call a scammer directly or pay on fake portal."
  },
  {
    title: "Part-time YouTube Like / Telegram Job Scam (English)",
    type: "message",
    language: "en",
    content: "Hello! I am Priya from Global HR Recruitment. We have a part-time remote job vacancy. Just subscribe to 3 YouTube channels daily and earn ₹3,500 to ₹7,000 every day. Instant payment to your UPI. To join our VIP Task Group immediately, message our Telegram manager @vip_task_admin7 now!",
    description: "Classic task-deposit Ponzi scam luring victims with fake high payouts to join Telegram groups."
  },
  {
    title: "Digital Arrest & Police Narcotics Threat (Hindi)",
    type: "message",
    language: "hi",
    content: "सीबीआई एवं नारकोटिक्स कंट्रोल ब्यूरो सूचना: आपके नाम से ताइवान भेजा गया एक पार्सल मुंबई कस्टम्स द्वारा जब्त किया गया है जिसमें 140 ग्राम MDMA ड्रग्स और 5 पासपोर्ट पाए गए हैं। आपके खिलाफ तत्काल गिरफ्तारी वारंट जारी हुआ है। तुरंत स्काइप पर डीसीपी से जुड़ें अन्यथा आपका आधार कार्ड रद्द किया जाएगा।",
    description: "Terrorizes victim with fake narcotics seizure and digital arrest coercion."
  },
  {
    title: "Fake Postal Parcel Address Update (Tamil)",
    type: "message",
    language: "ta",
    content: "இந்தியா போஸ்ட் எச்சரிக்கை: உங்கள் பார்சல் முகவரி விபரம் தவறாக இருப்பதால் டெலிவரி செய்ய முடியவில்லை. 24 மணி நேரத்திற்குள் முகவரியை புதுப்பிக்காவிட்டால் பார்சல் திருப்பி அனுப்பப்படும். உடனடியாக ₹25 மறுடெலிவரி கட்டணம் செலுத்தி முகவரியை புதுப்பிக்கவும்: https://indiapost-parcelupdate.cc/track",
    description: "India Post parcel phishing asking for ₹25 redelivery fee to harvest credit card details."
  },
  {
    title: "HDFC NetBanking KYC Update Spoof Link (URL)",
    type: "url",
    language: "en",
    content: "https://hdfc-netbanking-secure-kyc.vip/retail/login.php?user_token=984321",
    url: "https://hdfc-netbanking-secure-kyc.vip/retail/login.php?user_token=984321",
    description: "Lookalike phishing domain mimicking HDFC bank using a suspicious .vip TLD."
  }
];
