import Link from 'next/link'

export const MOCK_TIMELINES = [
  {
    state: 'National',
    event: 'General Elections 2024',
    status: 'Completed',
    date: 'Phase 1-7 complete',
    source: 'ECI Notification',
  },
  {
    state: 'Maharashtra',
    event: 'Legislative Assembly Elections',
    status: 'Live',
    date: 'Polling: November 20, 2024',
    source: 'ECI Schedule',
  },
  {
    state: 'Delhi',
    event: 'Special Summary Revision',
    status: 'Upcoming',
    date: 'Oct 29 – Nov 28, 2024',
    source: 'CEO Delhi',
  },
]

export default function TimelinePage() {
  return (
    <div className="py-16">
      <div className="container-app">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Election Timelines</h1>
          <p className="text-text-secondary text-lg max-w-xl font-medium">
            Stay updated with official election schedules and voter registration deadlines.
          </p>
        </header>

        <div className="space-y-4">
          {MOCK_TIMELINES.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-border p-8 rounded-[var(--radius-lg)] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-card transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded ${
                    item.status === 'Live' ? 'bg-red-50 text-red-600 border border-red-100' :
                    item.status === 'Upcoming' ? 'bg-blue-50 text-primary border border-blue-100' :
                    'bg-gray-50 text-gray-400 border border-gray-100'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">{item.state}</span>
                </div>
                <h3 className="text-2xl font-bold">{item.event}</h3>
                <p className="text-text-secondary font-medium">{item.date}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-tighter opacity-40">Source: {item.source}</span>
                <a
                  href="https://eci.gov.in/elections/election-schedule/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-bg-subtle border border-border rounded-xl text-xs font-bold text-navy hover:bg-gray-100 transition-all active:scale-95"
                >
                  Details ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-white border border-border rounded-[var(--radius-lg)] shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📅</span> Registration Deadlines
          </h2>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-2xl">
            You can register to vote up to 10 days before the last date of filing nominations. Check the specific schedule for your constituency on the ECI portal.
          </p>
          <Link href="/flow/register-new" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
            Register now <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
