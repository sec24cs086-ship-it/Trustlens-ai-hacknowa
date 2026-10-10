import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp, Calculator, HelpCircle } from 'lucide-react';
import { TrustScoreBreakdown } from '../types';

interface TrustScoreGaugeProps {
  scoreBreakdown: TrustScoreBreakdown;
}

export const TrustScoreGauge: React.FC<TrustScoreGaugeProps> = ({ scoreBreakdown }) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const { finalScore, riskLevel, confidence, deductions, baseScore, totalDeductions } = scoreBreakdown;

  // Determine styling based on riskLevel
  const config = {
    critical: {
      color: '#f43f5e', // rose-500
      glow: 'shadow-rose-500/20',
      badgeBg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
      text: 'CRITICAL THREAT / HIGH-RISK SCAM',
      icon: ShieldAlert,
      recommendation: 'DO NOT ENGAGE • BLOCK CONTACT IMMEDIATELY',
    },
    moderate: {
      color: '#f59e0b', // amber-500
      glow: 'shadow-amber-500/20',
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      text: 'SUSPICIOUS / PROCEED WITH EXTREME CAUTION',
      icon: AlertTriangle,
      recommendation: 'VERIFY SENDER INDEPENDENTLY BEFORE CLICKING',
    },
    safe: {
      color: '#10b981', // emerald-500
      glow: 'shadow-emerald-500/20',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      text: 'LEGITIMATE / LOW RISK DETECTED',
      icon: ShieldCheck,
      recommendation: 'NO CRITICAL EXPLOIT SIGNATURES FOUND',
    },
  }[riskLevel];

  const IconComponent = config.icon;

  // SVG Gauge calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (finalScore / 100) * circumference;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Background radial highlight */}
      <div 
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: config.color }}
      />

      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        {/* Left: Gauge Circle */}
        <div className="flex items-center gap-5">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="12"
                fill="none"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={config.color}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Score Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold tracking-tight font-mono text-white">
                {finalScore}
              </span>
              <span className="text-[11px] font-mono text-slate-400">/ 100</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                Trust Score
              </span>
            </div>
          </div>

          {/* Verdict details */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.badgeBg}`}>
                <IconComponent className="w-3.5 h-3.5" />
                {config.text}
              </span>
              <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {confidence}% Confidence
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-200 mt-1">
              {config.recommendation}
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Score is calculated deterministically via pattern vectors, credential harvesting indicators, and domain heuristics.
            </p>
          </div>
        </div>

        {/* Right: Quick Math pill & details toggle */}
        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-right w-full md:w-auto">
            <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
              Scoring Telemetry
            </div>
            <div className="text-sm font-mono text-slate-200 font-semibold mt-0.5">
              100 - {totalDeductions} Deductions = <span className="text-emerald-400">{finalScore}</span>
            </div>
          </div>

          <button
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{showFormulaDetails ? 'Hide Calculation Breakdown' : 'View Exact Mathematical Breakdown'}</span>
            {showFormulaDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Accordion: Transparent Mathematical Deductions */}
      {showFormulaDetails && (
        <div className="mt-5 pt-4 border-t border-slate-800 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              Transparent Deduction Audit Trail
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              Base: {baseScore} pts • Deductions: -{totalDeductions} pts
            </span>
          </div>

          {deductions.length === 0 ? (
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3 text-xs text-emerald-300">
              ✓ No malicious indicators or pressure deductions identified. Baseline 100 maintained.
            </div>
          ) : (
            <div className="space-y-2">
              {deductions.map((d, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 bg-slate-950/50 border border-slate-800/80 rounded-xl p-2.5 text-xs"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-rose-300">{d.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {d.category}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{d.description}</p>
                    {d.triggerFound && (
                      <div className="mt-1 font-mono text-[10px] text-amber-400/90 bg-slate-900/80 px-2 py-0.5 rounded inline-block border border-slate-800">
                        Trigger identified: &quot;{d.triggerFound}&quot;
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-block px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold">
                      -{d.penalty} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 font-mono text-[11px] text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-slate-400">Deterministic Formula: </span>
              <span className="text-emerald-400">{scoreBreakdown.formula}</span>
            </div>
            <div className="text-slate-400 text-[10px] hidden sm:block">
              Rule-based deterministic matrix v2.4
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
