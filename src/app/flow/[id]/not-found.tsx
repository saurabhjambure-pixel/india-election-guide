import Link from 'next/link'

export default function FlowNotFound() {
  return (
    <div className="py-20 text-center container-app">
      <h2 className="text-2xl font-bold text-navy mb-4">Flow not found</h2>
      <p className="text-text-secondary mb-8">We could not find the procedural guide you are looking for.</p>
      <Link href="/" className="px-6 py-2 bg-navy text-white rounded-xl font-bold">Back to Home</Link>
    </div>
  )
}
