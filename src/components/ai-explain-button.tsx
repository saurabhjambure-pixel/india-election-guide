'use client'

import { useState } from 'react'
import { ExplainResponseSchema, type ExplainResponse } from '@/lib/ai/schemas'

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
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flowId, preferSimpleLanguage: true }),
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
        <ul className="ai-explain-box__steps" aria-label="Simplified steps">
          {data.steps.map((step, i) => (
            <li key={i} className="ai-explain-box__step">
              {step}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--color-gray-400)' }}>
          AI-generated summary · Verify details with official sources above
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
