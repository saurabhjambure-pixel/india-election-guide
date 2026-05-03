import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found · India Election Guide',
}

export default function NotFound() {
  return (
    <div
      style={{ padding: '80px 0', textAlign: 'center' }}
      role="main"
      aria-labelledby="not-found-title"
    >
      <div className="container-app">
        <p style={{ fontSize: '3rem', marginBottom: 16 }} aria-hidden="true">
          🗳️
        </p>
        <h1
          id="not-found-title"
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-navy)',
            marginBottom: 10,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--color-gray-600)',
            marginBottom: 28,
          }}
        >
          This flow or page doesn&apos;t exist. Return to the home page to
          select a task.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--color-saffron)',
            color: 'white',
            fontWeight: 700,
            padding: '12px 24px',
            borderRadius: 10,
            fontSize: '0.9rem',
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
