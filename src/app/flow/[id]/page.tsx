import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CIVIC_FLOWS, SOURCES } from '@/data/civic-data'
import StepCard from '@/components/step-card'
import AiExplainButton from '@/components/ai-explain-button'
import FlowCta from '@/components/flow-cta'
import FlowFeedback from '@/components/flow-feedback'
import DocumentGuide from '@/components/document-guide'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return CIVIC_FLOWS.map((f) => ({ id: f.id }))
}

// true: new flows added to civic-data.ts are served immediately on first request (ISR)
// without a full redeploy — and are cached for 1 hour thereafter.
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const flow = CIVIC_FLOWS.find((f) => f.id === id)
  if (!flow) return { title: 'Not found' }
  return {
    title: `${flow.title} · India Election Guide`,
    description: flow.description,
    openGraph: {
      title: `${flow.title} · India Election Guide`,
      description: flow.description,
      url: `https://india-election-guide.vercel.app/flow/${id}`,
      siteName: 'India Election Guide',
      images: [{ url: '/images/og.png', width: 1200, height: 630 }],
      locale: 'en_IN',
      type: 'website',
    },
  }
}

export default async function FlowPage({ params }: Props) {
  const { id } = await params
  const flow = CIVIC_FLOWS.find((f) => f.id === id)
  if (!flow) notFound()

  return (
    <div className="pb-40">
      <div className="container-app">
        <header className="flow-header">
          <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-light mb-12" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Guide</Link>
            <span aria-hidden="true" className="opacity-20">/</span>
            <span className="text-text-title">{flow.title}</span>
          </nav>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-md mb-6 border border-green-100">
            Official Guidance
          </div>
          <h1 className="flow-title">{flow.title}</h1>
          <p className="text-xl text-text-light font-medium max-w-2xl leading-relaxed">
            {flow.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            {/* Step progress bar */}
            <div className="mb-12" aria-label={`Progress: ${flow.steps.length} steps in this guide`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-light">
                  {flow.steps.length} step{flow.steps.length !== 1 ? 's' : ''} in this guide
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={flow.steps.length}
                aria-valuenow={flow.steps.length}
                aria-label={`${flow.steps.length} steps total`}
                className="h-1 w-full bg-gray-100 rounded-full overflow-hidden"
              >
                <div className="h-full bg-primary rounded-full w-full" />
              </div>
            </div>

            <div className="step-list" role="list">
              {flow.steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  totalSteps={flow.steps.length}
                  sources={SOURCES}
                />
              ))}
            </div>

            <div className="mt-20">
              <AiExplainButton flowId={flow.id} />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-16">
            {flow.eligibilityNote && (
              <div className="note-box" role="note">
                <span className="note-label">Eligibility</span>
                <p>{flow.eligibilityNote}</p>
              </div>
            )}

            {flow.requiredInfo && flow.requiredInfo.length > 0 && (
              <section aria-labelledby="checklist-heading">
                <h2 className="note-label" id="checklist-heading">What you&apos;ll need</h2>
                <ul className="space-y-4">
                  {flow.requiredInfo.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-[14px] text-text-body font-medium leading-snug">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {flow.documents && flow.documents.length > 0 && (
                  <DocumentGuide documents={flow.documents} />
                )}
              </section>
            )}

            {flow.warnings.length > 0 && (
              <section aria-labelledby="warnings-heading" className="p-8 bg-red-50/50 border border-red-100 rounded-3xl">
                <h2 className="note-label text-red-800" id="warnings-heading">Important</h2>
                <ul className="space-y-4">
                  {flow.warnings.map((warning, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-red-900 font-medium leading-relaxed">
                      <span aria-hidden="true">⚠️</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        <div className="mt-32 p-12 bg-white border border-gray-100 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Ready to begin?</h2>
            <p className="text-text-light font-medium">Continue to the official Voters&apos; Service Portal.</p>
          </div>
          <FlowCta flowId={flow.id} actions={flow.nextActions} className="flex gap-4" />
        </div>

        <FlowFeedback flowId={flow.id} />
      </div>

      <div className="mobile-cta">
        <FlowCta flowId={flow.id} actions={flow.nextActions.slice(0, 1)} className="mobile-cta-btn" />
      </div>
    </div>
  )
}

