import React from 'react';
import { Shield, PhoneCall, ExternalLink, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface FooterProps {
  language: Language;
  onNavigate: (page: 'home' | 'analyze' | 'safety') => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white tracking-wider font-mono text-base">
                TRUST<span className="text-emerald-400">LENS</span> AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              TRUSTLENS AI is an open threat intelligence and deception analysis engine combining deterministic mathematical scoring with Gemini multimodal neural forensics. Protecting citizens from digital arrest fraud, banking phish traps, and coercive extortion across India and globally.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-400 font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Storage Guarantee: Scans are processed ephemerally with zero credential retention.</span>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Intelligence Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Threat Radar & Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analyze')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Multi-Modal Analysis Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Scam Playbook Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Scam IQ Resilience Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Cyber Numbers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 font-mono flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              Emergency Helplines
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                <div className="text-slate-300 font-semibold flex items-center justify-between">
                  <span>India Cybercrime Helpline</span>
                  <a href="tel:1930" className="text-rose-400 font-mono font-bold hover:underline">
                    1930
                  </a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Operated by MHA / I4C for immediate bank debit freezes
                </div>
              </div>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-[11px] text-slate-300 hover:text-emerald-400 transition-colors bg-slate-900/60 border border-slate-800/80 p-2 rounded-lg"
              >
                <span>National Portal (cybercrime.gov.in)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TRUSTLENS AI Threat Intelligence Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Supported: English • தமிழ் • हिन्दी • Hinglish • Tanglish</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">Defense Matrix Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
