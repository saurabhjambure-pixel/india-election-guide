'use client'

import { useEffect } from 'react'

export default function LearnError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="py-20 text-center container-app">
      <h2 className="text-2xl font-bold text-navy mb-4">Failed to load Learn content</h2>
      <button onClick={() => reset()} className="px-6 py-2 bg-navy text-white rounded-xl font-bold">Try again</button>
    </div>
  )
}
