'use client'

import { logCustomEvent } from '@/lib/firebase/config'
import { isAllowedExternalUrl } from '@/lib/security/external-links'

interface Action {
  label: string
  href: string
  type: 'external' | 'internal'
}

interface Props {
  flowId: string
  actions: Action[]
  variant?: 'default' | 'mobile'
  className?: string
}

export default function FlowCta({
  flowId,
  actions,
  variant,
  className,
}: Props) {
  const isMobile = variant === 'mobile' || className?.includes('mobile-cta-btn')

  return (
    <div className={className}>
      {actions.map((action) => {
        if (action.type === 'external' && !isAllowedExternalUrl(action.href))
          return null

        const baseClass = isMobile
          ? 'mobile-cta-btn'
          : 'h-14 px-10 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-2 active:scale-95'

        const ariaLabel =
          action.type === 'external'
            ? `${action.label} (opens in a new tab)`
            : action.label

        return (
          <a
            key={action.label}
            href={action.href}
            target={action.type === 'external' ? '_blank' : undefined}
            rel={action.type === 'external' ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel}
            onClick={() =>
              logCustomEvent('flow_completed', {
                flow_id: flowId,
                action: action.label,
              })
            }
            className={baseClass}
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </a>
        )
      })}
    </div>
  )
}
