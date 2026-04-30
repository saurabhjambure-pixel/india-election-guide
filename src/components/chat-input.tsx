'use client'

import { useState, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ClassifyResponseSchema, type ClassifyResponse } from '@/lib/ai/schemas'
import { OutOfScopeState } from './fallbacks'
import { logCustomEvent } from '@/lib/firebase/config'

const EXAMPLE_PROMPTS = [
  "I just turned 18, how do I register?",
  "My name is wrong on my voter card",
  "I moved to a new city",
  "Is my name on the voter list?",
  "When is the next election in my state?",
]

export default function ChatInput() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassifyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function submitQuery(msg: string) {
    if (!msg) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      if (!res.ok) throw new Error('Classification failed')
      const rawData = await res.json()
      const data = ClassifyResponseSchema.parse(rawData)
      setResult(data)

      if (data.recommended_flow_id && !data.needs_clarification && data.intent !== 'out_of_scope') {
        router.push(`/flow/${data.recommended_flow_id}`)
      } else if (data.intent === 'out_of_scope') {
        logCustomEvent('out_of_scope_triggered', { query: msg })
      }
    } catch {
      setError('Service is temporarily busy. Please try a task below.')
      logCustomEvent('fallback_shown', { type: 'classification_error' })
    } finally {
      setLoading(false)
    }
  }

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    // Submit immediately — no debounce on explicit submit
    submitQuery(value.trim())
  }

  return (
    <div className="w-full">
      <form className="search-container" onSubmit={handleSubmit} role="search" aria-label="Ask about voter services">
        <label htmlFor="chat-input" className="sr-only">Ask a voter question</label>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          className="search-input"
          placeholder="Ask a question..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          maxLength={200}
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
          {loading ? '...' : 'Ask Guide'}
        </button>
      </form>

      <div className="flex flex-wrap gap-3 mt-8" role="list" aria-label="Suggested questions">
        {EXAMPLE_PROMPTS.map((p) => (
            <div key={p} role="listitem">
              <button
                type="button"
                onClick={() => { setValue(p); submitQuery(p); }}
                className="text-[12px] font-bold text-text-light hover:text-primary transition-colors active:scale-95"
              >
                {p} <span className="opacity-20 ml-1">·</span>
              </button>
            </div>
        ))}
      </div>

      {error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-2xl">
          <p role="alert" className="text-sm font-bold text-red-700">⚠ {error}</p>
        </div>
      )}

      {result?.intent === 'out_of_scope' && (
        <div className="mt-12">
          <OutOfScopeState query={value} />
        </div>
      )}

      {result?.needs_clarification && (
        <div className="mt-10 p-8 bg-gray-50 border border-gray-100 rounded-3xl" role="status">
          <p className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-3">Clarification Needed</p>
          <p className="text-text-title font-bold text-xl leading-snug">{result.follow_up_question}</p>
        </div>
      )}
    </div>
  )
}
