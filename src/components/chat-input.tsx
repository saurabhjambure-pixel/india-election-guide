'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/navigation'
import { ClassifyResponseSchema, type ClassifyResponse } from '@/lib/ai/schemas'
import { OutOfScopeState } from './fallbacks'
import { logCustomEvent } from '@/lib/firebase/config'

const EXAMPLE_PROMPTS = [
  "I just turned 18, how do I register?",
  "My name is wrong on my voter card",
  "I moved to a new city",
  "How do I check if I'm on the Electoral Roll?",
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Auto-focus the input when a clarification question appears
  useEffect(() => {
    if (clarificationContext) {
      inputRef.current?.focus()
    }
  }, [clarificationContext])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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
        logCustomEvent('task_selected', { flow_id: data.recommended_flow_id, origin: 'ask-guide', intent: data.intent })
        setClarificationContext(null)
        router.push(`/flow/${data.recommended_flow_id}`)
      } else if (data.intent === 'out_of_scope' || data.intent === 'direct_answer') {
        setClarificationContext(null)
        logCustomEvent(data.intent === 'out_of_scope' ? 'out_of_scope_triggered' : 'direct_answer_provided', { origin: 'ask-guide' })
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const context = clarificationContext ?? undefined
    const val = value.trim()
    timeoutRef.current = setTimeout(() => {
      submitQuery(val, context)
    }, 300)
  }

  function handleExamplePrompt(p: string) {
    flushSync(() => {
      setClarificationContext(null)
      setValue(p)
    })
    inputRef.current?.focus()
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
          placeholder={clarificationContext ? 'Type your answer…' : 'e.g. How do I correct my name on my Voter ID?'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          maxLength={200}
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
          {loading ? '...' : clarificationContext ? 'Send' : 'Ask a Question'}
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
                className="bg-gray-100 hover:bg-blue-50 border border-gray-200 rounded-full px-3 py-1 text-sm cursor-pointer transition-colors duration-200"
              >
                {p}
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

      {result?.intent === 'direct_answer' && result.direct_answer && (
        <div className="mt-8 p-8 rounded-3xl premium-card" role="status" aria-live="polite">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-sm">✦</span>
            </div>
            <p className="eyebrow !mb-0">Instant Guide</p>
          </div>
          <p className="text-xl leading-relaxed serif" style={{ color: 'var(--ink)' }}>
            {result.direct_answer}
          </p>
          <div className="mt-6 pt-6 border-t border-ink/5">
            <p className="text-xs opacity-50">Was this helpful? Your feedback helps the guide improve.</p>
          </div>
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
