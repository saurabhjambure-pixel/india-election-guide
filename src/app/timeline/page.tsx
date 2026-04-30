import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Election Timelines · India Election Guide',
  description: 'Stay updated with official election schedules and voter registration deadlines.',
  openGraph: {
    title: 'Election Timelines · India Election Guide',
    description: 'Stay updated with official election schedules and voter registration deadlines.',
    url: 'https://india-election-guide.vercel.app/timeline',
    siteName: 'India Election Guide',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}

// Timeline data — last reviewed April 2026
// Update this array and LAST_REVIEWED after each content review.
const LAST_REVIEWED = 'April 2026'

type TimelineStatus = 'Completed' | 'Upcoming' | 'Live'

interface TimelineEvent {
  state: string
  event: string
  status: TimelineStatus
  date: string
  year: number    // used for visual positioning
  source: string
  sourceUrl: string
}

const ELECTION_TIMELINES: TimelineEvent[] = [
  {
    state: 'National',
    event: 'General Elections 2024',
    status: 'Completed',
    date: 'April 19 – June 1, 2024 (7 phases)',
    year: 2024,
    source: 'ECI Notification',
    sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
  },
  {
    state: 'Bihar',
    event: 'Legislative Assembly Elections',
    status: 'Upcoming',
    date: 'Expected late 2025 / 2026 — check ECI for confirmed schedule',
    year: 2025,
    source: 'ECI Schedule',
    sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
  },
  {
    state: 'West Bengal',
    event: 'Municipal Elections',
    status: 'Upcoming',
    date: 'Check State Election Commission for confirmed dates',
    year: 2026,
    source: 'State Election Commission',
    sourceUrl: 'https://eci.gov.in/elections/election-schedule/',
  },
]

const STATUS_STYLES: Record<TimelineStatus, { badge: string; dot: string }> = {
  Live:      { badge: 'bg-red-50 text-red-700 border border-red-100',   dot: 'bg-red-500' },
  Upcoming:  { badge: 'bg-blue-50 text-primary border border-blue-100', dot: 'bg-primary' },
  Completed: { badge: 'bg-gray-100 text-gray-700 border border-gray-200', dot: 'bg-gray-400' },
}

// Derive a 0–100 position for the visual axis from the year span in the data
function axisPosition(year: number, allYears: number[]): number {
  const min = Math.min(...allYears)
  const max = Math.max(...allYears)
  if (min === max) return 50
  return Math.round(((year - min) / (max - min)) * 80 + 10) // 10–90 % range
}

export default function TimelinePage() {
  const years = ELECTION_TIMELINES.map((e) => e.year)

  return (
    <div className="py-16">
      <div className="container-app">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Election Timelines</h1>
          <p className="text-text-secondary text-lg max-w-xl font-medium">
            Stay updated with official election schedules and voter registration deadlines.
          </p>
        </header>

        {/* Official source notice */}
        <div className="mb-12 p-8 bg-blue-50/50 border border-blue-100 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" aria-hidden="true" />
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
            Live Schedules on ECI
          </h2>
          <p className="text-text-title text-lg font-medium leading-relaxed">
            The most up-to-date election schedules are published directly by the Election Commission of India.
            For confirmed dates, notifications, and phase-wise schedules, always check the official ECI portal.
          </p>
          <a
            href="https://eci.gov.in/elections/election-schedule/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-primary font-bold text-sm hover:underline"
            aria-label="View official ECI election schedule (opens in a new tab)"
          >
            View official ECI schedule ↗
          </a>
          <p className="text-xs text-text-light mt-4 font-medium">
            Below data last reviewed: {LAST_REVIEWED}. Content is manually maintained — verify with official sources.
          </p>
        </div>

        {/* Visual timeline axis */}
        <div className="mb-10 hidden md:block" aria-hidden="true">
          <div className="relative h-16">
            {/* Axis line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2" />
            {/* Event markers on the axis */}
            {ELECTION_TIMELINES.map((item) => {
              const pos = axisPosition(item.year, years)
              const styles = STATUS_STYLES[item.status]
              return (
                <div
                  key={item.event}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                  style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-3 h-3 rounded-full ring-2 ring-white ${styles.dot}`} />
                  <span className="text-[10px] font-bold text-text-light whitespace-nowrap">{item.state}</span>
                </div>
              )
            })}
            {/* Year labels at ends */}
            <span className="absolute left-0 bottom-0 text-[10px] text-text-light font-bold">{Math.min(...years)}</span>
            <span className="absolute right-0 bottom-0 text-[10px] text-text-light font-bold">{Math.max(...years)}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            {(['Completed', 'Upcoming', 'Live'] as TimelineStatus[]).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${STATUS_STYLES[s].dot}`} />
                <span className="text-[10px] font-bold text-text-light">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event cards */}
        <div className="space-y-4">
          {ELECTION_TIMELINES.map((item) => {
            const styles = STATUS_STYLES[item.status]
            return (
              <div
                key={item.event}
                className="bg-white border border-border p-8 rounded-[var(--radius-lg)] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-card transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded ${styles.badge}`}>
                      {item.status}
                    </span>
                    <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">{item.state}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{item.event}</h3>
                  <p className="text-text-secondary font-medium">{item.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold text-text-light uppercase tracking-tighter">Source: {item.source}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-bg-subtle border border-border rounded-xl text-xs font-bold text-navy hover:bg-gray-100 transition-all active:scale-95"
                    aria-label={`View details for ${item.event} on ECI (opens in a new tab)`}
                  >
                    Details ↗
                  </a>
                </div>
              </div>
            )
          })}
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
