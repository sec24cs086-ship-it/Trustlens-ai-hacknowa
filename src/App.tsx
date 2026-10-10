import React, { useState } from 'react';
import { Language, AnalysisType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import { SafetyCenter } from './pages/SafetyCenter';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'analyze' | 'safety'>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Parameters passed to Analyze page when initiated from Home or Safety Center
  const [analyzeInput, setAnalyzeInput] = useState<string>('');
  const [analyzeType, setAnalyzeType] = useState<AnalysisType>('message');

  const handleNavigateToAnalyze = (initialInput?: string, initialType?: AnalysisType) => {
    if (initialInput) {
      setAnalyzeInput(initialInput);
      setAnalyzeType(initialType || 'message');
    }
    setCurrentPage('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSafety = () => {
    setCurrentPage('safety');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: 'home' | 'analyze' | 'safety') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            language={language}
            onNavigateToAnalyze={handleNavigateToAnalyze}
            onNavigateToSafety={handleNavigateToSafety}
          />
        )}

        {currentPage === 'analyze' && (
          <Analyze
            language={language}
            initialInput={analyzeInput}
            initialType={analyzeType}
          />
        )}

        {currentPage === 'safety' && (
          <SafetyCenter
            language={language}
            onNavigateToAnalyze={(sampleText) => handleNavigateToAnalyze(sampleText, 'message')}
          />
        )}
      </main>

      <Footer language={language} onNavigate={handlePageChange} />
    </div>
  );
}
