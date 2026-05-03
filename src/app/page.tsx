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
import ExternalLink from '@/components/external-link'
import TaskCard from '@/components/task-card'
import { getFlows } from '@/lib/firebase/firestore'
import type { CivicFlow } from '@/lib/types/civic'

const FLOW_META: Record<string, { icon: string; shortDesc: string }> = {
  'register-new': { icon: '🗳️', shortDesc: 'Enroll as a first-time voter in your constituency.' },
  'check-enrollment': { icon: '🔍', shortDesc: 'Verify your name on the current electoral roll.' },
  'correct-details': { icon: '✏️', shortDesc: 'Update your name, photo, or voter details.' },
  'shift-residence': { icon: '📦', shortDesc: 'Relocate your enrollment to a new address.' },
  'polling-info': { icon: '📍', shortDesc: 'Find your designated polling station.' },
}

export default async function HomePage() {
  const CIVIC_FLOWS = await getFlows()
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
                Empowering your civic duty <br /> with absolute clarity.
              </h1>

              <p className="mb-10" style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '36rem' }}>
                Navigate the electoral process with confidence. Access official timelines, verify your registration status, and understand your rights through our structured, institutional guide.
              </p>

              <ChatInput />
            </div>

            {/* Right: Hero Image */}
            <div className="hidden md:flex justify-center items-center pointer-events-none">
              <div className="relative" style={{ width: '100%', maxWidth: 500, aspectRatio: '1/1' }}>
                <Image
                  src="/images/hero-voting.svg"
                  alt="Voter guidance illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain"
                  aria-hidden="true"
                />
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
                href="/timeline"
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
                <ExternalLink
                  key={src.domain}
                  href={src.href}
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
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
