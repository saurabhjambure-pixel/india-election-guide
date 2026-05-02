import {
  SchemaType,
  type ArraySchema,
  type ObjectSchema,
  type Schema,
} from '@google/generative-ai';
import { getGeminiModel } from './gemini-client';
import type { TimelineRecord } from '@/lib/types/civic';

export interface TimelineSummary {
  title: string;
  summary: string;
  highlights: string[];
  sourceLabel: string;
}

const TIMELINE_SUMMARY_SCHEMA: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    summary: { type: SchemaType.STRING },
    highlights: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING } as Schema,
    } as ArraySchema,
  },
  required: ['title', 'summary', 'highlights'],
};

function buildTimelineFallback(timelines: TimelineRecord[]): TimelineSummary {
  if (timelines.length === 0) {
    return {
      title: 'No timeline updates available',
      summary: 'No verified election schedule entries are available right now. Check the official ECI schedule for the latest notifications.',
      highlights: [
        'Review the Election Commission schedule page for fresh notifications.',
        'Use the registration flow if you still need to join the electoral roll.',
      ],
      sourceLabel: 'Fallback',
    };
  }

  const liveEvents = timelines.filter((item) => item.status === 'Live');
  const upcomingEvents = timelines.filter((item) => item.status === 'Upcoming');
  const nextEvent = liveEvents[0] ?? upcomingEvents[0] ?? timelines[0];

  return {
    title: 'Election Summary',
    summary: liveEvents.length > 0
      ? `${liveEvents.length} election update${liveEvents.length === 1 ? ' is' : 's are'} currently live. ${nextEvent.event} in ${nextEvent.state} is the most immediate item to watch.`
      : `${upcomingEvents.length} upcoming schedule item${upcomingEvents.length === 1 ? '' : 's'} are listed. ${nextEvent.event} in ${nextEvent.state} is the next key milestone to track.`,
    highlights: timelines.slice(0, 3).map((item) => `${item.state}: ${item.event} — ${item.date}`),
    sourceLabel: 'Fallback',
  };
}

function buildTimelinePrompt(timelines: TimelineRecord[]): string {
  return [
    'You are a civic assistant for the India Election Guide.',
    'Summarize only the verified election timeline entries provided below.',
    'Do not invent dates, jurisdictions, or legal guidance.',
    'Return valid JSON matching the schema exactly.',
    JSON.stringify(timelines),
  ].join('\n\n');
}

export async function generateTimelineSummary(
  timelines: TimelineRecord[],
): Promise<TimelineSummary> {
  const fallback = buildTimelineFallback(timelines);
  const model = getGeminiModel();

  if (!model || timelines.length === 0) {
    return fallback;
  }

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: buildTimelinePrompt(timelines) }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: TIMELINE_SUMMARY_SCHEMA,
      },
    });

    const parsed = JSON.parse(result.response.text().trim()) as TimelineSummary;
    if (
      typeof parsed.title !== 'string' ||
      typeof parsed.summary !== 'string' ||
      !Array.isArray(parsed.highlights)
    ) {
      return fallback;
    }

    return {
      title: parsed.title.slice(0, 80),
      summary: parsed.summary.slice(0, 320),
      highlights: parsed.highlights.slice(0, 3).map((item) => item.slice(0, 160)),
      sourceLabel: 'Gemini',
    };
  } catch {
    return fallback;
  }
}
