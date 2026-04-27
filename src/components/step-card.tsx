import type { CivicStep } from '@/lib/types/civic'
import type { SourceRef } from '@/lib/types/civic'
import SourceChip from './source-chip'

interface StepCardProps {
  step: CivicStep
  stepNumber: number
  sources: Record<string, SourceRef>
}

export default function StepCard({ step, stepNumber, sources }: StepCardProps) {
  const resolvedSources = step.sourceIds
    .map((id) => sources[id])
    .filter(Boolean)

  return (
    <div className="step-item" aria-label={`Step ${stepNumber}: ${step.title}`}>
      <div className="step-line" aria-hidden="true" />
      <div className="step-number" aria-hidden="true">
        {stepNumber}
      </div>
      <div className="step-content">
        <h3 className="step-title">{step.title}</h3>
        <p className="step-body">{step.body}</p>
        
        {resolvedSources.length > 0 && (
          <div
            className="flex flex-wrap gap-2 mt-4"
            role="list"
            aria-label="Official sources"
          >
            {resolvedSources.map((source) => (
              <div key={source.id} role="listitem">
                <SourceChip source={source} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
