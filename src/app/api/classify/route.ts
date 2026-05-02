import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { classifyIntent } from '@/lib/ai/civic-ai';

const ClassifyRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  context: z.string().trim().max(500).optional(),
});

// POST /api/classify
// Accepts: { "message": "..." }
// Returns: ClassifyResponse JSON validated against schema
export async function POST(req: NextRequest) {
  try {
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > 2048) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const parsed = ClassifyRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Request body must include a non-empty message and optional context.' },
        { status: 400 }
      );
    }

    const result = await classifyIntent(parsed.data.message, parsed.data.context);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/classify]', message);
    return NextResponse.json(
      { error: 'Classification failed. Please try again.' },
      { status: 500 }
    );
  }
}
