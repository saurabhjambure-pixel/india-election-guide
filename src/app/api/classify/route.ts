import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { classifyIntent } from '@/lib/ai/civic-ai'
import { checkRateLimit } from '@/lib/security/rate-limit'

const ClassifyRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  context: z.string().trim().max(500).optional(),
})

// POST /api/classify
// Accepts: { "message": "..." }
// Returns: ClassifyResponse JSON validated against schema
export async function POST(req: NextRequest) {
  try {
    // 1. Identify User (IP-based for demo/hackathon)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const { allowed, remaining } = await checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            'Rate limit exceeded. Each user is limited to 3 AI queries per day to ensure fair access. Please continue exploring our manual guides.',
        },
        { status: 429 }
      )
    }

    const contentLength = parseInt(req.headers.get('content-length') || '0', 10)
    if (contentLength > 2048) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
    }

    const parsed = ClassifyRequestSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            'Request body must include a non-empty message and optional context.',
        },
        { status: 400 }
      )
    }

    const result = await classifyIntent(
      parsed.data.message,
      parsed.data.context
    )
    // Include remaining count in response headers for "wow" factor transparency
    const response = NextResponse.json(result)
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    return response
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[/api/classify]', message)
    return NextResponse.json(
      { error: 'Classification failed. Please try again.' },
      { status: 500 }
    )
  }
}
