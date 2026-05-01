'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
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
  // Tracks one round of clarification: original message + AI follow-up question
  const [clarificationContext, setClarificationContext] = useState<{ original: string; question: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Auto-focus the input when a clarification question appears
  useEffect(() => {
    if (clarificationContext) {
      inputRef.current?.focus()
    }
  }, [clarificationContext])

  async function submitQuery(msg: string, context?: { original: string; question: string }) {
    if (!msg) return

    setLoading(true)
    setError(null)
    setResult(null)

    // Build request body — include clarification context on second turn
    const body: { message: string; context?: string } = { message: msg }
    if (context) {
      body.context = `User was asked: "${context.question}" and replied: "${msg}"`
    }

    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Classification failed')
      const rawData = await res.json()
      const data = ClassifyResponseSchema.parse(rawData)
      setResult(data)

      if (data.recommended_flow_id && !data.needs_clarification && data.intent !== 'out_of_scope') {
        logCustomEvent('classify_success', { flow_id: data.recommended_flow_id, intent: data.intent })
        setClarificationContext(null)
        router.push(`/flow/${data.recommended_flow_id}`)
      } else if (data.intent === 'out_of_scope') {
        setClarificationContext(null)
        logCustomEvent('out_of_scope_triggered', { query: msg })
      } else if (data.needs_clarification && data.follow_up_question && !context) {
        // First clarification round — show the question and re-enable input
        logCustomEvent('clarification_shown', { intent: data.intent })
        setClarificationContext({ original: msg, question: data.follow_up_question })
        setValue('')
      } else {
        // Second turn still needs clarification or couldn't route — treat as out of scope
        setClarificationContext(null)
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
    const context = clarificationContext ?? undefined
    submitQuery(value.trim(), context)
  }

  function handleExamplePrompt(p: string) {
    setClarificationContext(null)
    setValue(p)
    submitQuery(p)
  }

  return (
    <div className="w-full">
      <form className="search-container" onSubmit={handleSubmit} role="search" aria-label="Ask about voter services">
        <label htmlFor="chat-input" className="sr-only">
          {clarificationContext ? clarificationContext.question : 'Ask a voter question'}
        </label>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          className="search-input"
          placeholder={clarificationContext ? 'Type your answer…' : 'Ask a question...'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          maxLength={200}
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
          {loading ? '...' : clarificationContext ? 'Send' : 'Ask Guide'}
        </button>
      </form>

      {/* Clarification question — shown as an interactive prompt above the input */}
      {clarificationContext && (
        <div className="mt-6 p-6 rounded-2xl note-box" role="status" aria-live="polite">
          <p className="eyebrow mb-2">One more thing</p>
          <p className="font-bold text-lg leading-snug serif" style={{ color: 'var(--ink)' }}>{clarificationContext.question}</p>
          <p className="text-xs mt-2" style={{ color: 'var(--ink-3)' }}>Type your answer above and press Send.</p>
        </div>
      )}

      {!clarificationContext && (
        <div className="flex flex-wrap gap-3 mt-8" role="list" aria-label="Suggested questions">
          {EXAMPLE_PROMPTS.map((p) => (
            <div key={p} role="listitem">
              <button
                type="button"
                onClick={() => handleExamplePrompt(p)}
                className="text-[12px] font-bold transition-colors active:scale-95 pill pill-accent"
              >
                {p} <span className="opacity-20 ml-1">·</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 rounded-2xl border" style={{ background: 'rgba(225, 29, 72, 0.05)', borderColor: 'rgba(225, 29, 72, 0.2)' }}>
          <p role="alert" className="text-sm font-bold" style={{ color: '#e11d48' }}>⚠ {error}</p>
        </div>
      )}

      {result?.intent === 'out_of_scope' && (
        <div className="mt-12">
          <OutOfScopeState query={value} />
        </div>
      )}
    </div>
  )
}
