'use client'

import Link from 'next/link'
import type { CivicFlow } from '@/lib/types/civic'
import { logCustomEvent } from '@/lib/firebase/config'

interface TaskCardProps {
  flow: CivicFlow
  icon: string
  description: string
}

export default function TaskCard({ flow, icon, description }: TaskCardProps) {
  return (
    <Link
      href={`/flow/${flow.id}`}
      onClick={() => logCustomEvent('task_selected', { flow_id: flow.id })}
      className="task-card group"
      aria-label={`${flow.title} — ${description}`}
    >
      <div className="task-card__icon" aria-hidden="true">{icon}</div>
      <div className="task-card__body">
        <h3 className="task-card__title">{flow.title}</h3>
        <p className="task-card__desc">{description}</p>
      </div>
      <div className="hidden md:block text-gray-200 group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
