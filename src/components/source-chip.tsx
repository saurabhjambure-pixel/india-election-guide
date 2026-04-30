'use client'

import type { SourceRef } from '@/lib/types/civic'
import { isAllowedUrl } from '@/data/civic-data'
import { logCustomEvent } from '@/lib/firebase/config'

interface SourceChipProps {
  source: SourceRef
}

export default function SourceChip({ source }: SourceChipProps) {
  if (!isAllowedUrl(source.url)) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logCustomEvent('source_chip_clicked', { source_id: source.id })}
      className="source-chip"
      aria-label={`Official source: ${source.name} (opens in a new tab)`}
      title={source.organization}
    >
      <span aria-hidden="true" className="mr-1">🔒</span>
      {source.name}
    </a>
  )
}
