import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hour

const MOCK_TIMELINES = [
  {
    state: 'National',
    event: 'General Elections 2024',
    status: 'Completed',
    date: 'Phase 1-7 complete',
    source: 'ECI Notification',
  },
  {
    state: 'Maharashtra',
    event: 'Legislative Assembly Elections',
    status: 'Live',
    date: 'Polling: November 20, 2024',
    source: 'ECI Schedule',
  },
  {
    state: 'Delhi',
    event: 'Special Summary Revision',
    status: 'Upcoming',
    date: 'Oct 29 – Nov 28, 2024',
    source: 'CEO Delhi',
  },
];

export async function GET() {
  return NextResponse.json(MOCK_TIMELINES, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
