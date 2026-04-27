import type { SourceRef } from '@/lib/types/civic'

interface SourceChipProps {
  source: SourceRef
}

export default function SourceChip({ source }: SourceChipProps) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="source-chip"
      aria-label={`Official source: ${source.name} from ${source.organization} (opens in new tab)`}
      title={source.organization}
    >
      <span className="source-chip__dot" aria-hidden="true" />
      {source.name}
    </a>
  )
}
