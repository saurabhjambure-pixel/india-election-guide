import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase requires projectId at minimum — skip initialization entirely if not configured.
// This makes the app work locally without a .env.local file; analytics events become no-ops.
const isFirebaseConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.appId);

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  if (typeof window !== 'undefined' && app) {
    const firebaseApp = app;
    isSupported().then((yes) => {
      if (yes && firebaseApp) {
        analytics = getAnalytics(firebaseApp);
      }
    }).catch(() => {
      // Analytics unsupported or blocked (e.g. ad-blocker) — silent no-op
    });
  }
}

export { app, analytics };

// ---------------------------------------------------------------------------
// Session ID — a non-PII UUID scoped to the browser tab session.
// Stored in sessionStorage so it resets on new tab/window.
// Included in every analytics event to enable funnel analysis:
//   task_selected → flow_completed, ai_explain_used, source_chip_clicked
// ---------------------------------------------------------------------------
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  const key = 'ieg_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export const logCustomEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (!analytics || typeof window === 'undefined') return;
  const params = { ...eventParams, session_id: getSessionId() };
  import('firebase/analytics').then(({ logEvent }) => {
    logEvent(analytics as Analytics, eventName, params);
  }).catch(() => {/* silent — analytics failure must never break the app */});
};
