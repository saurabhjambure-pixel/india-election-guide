import { NextRequest, NextResponse } from 'next/server';
import { classifyIntent } from '@/lib/ai/civic-ai';

// POST /api/classify
// Accepts: { "message": "..." }
// Returns: ClassifyResponse JSON validated against schema
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'message field is required and must be a string.' },
        { status: 400 }
      );
    }

    const message = body.message.trim().slice(0, 500); // clamp input length
    if (!message) {
      return NextResponse.json({ error: 'message cannot be empty.' }, { status: 400 });
    }

    const result = await classifyIntent(message);
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
