'use client'

import type { SourceRef } from '@/lib/types/civic'
import { logCustomEvent } from '@/lib/firebase/config'
import { isAllowedExternalUrl } from '@/lib/security/external-links'

interface SourceChipProps {
  source: SourceRef
}

export default function SourceChip({ source }: SourceChipProps) {
  if (!isAllowedExternalUrl(source.url)) return null

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        logCustomEvent('source_chip_clicked', { source_id: source.id })
      }
      className="source-chip"
      aria-label={`Official source: ${source.name} (opens in a new tab)`}
      title={source.organization}
    >
      <span aria-hidden="true" className="mr-1">
        Official
      </span>
      {source.name}
    </a>
  )
}
