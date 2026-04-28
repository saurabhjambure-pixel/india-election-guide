import { NextRequest, NextResponse } from 'next/server';
import { explainFlow } from '@/lib/ai/civic-ai';
import { CIVIC_FLOWS } from '@/data/civic-data';

// POST /api/explain
// Accepts: { "flowId": "register-new", "preferSimpleLanguage": true }
// Returns: ExplainResponse JSON validated against schema
export async function POST(req: NextRequest) {
  try {
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > 5120) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const body = await req.json();

    if (!body?.flowId || typeof body.flowId !== 'string') {
      return NextResponse.json(
        { error: 'flowId field is required and must be a string.' },
        { status: 400 }
      );
    }

    const flow = CIVIC_FLOWS.find((f) => f.id === body.flowId);
    if (!flow) {
      return NextResponse.json(
        { error: `No flow found with id: ${body.flowId}` },
        { status: 404 }
      );
    }

    const preferSimple = body.preferSimpleLanguage === true;
    const result = await explainFlow(flow, preferSimple);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/explain]', message);
    return NextResponse.json(
      { error: 'Explanation failed. Please try again.' },
      { status: 500 }
    );
  }
}
