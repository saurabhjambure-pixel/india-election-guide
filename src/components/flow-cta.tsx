'use client'

import { logCustomEvent } from '@/lib/firebase/config'
import { isAllowedUrl } from '@/data/civic-data'

interface Action {
  label: string;
  href: string;
  type: 'external' | 'internal';
}

interface Props {
  flowId: string;
  actions: Action[];
  className?: string;
}

export default function FlowCta({ flowId, actions, className }: Props) {
  return (
    <div className={className}>
      {actions.map((action) => {
        if (action.type === 'external' && !isAllowedUrl(action.href)) return null;
        
        const isMobile = className?.includes('mobile-cta-btn');
        const baseClass = isMobile 
          ? "mobile-cta-btn" 
          : "h-14 px-10 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-2 active:scale-95";

        return (
          <a
            key={action.label}
            href={action.href}
            target={action.type === 'external' ? '_blank' : undefined}
            rel={action.type === 'external' ? 'noopener noreferrer' : undefined}
            onClick={() => logCustomEvent('flow_completed', { flow_id: flowId, action: action.label })}
            className={baseClass}
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </a>
        );
      })}
    </div>
  );
}
