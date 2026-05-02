import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { CIVIC_FLOWS, SOURCES } from '../src/data/civic-data';

const MOCK_TIMELINES = [
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

// Note: To run this script, you must have a serviceAccountKey.json 
// from your Firebase project and set the GOOGLE_APPLICATION_CREDENTIALS environment variable.

async function seed() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn('Skipping Firestore seed. GOOGLE_APPLICATION_CREDENTIALS is not set.');
    return;
  }

  const app = initializeApp();
  const db = getFirestore(app);

  console.log('Seeding sources...');
  const sourcesBatch = db.batch();
  for (const source of Object.values(SOURCES)) {
    const ref = db.collection('civic_data').doc('sources').collection('items').doc(source.id);
    sourcesBatch.set(ref, source);
  }
  await sourcesBatch.commit();

  console.log('Seeding flows...');
  const flowsBatch = db.batch();
  for (const flow of CIVIC_FLOWS) {
    const ref = db.collection('civic_data').doc('flows').collection('items').doc(flow.id);
    flowsBatch.set(ref, flow);
  }
  await flowsBatch.commit();

  console.log('Seeding timelines...');
  const timelinesBatch = db.batch();
  for (let i = 0; i < MOCK_TIMELINES.length; i++) {
    const timeline = MOCK_TIMELINES[i];
    const ref = db.collection('civic_data').doc('timelines').collection('items').doc(`timeline-${i}`);
    timelinesBatch.set(ref, timeline);
  }
  await timelinesBatch.commit();

  console.log('Database seeded successfully.');
}

seed().catch(console.error);
