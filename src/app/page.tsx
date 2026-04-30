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
      <section className="hero">
        <div className="container-app relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 relative z-10">
              <h1 className="hero__title" id="hero-title">
                Voter guidance,<br />
                simplified.
              </h1>
              <p className="hero__subtitle md:mx-0">
                Step-by-step procedural guides for Indian voters. Grounded in official Election Commission sources.
              </p>
              <div className="mt-12">
                <ChatInput />
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center opacity-90 relative z-0 md:-ml-4 pointer-events-none">
              <Image 
                src="/images/hero.png" 
                alt="Abstract illustration of democracy and voting" 
                width={360} 
                height={360}
                sizes="(max-width: 768px) 100vw, 360px"
                className="w-full max-w-[320px] h-auto object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="task-section" aria-labelledby="tasks-heading">
        <div className="container-app">
          <header className="mb-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40" id="tasks-heading">
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

      <section className="py-32 bg-gray-50/30 border-y border-gray-100" aria-labelledby="trust-heading">
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
              <h2 className="text-3xl font-extrabold mb-6 tracking-tight" id="trust-heading">Built on official data.</h2>
              <p className="text-text-light text-lg font-medium leading-relaxed">
                This guide translates complex official notifications into clear, actionable steps. We never invent rules or store personal identity data.
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-text-light opacity-60">
                Privacy by Design — No voter IDs or EPIC numbers are stored.
              </p>
            </div>

            {/* Named official sources with domain names */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-text-light mb-6">Official sources used in this guide</p>
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
                  className="flex items-start gap-4 p-4 bg-white border border-border rounded-2xl hover:border-primary/20 hover:shadow-subtle transition-all group"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-text-title text-sm group-hover:text-primary transition-colors">{src.name}</p>
                    <p className="text-[11px] font-mono text-text-light mt-0.5">{src.domain}</p>
                    <p className="text-xs text-text-light mt-1">{src.desc}</p>
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
