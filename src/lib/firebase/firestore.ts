import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import type { CivicFlow, SourceRef, TimelineRecord } from '@/lib/types/civic';

let db: Firestore | null = null;
let hasWarnedAboutCredentials = false;

export function getAdminDb(): Firestore | null {
  if (db) return db;

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    if (!hasWarnedAboutCredentials) {
      console.warn('GOOGLE_APPLICATION_CREDENTIALS not set, firebase-admin cannot initialize.');
      hasWarnedAboutCredentials = true;
    }
    return null;
  }

  if (getApps().length === 0) {
    initializeApp();
  }
  
  db = getFirestore();
  return db;
}

export async function getFlows(): Promise<CivicFlow[]> {
  const adminDb = getAdminDb();
  if (!adminDb) {
    const { CIVIC_FLOWS } = await import('@/data/civic-data');
    return CIVIC_FLOWS;
  }
  
  const snapshot = await adminDb.collection('civic_data').doc('flows').collection('items').get();
  return snapshot.docs.map(doc => doc.data() as CivicFlow);
}

export async function getFlowById(id: string): Promise<CivicFlow | null> {
  const adminDb = getAdminDb();
  if (!adminDb) {
    const { CIVIC_FLOWS } = await import('@/data/civic-data');
    return CIVIC_FLOWS.find(f => f.id === id) || null;
  }
  
  const doc = await adminDb.collection('civic_data').doc('flows').collection('items').doc(id).get();
  if (!doc.exists) return null;
  
  return doc.data() as CivicFlow;
}

export async function getSources(): Promise<Record<string, SourceRef>> {
  const adminDb = getAdminDb();
  if (!adminDb) {
    const { SOURCES } = await import('@/data/civic-data');
    return SOURCES;
  }
  
  const snapshot = await adminDb.collection('civic_data').doc('sources').collection('items').get();
  const sources: Record<string, SourceRef> = {};
  snapshot.docs.forEach(doc => {
    sources[doc.id] = doc.data() as SourceRef;
  });
  
  return sources;
}

export async function getTimelines(): Promise<TimelineRecord[]> {
  const adminDb = getAdminDb();
  if (!adminDb) {
    return [
      {
        state: 'National',
        event: 'General Elections 2024',
        status: 'Completed',
        date: 'April 19 - June 1, 2024 (7 phases)',
        year: 2024,
        source: 'ECI Notification',
        sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
      },
      {
        state: 'Bihar',
        event: 'Legislative Assembly Elections',
        status: 'Upcoming',
        date: 'Expected late 2025 / 2026 - check ECI for confirmed schedule',
        year: 2025,
        source: 'ECI Schedule',
        sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
      },
      {
        state: 'West Bengal',
        event: 'Municipal Elections',
        status: 'Upcoming',
        date: 'Check State Election Commission for confirmed dates',
        year: 2026,
        source: 'State Election Commission',
        sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
      },
    ];
  }
  
  const snapshot = await adminDb.collection('civic_data').doc('timelines').collection('items').get();
  return snapshot.docs.map(doc => doc.data() as TimelineRecord);
}
