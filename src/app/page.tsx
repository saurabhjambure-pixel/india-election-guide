import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = false;

export const metadata: Metadata = {
  title: 'India Election Guide',
  description: 'Step-by-step procedural guides for Indian voters. Grounded in official Election Commission sources.',
  openGraph: {
    title: 'India Election Guide',
    description: 'Step-by-step procedural guides for Indian voters. Grounded in official Election Commission sources.',
    url: 'https://india-election-guide.vercel.app',
    siteName: 'India Election Guide',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}
import ChatInput from '@/components/chat-input'
import TaskCard from '@/components/task-card'
import { CIVIC_FLOWS } from '@/data/civic-data'
import type { CivicFlow } from '@/lib/types/civic'

const FLOW_META: Record<string, { icon: string; shortDesc: string }> = {
  'register-new':    { icon: '🗳️', shortDesc: 'Enroll as a first-time voter in your constituency.' },
  'check-enrollment': { icon: '🔍', shortDesc: 'Verify your name on the current electoral roll.' },
  'correct-details': { icon: '✏️', shortDesc: 'Update your name, photo, or voter details.' },
  'shift-residence': { icon: '📦', shortDesc: 'Relocate your enrollment to a new address.' },
  'polling-info':    { icon: '📍', shortDesc: 'Find your designated polling station.' },
}

export default function HomePage() {
  return (
    <>
      <section className="hero" style={{ paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: text content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border"
                  style={{ background: 'var(--paper-2)', borderColor: 'var(--line)', color: 'var(--ink-2)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--good)' }} />
                  Official Voter Resource
                </span>
              </div>

              <h1
                className="serif mb-6"
                id="hero-title"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.06, fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--ink)' }}
              >
                Empowering your civic<br />duty with absolute<br />clarity.
              </h1>

              <p className="mb-10" style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '36rem' }}>
                Navigate the electoral process with confidence. Access official timelines, verify your registration status, and understand your rights through our structured, institutional guide.
              </p>

              <ChatInput />
            </div>

            {/* Right: browser mockup */}
            <div className="hidden md:block pointer-events-none">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 2px 4px oklch(0.18 0.015 60 / 0.06), 0 20px 60px oklch(0.18 0.015 60 / 0.14)',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4"
                  style={{ height: 36, background: 'oklch(0.2 0.01 240)', borderBottom: '1px solid oklch(0.3 0.01 240)' }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.65 0.18 25)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.72 0.16 70)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.65 0.18 140)' }} />
                  <div
                    className="mx-auto flex items-center gap-2 px-3 rounded text-xs"
                    style={{ background: 'oklch(0.28 0.01 240)', color: 'oklch(0.6 0.01 240)', height: 22, minWidth: 180 }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                    </svg>
                    localhost:3000
                  </div>
                </div>

                {/* Screenshot: inner mini-UI */}
                <div style={{ background: 'var(--paper)', padding: '20px 24px 0' }}>
                  {/* Mini header */}
                  <div className="flex items-center justify-between mb-4" style={{ borderBottom: '1px solid var(--line-2)', paddingBottom: 12 }}>
                    <span className="font-bold text-xs serif" style={{ color: 'var(--ink)' }}>India Election Guide</span>
                    <div className="flex items-center gap-3">
                      {['Guide', 'Timelines', 'Learn'].map(n => (
                        <span key={n} className="text-[9px] font-semibold" style={{ color: n === 'Guide' ? 'var(--accent)' : 'var(--ink-4)' }}>{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Mini hero content + illustration side by side */}
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="font-bold serif mb-1" style={{ fontSize: 14, lineHeight: 1.2, color: 'var(--ink)' }}>Voter guidance,<br />simplified.</p>
                      <p className="mb-3" style={{ fontSize: 7, lineHeight: 1.5, color: 'var(--ink-3)' }}>Step-by-step procedural guides for Indian voters. Grounded in official Election Commission sources.</p>
                      <div className="flex items-center gap-1 rounded-lg px-2" style={{ height: 22, background: 'var(--paper)', border: '1px solid var(--line)' }}>
                        <span style={{ fontSize: 7, color: 'var(--ink-4)', flex: 1 }}>Ask a question...</span>
                        <span className="rounded px-1.5 text-white" style={{ fontSize: 6, background: 'var(--accent)', height: 14, display: 'flex', alignItems: 'center' }}>Ask Guide</span>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
                      <Image
                        src="/images/hero.png"
                        alt=""
                        fill
                        sizes="100px"
                        className="object-contain"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="task-section" aria-labelledby="tasks-heading">
        <div className="container-app">
          <header className="mb-12">
            <h2 className="eyebrow" id="tasks-heading">
              Guided Voter Tasks
            </h2>
          </header>

          <div className="task-grid" role="list">
            {CIVIC_FLOWS.map((flow) => {
              const meta = FLOW_META[flow.id]
              if (!meta) return null
              return (
                <div key={flow.id} role="listitem">
                  <TaskCard
                    flow={flow}
                    icon={meta.icon}
                    description={meta.shortDesc}
                  />
                </div>
              )
            })}

            <div role="listitem">
              <TaskCard
                flow={{ 
                  id: 'timeline', 
                  title: 'Election Calendar', 
                  intent: 'view_timeline',
                  description: 'View upcoming election dates and registration deadlines.',
                  steps: [], 
                  nextActions: [], 
                  warnings: [], 
                  updatedAt: new Date().toISOString() 
                } as CivicFlow}
                icon="📅"
                description="View upcoming election dates and registration deadlines."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 border-y" style={{ background: 'var(--paper-2)', borderColor: 'var(--line-2)' }} aria-labelledby="trust-heading">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="mb-8">
                <Image
                  src="/images/trust.png"
                  alt="Trust and Security Emblem"
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-20 h-20 object-contain drop-shadow-sm"
                />
              </div>
              <h2 className="text-3xl font-extrabold mb-6 tracking-tight serif" id="trust-heading" style={{ color: 'var(--ink)' }}>Built on official data.</h2>
              <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                This guide translates complex official notifications into clear, actionable steps. We never invent rules or store personal identity data.
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>
                Privacy by Design — No voter IDs or EPIC numbers are stored.
              </p>
            </div>

            {/* Named official sources with domain names */}
            <div className="space-y-4">
              <p className="eyebrow mb-6">Official sources used in this guide</p>
              {[
                {
                  name: 'Election Commission of India',
                  domain: 'eci.gov.in',
                  desc: 'Constitutional body overseeing all Indian elections.',
                  href: 'https://eci.gov.in/',
                },
                {
                  name: "Voters' Service Portal",
                  domain: 'voters.eci.gov.in',
                  desc: 'Register, correct details, shift address, download e-EPIC.',
                  href: 'https://voters.eci.gov.in/',
                },
                {
                  name: 'Electoral Search',
                  domain: 'electoralsearch.eci.gov.in',
                  desc: 'Check your name on the roll and find your polling station.',
                  href: 'https://electoralsearch.eci.gov.in/',
                },
                {
                  name: 'SVEEP',
                  domain: 'ecisveep.nic.in',
                  desc: "ECI's voter awareness and participation programme.",
                  href: 'https://ecisveep.nic.in/',
                },
              ].map((src) => (
                <a
                  key={src.domain}
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${src.name} — ${src.domain} (opens in a new tab)`}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all group card"
                  style={{ background: 'var(--paper)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                >
                  <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: 'var(--good)' }} aria-hidden="true" />
                  <div>
                    <p className="font-bold text-sm group-hover:opacity-70 transition-colors serif">{src.name}</p>
                    <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--ink-3)' }}>{src.domain}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--ink-3)' }}>{src.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
