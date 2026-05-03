'use client'

import { useEffect } from 'react'

export default function TimelineError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[TimelineError]', error)
  }, [error])

  return (
    <div className="py-20 text-center container-app">
      <h2 className="text-2xl font-bold text-navy mb-4">
        Could not load Timelines
      </h2>
      <p className="text-text-secondary mb-2">
        There was a problem loading the election timeline. Please try again.
      </p>
      {error.digest && (
        <p className="text-xs text-text-light mb-8">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      )}
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-navy text-white rounded-xl font-bold"
      >
        Try again
      </button>
    </div>
  )
}
