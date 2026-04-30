import Link from 'next/link'

interface ErrorStateProps {
  title?: string
  message: string
  actionLabel?: string
  actionHref?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  actionLabel = 'Back to Home',
  actionHref = '/',
}: ErrorStateProps) {
  return (
    <div className="py-20 text-center container-app">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl" aria-hidden="true">
        ⚠
      </div>
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">{message}</p>
      <Link
        href={actionHref}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="py-20 text-center container-app">
      <div className="w-10 h-10 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
      <p className="text-text-secondary font-medium">{message}</p>
    </div>
  )
}

export function OutOfScopeState({ query }: { query: string }) {
  return (
    <div className="p-8 bg-gray-50 border border-border rounded-2xl text-center">
      <p className="text-4xl mb-4" aria-hidden="true">🤐</p>
      <h2 className="text-xl font-bold mb-2">Out of Scope</h2>
      <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
        I noticed you asked about &quot;{query}&quot;. As an official election guide, I only provide non-partisan information about voting procedures and rules. I cannot provide political opinions, campaign info, or legal advice.
      </p>
      <div className="flex flex-col gap-2 max-w-xs mx-auto">
        <Link href="/" className="text-primary font-bold text-sm">View guided voter tasks →</Link>
        <Link href="/learn" className="text-primary font-bold text-sm">Learn about voting rules →</Link>
      </div>
    </div>
  )
}
