import { describe, expect, it } from 'vitest';
import { generateTimelineSummary } from '@/lib/ai/timeline-summary';
import type { TimelineRecord } from '@/lib/types/civic';

const timelines: TimelineRecord[] = [
  {
    state: 'Bihar',
    event: 'Legislative Assembly Elections',
    status: 'Upcoming',
    date: 'Expected late 2025 / 2026 - check ECI for confirmed schedule',
    year: 2025,
    source: 'ECI Schedule',
    sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
  },
];

describe('generateTimelineSummary', () => {
  it('returns a deterministic fallback when Gemini is unavailable', async () => {
    const summary = await generateTimelineSummary(timelines);
    expect(summary.title).toBe('Election Summary');
    expect(summary.highlights[0]).toContain('Bihar');
    expect(summary.sourceLabel).toBe('Fallback');
  });

  it('handles an empty timeline list', async () => {
    const summary = await generateTimelineSummary([]);
    expect(summary.title).toBe('No timeline updates available');
    expect(summary.highlights.length).toBeGreaterThan(0);
  });
});
