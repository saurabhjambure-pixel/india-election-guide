interface AiResponsePanelProps {
  summary: string
  steps: string[]
}

export default function AiResponsePanel({
  summary,
  steps,
}: AiResponsePanelProps) {
  return (
    <div
      className="ai-explain-box"
      role="region"
      aria-label="AI plain-language explanation"
    >
      <div className="ai-explain-box__header">
        <span className="ai-explain-box__badge">✨</span>
        AI Summary
      </div>

      <p className="ai-explain-box__summary">{summary}</p>

      {/* Numbered steps with visual hierarchy */}
      <ol className="mt-4 space-y-3" aria-label="Simplified steps">
        {steps.map((step, i) => (
          <li
            key={i}
            className="flex gap-3 items-start"
            aria-label={`Step ${i + 1} of ${steps.length}`}
          >
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="text-sm text-text-secondary leading-relaxed">
              {step}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-[11px] font-semibold text-text-light border-t border-gray-100 pt-3">
        AI-generated from official ECI text · For legal accuracy, verify with
        the official sources linked above
      </p>
    </div>
  )
}
