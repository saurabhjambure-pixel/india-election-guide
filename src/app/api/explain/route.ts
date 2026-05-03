import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { explainFlow } from '@/lib/ai/civic-ai';
import { getFlowById } from '@/lib/firebase/firestore';
import { checkRateLimit } from '@/lib/security/rate-limit';

const ExplainPostRequestSchema = z.object({
  flowId: z.string().trim().min(1).max(100),
  preferSimpleLanguage: z.boolean().optional(),
});

const RATE_LIMIT_ERROR = { error: 'Rate limit exceeded. Each user is limited to 3 AI queries per day to ensure fair access. Please continue exploring our manual guides.' };

async function handleExplainRequest(flowId: string, preferSimple: boolean, remaining: number) {
  const flow = await getFlowById(flowId);
  if (!flow) {
    return NextResponse.json(
      { error: `No flow found with id: ${flowId}` },
      { status: 404 }
    );
  }

  const result = await explainFlow(flow, preferSimple);
  const response = NextResponse.json(result);
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  return response;
}

// GET /api/explain?flowId=register-new&simple=true
// Converted from POST to GET so CDN and browser can cache deterministic responses.
export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { allowed, remaining } = await checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(RATE_LIMIT_ERROR, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const flowId = searchParams.get('flowId');
    const preferSimple = searchParams.get('simple') === 'true';

    if (!flowId || flowId.length > 100) {
      return NextResponse.json(
        { error: 'flowId query param is required.' },
        { status: 400 }
      );
    }

    const result = await handleExplainRequest(flowId, preferSimple, remaining);

    // Add caching headers for GET
    result.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
    return result;
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
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { allowed, remaining } = await checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(RATE_LIMIT_ERROR, { status: 429 });
    }

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

    return await handleExplainRequest(parsed.data.flowId, parsed.data.preferSimpleLanguage === true, remaining);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/explain]', message);
    return NextResponse.json(
      { error: 'Explanation failed. Please try again.' },
      { status: 500 }
    );
  }
}
