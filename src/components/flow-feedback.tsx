'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { app } from '@/lib/firebase/config'
import { logCustomEvent } from '@/lib/firebase/config'
import { redactSensitiveIds } from '@/lib/privacy'

interface Props {
  flowId: string
}

type Stage = 'idle' | 'commenting' | 'done' | 'error'

export default function FlowFeedback({ flowId }: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  const [submitting, setSubmitting] = useState(false)
  const [comment, setComment] = useState('')

  async function submit(helpful: boolean) {
    if (submitting || stage === 'done') return

    // Not helpful → collect optional comment first
    if (!helpful && stage === 'idle') {
      setStage('commenting')
      return
    }

    setSubmitting(true)
    try {
      if (app) {
        const { getFirestore } = await import('firebase/firestore')
        const db = getFirestore(app)
        const payload: Record<string, unknown> = {
          flowId,
          helpful,
          timestamp: serverTimestamp(),
        }
        const sanitizedComment = redactSensitiveIds(comment.trim()).slice(
          0,
          1000
        )
        if (sanitizedComment) payload.comment = sanitizedComment
        await addDoc(collection(db, 'feedback'), payload)
      }
      logCustomEvent('flow_feedback', { flow_id: flowId, helpful })
      setStage('done')
    } catch {
      setStage('error')
    } finally {
      setSubmitting(false)
    }
  }

  if (stage === 'done') {
    return (
      <div
        className="mt-16 p-8 bg-green-50 border border-green-100 rounded-2xl text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-green-800 font-bold text-lg mb-1">
          Thanks for your feedback!
        </p>
        <p className="text-green-700 text-sm">
          It helps us improve the guide for voters across India.
        </p>
      </div>
    )
  }

  if (stage === 'error') {
    return (
      <div
        className="mt-16 p-8 bg-red-50 border border-red-100 rounded-2xl text-center"
        role="alert"
      >
        <p className="text-red-800 font-bold">
          Could not save feedback — please try again later.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-16 p-8 bg-gray-50 border border-gray-100 rounded-2xl">
      <p className="text-[11px] font-bold text-text-light uppercase tracking-widest mb-4">
        Was this guide helpful?
      </p>

      {stage === 'idle' && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => submit(true)}
            className="px-6 py-2.5 bg-white border border-green-200 text-green-800 font-bold text-sm rounded-xl hover:bg-green-50 transition-all active:scale-95"
            aria-label="Yes, this guide was helpful"
          >
            👍 Yes
          </button>
          <button
            onClick={() => submit(false)}
            className="px-6 py-2.5 bg-white border border-gray-200 text-text-secondary font-bold text-sm rounded-xl hover:bg-gray-100 transition-all active:scale-95"
            aria-label="No, this guide was not helpful — leave a comment"
          >
            👎 No
          </button>
        </div>
      )}

      {stage === 'commenting' && (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary font-medium">
            What could be clearer?{' '}
            <span className="text-text-light">(optional)</span>
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="e.g. I didn't understand what documents to bring"
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-text-body resize-none focus:outline-none focus:border-primary/40"
            aria-label="Optional feedback comment"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => submit(false)}
              disabled={submitting}
              className="px-6 py-2.5 bg-navy text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Submit'}
            </button>
            <button
              onClick={() => setStage('idle')}
              disabled={submitting}
              className="px-4 py-2.5 text-text-light font-bold text-sm hover:text-text-secondary transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
