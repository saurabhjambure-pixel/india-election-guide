'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the raw error server-side only — never expose to the user
    console.error('[ErrorBoundary]', error)
  }, [error])

  return (
    <div className="py-20 text-center container-app">
      <h2 className="text-2xl font-bold text-navy mb-4">
        Something went wrong
      </h2>
      <p className="text-text-secondary mb-2">
        An unexpected error occurred. Please try again or use a task below to
        navigate.
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
