'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function FlowError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[FlowError]', error)
  }, [error])

  return (
    <div className="py-20 text-center container-app">
      <h2 className="text-2xl font-bold text-navy mb-4">
        Could not load this guide
      </h2>
      <p className="text-text-secondary mb-2">
        There was a problem loading the voter guide. Please try again.
      </p>
      {error.digest && (
        <p className="text-xs text-text-light mb-8">
          Reference: <code className="font-mono">{error.digest}</code>
        </p>
      )}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-navy text-white rounded-xl font-bold"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2 border border-navy text-navy rounded-xl font-bold hover:bg-gray-50"
        >
          Back to Guide
        </Link>
      </div>
    </div>
  )
}
