import { NextResponse } from 'next/server';
import { getTimelines } from '@/lib/firebase/firestore';

export const revalidate = 3600; // 1 hour

export async function GET() {
  const timelines = await getTimelines();
  return NextResponse.json(timelines, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
