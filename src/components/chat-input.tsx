'use client'

import { useState, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { ClassifyResponse } from '@/lib/ai/schemas'
import { OutOfScopeState } from './fallbacks'

const EXAMPLE_PROMPTS = [
  'How do I register to vote?',
  'Where is my polling station?',
  'I moved home. What do I update?',
]

export default function ChatInput() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ClassifyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const msg = value.trim()
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
      const data: ClassifyResponse = await res.json()
      setResult(data)

      if (data.recommended_flow_id && !data.needs_clarification && data.intent !== 'out_of_scope') {
        router.push(`/flow/${data.recommended_flow_id}`)
      }
    } catch {
      setError('Service is temporarily busy. Please try a task below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form className="search-container" onSubmit={handleSubmit} role="search" aria-label="Ask about voter services">
        <label htmlFor="chat-input" className="visually-hidden">Ask a voter question</label>
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
          <button
            key={p}
            type="button"
            onClick={() => { setValue(p); inputRef.current?.focus(); }}
            className="text-[12px] font-bold text-text-light hover:text-primary transition-colors active:scale-95"
          >
            {p} <span className="opacity-20 ml-1">·</span>
          </button>
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
