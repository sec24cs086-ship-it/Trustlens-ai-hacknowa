import React, { useState } from 'react';
import { ShieldAlert, Globe, PhoneCall, ChevronDown, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/i18n';

interface NavbarProps {
  currentPage: 'home' | 'analyze' | 'safety';
  setCurrentPage: (page: 'home' | 'analyze' | 'safety') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const languages: { code: Language; name: string; localName: string; flag: string }[] = [
  { code: 'en', name: 'English', localName: 'English (India/Global)', flag: '🌐' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'hinglish', name: 'Hinglish', localName: 'Hinglish (Hindi-English)', flag: '🇮🇳' },
  { code: 'tanglish', name: 'Tanglish', localName: 'Tanglish (Tamil-English)', flag: '🇮🇳' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShieldAlert className="w-5 h-5 text-white" />
              <div className="absolute -inset-1 rounded-xl bg-emerald-500/20 blur-sm -z-10 group-hover:bg-emerald-500/40 transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-lg text-white font-mono">
                  TRUST<span className="text-emerald-400">LENS</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  AI v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[240px]">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => setCurrentPage('analyze')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'analyze'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.navAnalyze}
            </button>
            <button
              onClick={() => setCurrentPage('safety')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'safety'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.navSafetyCenter}
            </button>
          </nav>

          {/* Actions & Language Selector */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-200 transition-colors"
                title="Change forensic analysis language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">
                  {languages.find(l => l.code === language)?.name}
                </span>
                <span className="sm:hidden font-mono uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-xl shadow-black/60 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                      Select Dialect / Language
                    </div>
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          language === item.code
                            ? 'bg-emerald-500/15 text-emerald-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <div>
                            <div>{item.name}</div>
                            <div className="text-[10px] text-slate-400">{item.localName}</div>
                          </div>
                        </div>
                        {language === item.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Emergency Hotline Button */}
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all shadow-sm group"
              title="National Cyber Crime Helpline (India)"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-mono">1930</span>
              <span className="sm:hidden font-mono">1930</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              currentPage === 'home' ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => setCurrentPage('analyze')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              currentPage === 'analyze' ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navAnalyze}
          </button>
          <button
            onClick={() => setCurrentPage('safety')}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              currentPage === 'safety' ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navSafetyCenter}
          </button>
        </div>
      </div>
    </header>
  );
};
