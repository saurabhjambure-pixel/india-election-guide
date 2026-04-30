'use client'

import { useState } from 'react'
import { ExplainResponseSchema, type ExplainResponse } from '@/lib/ai/schemas'
import { logCustomEvent } from '@/lib/firebase/config'

interface AiExplainProps {
  flowId: string
}

export default function AiExplainButton({ flowId }: AiExplainProps) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ExplainResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleExplain() {
    setLoading(true)
    setError(null)
    logCustomEvent('explain_click', { flow_id: flowId })
    try {
      // GET request — browser and CDN will cache this response for 24 hours
      const res = await fetch(`/api/explain?flowId=${encodeURIComponent(flowId)}&simple=true`, {
        method: 'GET',
      })
      if (!res.ok) throw new Error('Explain failed')
      const rawData = await res.json()
      const json = ExplainResponseSchema.parse(rawData)
      setData(json)
    } catch {
      setError('Could not generate explanation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (data) {
    return (
      <div className="ai-explain-box" role="region" aria-label="AI plain-language explanation">
        <div className="ai-explain-box__header">
          <span className="ai-explain-box__badge">AI</span>
          Plain-language summary
        </div>

        <p className="ai-explain-box__summary">{data.summary}</p>

        {/* Numbered steps with visual hierarchy */}
        <ol className="mt-4 space-y-3" aria-label="Simplified steps">
          {data.steps.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 items-start"
              aria-label={`Step ${i + 1} of ${data.steps.length}`}
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-sm text-text-secondary leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-[11px] font-semibold text-text-light border-t border-gray-100 pt-3">
          AI-generated from official ECI text · For legal accuracy, verify with the official sources linked above
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <button
        onClick={handleExplain}
        disabled={loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          fontSize: '0.85rem',
          fontWeight: 600,
          borderRadius: 8,
          border: '1.5px solid var(--color-gray-200)',
          background: 'white',
          color: 'var(--color-navy)',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        aria-label="Explain this flow in simple language using AI"
      >
        {loading ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                border: '2px solid rgba(13,31,60,0.2)',
                borderTopColor: 'var(--color-navy)',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }}
              aria-hidden="true"
            />
            Generating summary…
          </>
        ) : (
          <>✨ Explain in simple language (AI)</>
        )}
      </button>
      {error && (
        <p role="alert" style={{ marginTop: 8, color: 'var(--color-red)', fontSize: '0.82rem' }}>
          {error}
        </p>
      )}
    </div>
  )
}
