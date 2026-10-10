import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Language, GeminiExplanation, TrustScoreBreakdown } from '../types';
import { voiceController } from '../utils/voice';

interface VoiceReaderProps {
  score: TrustScoreBreakdown;
  explanation: GeminiExplanation;
  language: Language;
}

export const VoiceReader: React.FC<VoiceReaderProps> = ({ score, explanation, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(voiceController.isSynthSupported());
    return () => {
      voiceController.stopSpeaking();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      voiceController.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    // Build synthesized narration
    const narrationText = `${explanation.summary} Risk Level: ${score.riskLevel.toUpperCase()}. Trust score is ${score.finalScore} out of 100. Primary recommendation: ${explanation.counterMeasures?.[0] || 'Do not provide any credentials.'}`;

    voiceController.speak(
      narrationText,
      language,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  if (!isSupported) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${isPlaying ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">Multilingual Audio Intelligence</span>
            <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">
              {language.toUpperCase()} Voice
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {isPlaying ? 'Speaking threat forensic briefing aloud...' : 'Listen to instant spoken summary and emergency guidance.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isPlaying && (
          <div className="flex items-center gap-1 h-5 px-2">
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-5" style={{ animationDelay: '150ms' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }} />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-4" style={{ animationDelay: '75ms' }} />
          </div>
        )}

        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
            isPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold'
          }`}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Briefing</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
