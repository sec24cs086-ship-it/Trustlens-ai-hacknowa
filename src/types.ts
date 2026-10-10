export type Language = 'en' | 'ta' | 'hi' | 'hinglish' | 'tanglish';

export type AnalysisType = 'message' | 'url' | 'screenshot' | 'pdf' | 'voice';

export type RiskLevel = 'critical' | 'moderate' | 'safe';

export interface ScoreDeduction {
  category: string;
  title: string;
  penalty: number;
  description: string;
  triggerFound?: string;
}

export interface TrustScoreBreakdown {
  baseScore: number;
  totalDeductions: number;
  finalScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  formula: string;
  deductions: ScoreDeduction[];
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'actor' | 'domain' | 'credential' | 'vector' | 'platform' | 'victim_impact';
  riskLevel: RiskLevel;
  description: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  threatLevel: RiskLevel;
}

export interface TrustGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GeminiExplanation {
  threatType: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  summary: string;
  psychologicalTactics: string[];
  redFlags: string[];
  modusOperandi: string;
  counterMeasures: string[];
  urgencyTactics: string;
  credentialRisk: string;
  detectedLanguage?: string;
  verdictTamil?: string;
  verdictHindi?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  type: AnalysisType;
  inputContent: string;
  fileName?: string;
  imagePreview?: string;
  language: Language;
  trustScore: TrustScoreBreakdown;
  geminiExplanation: GeminiExplanation;
  trustGraph: TrustGraphData;
}

export interface ScamCatalogItem {
  id: string;
  title: string;
  category: string;
  risk: RiskLevel;
  summary: string;
  attackerScript: string;
  redFlags: string[];
  targetVictims: string;
  preventionSteps: string[];
}

export interface EmergencyContact {
  country: string;
  authority: string;
  helpline: string;
  onlinePortal: string;
  availableHours: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  sender: string;
  channel: string;
  message: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  isScam: boolean;
  threatType: string;
  redFlags: string[];
}
