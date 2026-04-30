import { NextRequest, NextResponse } from 'next/server';
import { explainFlow } from '@/lib/ai/civic-ai';
import { CIVIC_FLOWS } from '@/data/civic-data';

// GET /api/explain?flowId=register-new&simple=true
// Converted from POST to GET so CDN and browser can cache deterministic responses.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const flowId = searchParams.get('flowId');
    const preferSimple = searchParams.get('simple') === 'true';

    if (!flowId || typeof flowId !== 'string') {
      return NextResponse.json(
        { error: 'flowId query param is required.' },
        { status: 400 }
      );
    }

    const flow = CIVIC_FLOWS.find((f) => f.id === flowId);
    if (!flow) {
      return NextResponse.json(
        { error: `No flow found with id: ${flowId}` },
        { status: 404 }
      );
    }

    const result = await explainFlow(flow, preferSimple);

    return NextResponse.json(result, {
      headers: {
        // Cache for 24 hours at CDN; serve stale for up to 1 hour while revalidating
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/explain]', message);
    return NextResponse.json(
      { error: 'Explanation failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Keep POST for backwards compatibility (does not cache)
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
