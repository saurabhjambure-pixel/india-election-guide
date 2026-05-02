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

export interface DocumentItem {
  name: string;
  category: 'age' | 'address' | 'identity' | 'other';
  note: string;            // what it satisfies / any caveats
  examples?: string[];     // concrete example documents in this category
}

export interface CivicFlow {
  id: string;
  intent: string;
  title: string;
  description: string;
  eligibilityNote?: string;
  steps: CivicStep[];
  requiredInfo?: string[];
  documents?: DocumentItem[];
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

export type TimelineStatus = 'Completed' | 'Upcoming' | 'Live';

export interface TimelineRecord {
  state: string;
  event: string;
  status: TimelineStatus;
  date: string;
  year: number;
  source: string;
  sourceUrl: string;
}
