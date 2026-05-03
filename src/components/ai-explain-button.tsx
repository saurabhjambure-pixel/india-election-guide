'use client'

import { useState } from 'react'
import { ExplainResponseSchema, type ExplainResponse } from '@/lib/ai/schemas'
import { logCustomEvent } from '@/lib/firebase/config'
import SkeletonLoader from './skeleton-loader'
import RetryButton from './retry-button'
import AiResponsePanel from './ai-response-panel'

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
    logCustomEvent('ai_explain_used', { flow_id: flowId })
    try {
      // GET request — browser and CDN will cache this response for 24 hours
      const res = await fetch(
        `/api/explain?flowId=${encodeURIComponent(flowId)}&simple=true`,
        {
          method: 'GET',
        }
      )

      if (!res.ok) {
        if (res.status === 429) {
          const body = await res.json()
          setError(body.error || 'Daily AI limit reached.')
          return
        }
        throw new Error('Explain failed')
      }

      const rawData = await res.json()
      const json = ExplainResponseSchema.parse(rawData)
      setData(json)
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not generate explanation. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Show response panel if data is available
  if (data) {
    return <AiResponsePanel summary={data.summary} steps={data.steps} />
  }

  // Show loading state with skeleton
  if (loading) {
    return (
      <div style={{ marginBottom: 28 }}>
        <SkeletonLoader lines={3} />
        <button
          disabled={true}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            marginTop: 16,
            fontSize: '0.85rem',
            fontWeight: 600,
            borderRadius: 8,
            border: '1.5px solid var(--color-gray-200)',
            background: 'white',
            color: 'var(--color-navy)',
            cursor: 'not-allowed',
            opacity: 0.6,
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          aria-label="Generating AI explanation"
        >
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
        </button>
      </div>
    )
  }

  // Show error state with retry button
  if (error) {
    return (
      <div style={{ marginBottom: 28 }}>
        <p
          role="alert"
          style={{
            marginTop: 0,
            color: 'var(--color-red)',
            fontSize: '0.82rem',
            marginBottom: 8,
          }}
        >
          {error}
        </p>
        <RetryButton onClick={handleExplain} />
      </div>
    )
  }

  // Show button for initial state
  return (
    <div style={{ marginBottom: 28 }}>
      <button
        onClick={handleExplain}
        disabled={false}
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
          cursor: 'pointer',
          opacity: 1,
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor =
            'var(--color-navy)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
            'var(--shadow-md)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor =
            'var(--color-gray-200)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
        }}
        aria-label="Explain this flow in simple language using AI"
      >
        ✨ Explain in simple language (AI)
      </button>
    </div>
  )
}
