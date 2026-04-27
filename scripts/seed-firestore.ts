import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { CIVIC_FLOWS, SOURCES } from '../src/data/civic-data';

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

  console.log('Database seeded successfully.');
}

seed().catch(console.error);
