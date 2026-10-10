# TRUSTLENS AI

> **“Don’t trust it. Verify it.”**

**Multilingual Digital Trust & Scam Intelligence Platform**  
*Built for the HackNowa Global Hackathon 2026*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-trustlens--ai--2.ai.studio-00C853?style=for-the-badge&logo=google-chrome&logoColor=white)](https://trustlens-ai-2.ai.studio)
[![GitHub Repository](https://img.shields.io/badge/GitHub-sec24cs086--ship--it%2FTrustlens--ai--hacknowa-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sec24cs086-ship-it/Trustlens-ai-hacknowa)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 📌 Problem Statement

Every day, millions of digital citizens fall victim to sophisticated social engineering, impersonation, phishing attacks, advance-fee scams, and deceptive communications. Fraudsters exploit:
- **Linguistic and Cultural Vulnerabilities**: Targeting users in localized vernacular languages (Tamil, Hindi) and colloquial hybrid dialects (Tanglish, Hinglish) where traditional English-only spam filters fail.
- **Urgency & Digital Coercion Tactics**: Fabricating threats such as imminent electricity cutoffs, SIM deactivation, bank account freezes, and "Digital Arrest" law enforcement intimidation.
- **Multimodal Vectors**: Distributing attacks through deceptive SMS/WhatsApp text messages, malicious shortened or IP-based URLs, forged payment/bank screenshots, fake job offer PDFs, and unsolicited voice/audio calls.
- **Black-Box AI Decisions**: Generic LLM outputs that offer vague opinions without verifiable, deterministic evidence or actionable defense playbooks.

## 💡 The Solution: TRUSTLENS AI

**TRUSTLENS AI** is a defense-in-depth digital trust and cyber threat intelligence platform. It fuses **deterministic heuristic scoring** with **multimodal Google Gemini reasoning** to audit any suspicious communication in real time.

Instead of relying solely on probabilistic AI, TRUSTLENS AI pairs strict, verifiable cybersecurity rule checks (credential harvesting, deceptive TLDs, IP hosts, payment traps) with multimodal analysis and interactive trust graphs—empowering non-technical users and security teams alike to verify threats in seconds.

---

## 🚀 Key Features

- **Multimodal Verification**:
  - 💬 **Message / SMS / WhatsApp**: Paste suspect text, job offers, or lottery messages.
  - 🌐 **URL & Domain Deep Inspection**: Heuristic analysis of suspicious TLDs, IP-based hostnames, deep subdomain masquerading, and unencrypted HTTP vectors.
  - 🖼️ **Screenshot Forensics**: Multimodal vision analysis of fake bank notifications, forged UPI transaction receipts, or spoofed KYC prompts.
  - 📄 **PDF Document Triage**: Extract and analyze suspicious internship letters, government warrants, or fake employment contracts.
  - 🎙️ **Voice / Speech Input**: Built-in speech recognition for conversational and telephonic scam scripts.
- **Multilingual & Code-Mixed Intelligence**:
  - **English**
  - **Tamil (தமிழ்)**
  - **Tanglish** (Tamil written in English alphabet)
  - **Hindi (हिन्दी)**
  - **Hinglish** (Hindi written in English alphabet)
- **Deterministic Trust Score (0 – 100)**:
  - Transparent, mathematical score calculations grounded in penalty deductions.
  - Color-coded risk classification: **SAFE** (80–100), **SUSPICIOUS** (50–79), and **HIGH RISK** (0–49).
- **Interactive Trust Graph Visualizer**:
  - Node-and-edge network visualization mapping threat categories, extracted entities, risk signals, and relationship dependencies.
- **Actionable Recommended Actions**:
  - Contextual step-by-step containment instructions (e.g., Freeze UPI, report to cybercrime.gov.in, block number, preserve digital evidence).
- **Comprehensive Safety Center**:
  - Curated threat intelligence knowledge base covering Digital Arrests, Part-time Job/Task frauds, KYC/Electricity disconnect scams, and official national cyber helpline directories.
- **Pre-Loaded Interactive Demos**:
  - Instant one-click test cases for fast demonstration of live scenarios across all supported languages.

---

## 🛡️ How the Trust Score & Risk Analysis Work

TRUSTLENS AI employs a **hybrid defense-in-depth architecture**:

```
                       User Input (Text / URL / Image / PDF / Voice)
                                          │
                                          ▼
                 ┌─────────────────────────────────────────────────┐
                 │       Deterministic Heuristic Engine            │
                 │   - Base Score: 100                             │
                 │   - Evaluates: Urgency, Coercion, Law Force,    │
                 │     Credential Demands, Fake TLDs, IP Hosts,    │
                 │     APK/App Downloads, Advance Fees             │
                 └────────────────────────┬────────────────────────┘
                                          │
                        Calculates Deterministic Score & Deductions
                                          │
                                          ▼
                 ┌─────────────────────────────────────────────────┐
                 │       Server-Side Multimodal Intelligence        │
                 │            (Powered by Google Gemini)           │
                 │   - Multilingual Nuance & Semantic Reasoning    │
                 │   - Optical & Document Evidence Extraction      │
                 │   - Contextual Containment Playbook             │
                 │   - Automatic Offline Fallback Resiliency       │
                 └────────────────────────┬────────────────────────┘
                                          │
                                          ▼
                         Consolidated Threat Intelligence
             [Trust Score (0-100) + Risk Level + Trust Graph + Evidence]
```

### Deterministic Risk Categories & Weightings
1. **Urgency & Coercion** (-20 to -25 pts): Artificial deadlines, countdown threats, electricity cutoff threats, account deactivation.
2. **Legal & Law Enforcement Intimidation** (-35 pts): CBI, Narcotics Control Bureau, Mumbai Customs, Digital Arrest coercion.
3. **Credential Harvesting** (-30 pts): Demands for OTP, UPI PIN, CVV, NetBanking passwords, Aadhaar, or PAN cards.
4. **Financial Vectors & Advance Fees** (-25 pts): Demands for registration deposits, courier re-delivery charges, processing fees.
5. **Social Engineering & Task Scams** (-25 pts): Telegram review tasks, YouTube like tasks, unrealistic daily income yields.
6. **Technical & Infrastructure Indicators** (-20 to -25 pts): High-risk disposable TLDs (`.xyz`, `.top`, `.tk`), direct IP URLs, HTTP plain-text protocols, remote access APK installations (`.apk`, AnyDesk, TeamViewer).

If an external AI API call is interrupted or unconfigured, the deterministic engine guarantees unbroken, safe fallback analysis without crashing or failing.

---

## 💻 Technology Stack

- **Frontend**:
  - React 19 + TypeScript
  - Vite (Build tool & development server)
  - Tailwind CSS v4 (Modern responsive cyber-themed styling)
  - Lucide React (Cybersecurity iconography)
  - Motion (Framer Motion) (Smooth transitions and data visualizations)
- **Backend**:
  - Node.js & Express
  - `tsx` (TypeScript execution runtime)
  - `@google/genai` (Google Gen AI SDK for multimodal Gemini reasoning)
  - Robust REST APIs: `/api/health`, `/api/url-inspect`, `/api/analyze`
- **Security & Reliability**:
  - Request body limits & client-side file size validation (10 MB upload guard)
  - Sanitized error handling in production mode (no stack trace or credential leaks)
  - Configurable dynamic port binding (`PORT` environment variable)

---

## ⚙️ Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes with Node.js) or `bun`

### 1. Clone the Repository
```bash
git clone https://github.com/sec24cs086-ship-it/Trustlens-ai-hacknowa.git
cd Trustlens-ai-hacknowa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment configuration file:
```bash
cp .env.example .env
```
Open `.env` in your editor and configure your variables:
```env
# GEMINI_API_KEY: Required for Gemini AI multimodal reasoning.
# Obtain your API key from Google AI Studio (https://aistudio.google.com/)
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# APP_URL: The base URL where the application is hosted (optional in local dev)
APP_URL="http://localhost:3000"

# PORT: Optional custom port (defaults to 3000)
PORT=3000
```

> **Note**: If `GEMINI_API_KEY` is not provided, TRUSTLENS AI gracefully runs with its high-accuracy deterministic fallback engine!

### 4. Run the Development Server
```bash
npm run dev
```
The application will be accessible at: `http://localhost:3000`

### 5. Production Build & Execution
To create an optimized production build and start the server:
```bash
# Build the client bundle
npm run build

# Start the full-stack server
npm start
```

---

## 🌐 Live Deployments & Links

- **Live Application Demo**: [https://trustlens-ai-2.ai.studio](https://trustlens-ai-2.ai.studio)
- **GitHub Repository**: [https://github.com/sec24cs086-ship-it/Trustlens-ai-hacknowa](https://github.com/sec24cs086-ship-it/Trustlens-ai-hacknowa)

---

## 🔒 Security Best Practices

1. **Never Commit API Keys or Secrets**:
   - The `.gitignore` file is configured to exclude all `.env` and `.env.local` files.
   - Do not push personal API keys, passwords, or cloud credentials to GitHub.
2. **Production Error Masking**:
   - The backend explicitly sanitizes error outputs in production mode, ensuring stack traces, internal system paths, and incoming payload fragments are never returned over the network.
3. **Client-Side Data Privacy**:
   - Uploaded screenshots, PDFs, and audio recordings are processed for analysis and are never written to permanent disk storage or shared with third parties.

---

## ⚠️ Disclaimer

TRUSTLENS AI is an educational threat intelligence and automated risk analysis platform built for the **HackNowa Global Hackathon 2026**. 

The generated Trust Scores, threat levels, and security advice are **heuristic risk indicators and analytical aids, not guaranteed certifications of absolute legitimacy or fraudulence**. Always verify critical banking, legal, and identity inquiries through official, verified institutional channels and consult authorized law enforcement authorities or national cybercrime helplines when encountering cyber attacks.
