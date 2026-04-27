export interface SourceRef {
  id: string;
  name: string;
  url: string;
  organization: string; // e.g., 'Election Commission of India'
}

export interface CivicStep {
  id: string;
  title: string;
  body: string;
  sourceIds: string[]; // references to SourceRef.id
}

export interface NextAction {
  label: string;
  href: string;
  type: 'external' | 'internal';
}

export interface CivicFlow {
  id: string;
  intent: string;
  title: string;
  description: string;
  eligibilityNote?: string;
  steps: CivicStep[];
  requiredInfo?: string[];
  nextActions: NextAction[];
  warnings: string[];
  updatedAt: string;
}

export interface ElectionTimeline {
  state: string;
  type: 'assembly' | 'general' | 'local';
  phases: { phaseNumber: number; date: string }[];
  updatedAt: string;
  sourceUrl: string;
}
