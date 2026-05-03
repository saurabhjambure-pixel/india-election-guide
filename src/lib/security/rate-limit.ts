import { getAdminDb } from '@/lib/firebase/firestore';

export async function checkRateLimit(identifier: string, limit = 3): Promise<{ allowed: boolean; remaining: number }> {
  const db = getAdminDb();
  if (!db) return { allowed: true, remaining: limit }; // Fallback if DB is down

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const rateLimitRef = db.collection('rate_limits').doc(`${identifier}_${today}`);

  try {
    const result = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(rateLimitRef);
      const count = doc.exists ? doc.data()?.count || 0 : 0;

      if (count >= limit) {
        return { allowed: false, remaining: 0 };
      }

      const newCount = count + 1;
      transaction.set(rateLimitRef, { count: newCount, updatedAt: new Date() }, { merge: true });
      return { allowed: true, remaining: limit - newCount };
    });

    return result;
  } catch (err) {
    console.error('Rate limit check failed:', err);
    return { allowed: true, remaining: limit }; // Fail open to not block users on DB errors
  }
}
