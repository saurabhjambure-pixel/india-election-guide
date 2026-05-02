import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { explainFlow } from '@/lib/ai/civic-ai';
import { getFlowById } from '@/lib/firebase/firestore';

const ExplainPostRequestSchema = z.object({
  flowId: z.string().trim().min(1).max(100),
  preferSimpleLanguage: z.boolean().optional(),
});

// GET /api/explain?flowId=register-new&simple=true
// Converted from POST to GET so CDN and browser can cache deterministic responses.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const flowId = searchParams.get('flowId');
    const preferSimple = searchParams.get('simple') === 'true';

    if (!flowId || flowId.length > 100) {
      return NextResponse.json(
        { error: 'flowId query param is required.' },
        { status: 400 }
      );
    }

    const flow = await getFlowById(flowId);
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

    const parsed = ExplainPostRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'flowId field is required and must be a string.' },
        { status: 400 }
      );
    }

    const flow = await getFlowById(parsed.data.flowId);
    if (!flow) {
      return NextResponse.json(
        { error: `No flow found with id: ${parsed.data.flowId}` },
        { status: 404 }
      );
    }

    const preferSimple = parsed.data.preferSimpleLanguage === true;
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
