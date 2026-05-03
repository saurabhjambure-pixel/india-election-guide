import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function TimelineFlowPlaceholder() {
  // Immediate redirect as requested.
  // If the card eventually needs its own dedicated flow-style page,
  // remove the redirect below and use the scaffolded placeholder.
  redirect('/timeline')

  return (
    <main className="container-app py-12">
      <div className="mb-8">
        <p
          className="text-sm font-semibold tracking-wider uppercase"
          style={{ color: 'var(--ink-3)' }}
        >
          <Link href="/" className="hover:underline">
            GUIDE
          </Link>{' '}
          &gt; ELECTION TIMELINES
        </p>
      </div>
      <h1
        className="text-4xl font-extrabold mb-6 serif"
        style={{ color: 'var(--ink)' }}
      >
        Election Timelines
      </h1>
      <p className="text-lg" style={{ color: 'var(--ink-2)' }}>
        For the full election calendar, see the{' '}
        <Link
          href="/timeline"
          className="underline font-bold"
          style={{ color: 'var(--ink)' }}
        >
          Timelines page
        </Link>
        .
      </p>
    </main>
  )
}
