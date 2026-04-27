import Image from 'next/image'
import ChatInput from '@/components/chat-input'
import TaskCard from '@/components/task-card'
import { CIVIC_FLOWS } from '@/data/civic-data'

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
      <section className="hero" aria-labelledby="hero-title">
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
            <div className="md:col-span-5 flex justify-center opacity-90 relative z-0 md:-ml-8 pointer-events-none">
              <Image 
                src="/images/hero.png" 
                alt="Abstract illustration of democracy and voting" 
                width={500} 
                height={500}
                className="w-full max-w-[400px] h-auto object-contain mix-blend-multiply"
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
                flow={{ id: 'timeline', title: 'Election Calendar', steps: [], nextActions: [], warnings: [], description: '' } as any}
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
                    className="w-20 h-20 object-contain drop-shadow-sm"
                 />
              </div>
              <h2 className="text-3xl font-extrabold mb-6 tracking-tight" id="trust-heading">Built on official data.</h2>
              <p className="text-text-light text-lg font-medium leading-relaxed">
                This guide translates complex official notifications into clear, actionable steps. We never invent rules or store personal identity data.
              </p>
            </div>
            <div className="space-y-10">
              {[
                { label: 'Official Sources', desc: 'Every procedural step links to the official ECI portal.' },
                { label: 'Privacy by Design', desc: 'No voter IDs or EPIC numbers are ever stored.' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-bold text-text-title mb-2 tracking-tight">{item.label}</p>
                  <p className="text-text-light text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
