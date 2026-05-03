'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import ExternalLink from './external-link'

// ---------------------------------------------------------------------------
// Tree data — Question (yes/no), Choice (multi-option), or Result (leaf).
// ---------------------------------------------------------------------------
type QuestionNode = {
  type: 'question'
  id: string
  text: string
  yes: string
  no: string
}

type ChoiceNode = {
  type: 'choice'
  id: string
  text: string
  options: { label: string; next: string }[]
}

type ResultNode = {
  type: 'result'
  id: string
  form: string
  description: string
  href: string
  linkKind: 'internal' | 'external'
  ctaLabel: string
  externalAriaLabel?: string
}

type TreeNode = QuestionNode | ChoiceNode | ResultNode

const TREE: TreeNode[] = [
  {
    type: 'question',
    id: 'q_first_time',
    text: 'Are you registering to vote for the first time?',
    yes: 'result_form6',
    no: 'q_what_do',
  },
  {
    type: 'choice',
    id: 'q_what_do',
    text: 'What do you want to do?',
    options: [
      {
        label: 'Update my name, age, photo, or other personal details',
        next: 'result_form8_personal',
      },
      {
        label: 'Change my registered address (new constituency)',
        next: 'result_form8a',
      },
      {
        label: 'Change address within the same constituency',
        next: 'result_form8_same_const',
      },
      {
        label: 'Report a wrongly included entry / deletion',
        next: 'result_form7',
      },
      {
        label: "I'm an overseas Indian citizen",
        next: 'result_form6a',
      },
    ],
  },
  {
    type: 'result',
    id: 'result_form6',
    form: 'Form 6',
    description: 'New voter registration — enroll on the electoral roll for the first time.',
    href: '/flow/register-new',
    linkKind: 'internal',
    ctaLabel: 'Go to Register as a new voter Guide →',
  },
  {
    type: 'result',
    id: 'result_form8_personal',
    form: 'Form 8',
    description: 'Correct your name, age, photograph, or other particulars on the electoral roll.',
    href: '/flow/correct-details',
    linkKind: 'internal',
    ctaLabel: 'Go to Correct Voter Details Guide →',
  },
  {
    type: 'result',
    id: 'result_form8a',
    form: 'Form 8A',
    description: 'Shift your enrollment when you move to a new address (including a new constituency).',
    href: '/flow/shift-residence',
    linkKind: 'internal',
    ctaLabel: 'Go to Shift Residence Guide →',
  },
  {
    type: 'result',
    id: 'result_form8_same_const',
    form: 'Form 8',
    description: 'Update your address within the same assembly constituency on the electoral roll.',
    href: '/flow/correct-details',
    linkKind: 'internal',
    ctaLabel: 'Go to Correct Voter Details Guide →',
  },
  {
    type: 'result',
    id: 'result_form7',
    form: 'Form 7',
    description: 'Object to inclusion of a name or seek deletion of an incorrect entry from the roll.',
    href: 'https://voters.eci.gov.in/',
    linkKind: 'external',
    ctaLabel: "Go to Form 7 on Voters' Service Portal →",
    externalAriaLabel:
      'Open Form 7 application on the Election Commission Voters Service Portal (opens in a new tab)',
  },
  {
    type: 'result',
    id: 'result_form6a',
    form: 'Form 6A',
    description: 'Register as an overseas elector (Indian citizen resident abroad).',
    href: 'https://voters.eci.gov.in/',
    linkKind: 'external',
    ctaLabel: "Go to Form 6A on Voters' Service Portal →",
    externalAriaLabel:
      'Open Form 6A overseas elector registration on the Election Commission Voters Service Portal (opens in a new tab)',
  },
]

const NODE_MAP = Object.fromEntries(TREE.map((n) => [n.id, n])) as Record<string, TreeNode>
const START_ID = 'q_first_time'

const choiceBtnClass =
  'px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition text-left w-full'

export default function FormDecisionTree() {
  const [currentId, setCurrentId] = useState(START_ID)
  const headingRef = useRef<HTMLParagraphElement>(null)
  const node = NODE_MAP[currentId]

  useEffect(() => {
    headingRef.current?.focus()
  }, [currentId])

  const reset = () => setCurrentId(START_ID)

  if (!node) return null

  return (
    <div className="bg-white border border-border p-8 rounded-2xl shadow-subtle h-full">
      <h2 className="text-xl font-bold text-navy mb-6">Which form do I need?</h2>

      <div className="min-h-[160px]" aria-live="polite">
        {node.type === 'question' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p
              tabIndex={-1}
              ref={headingRef}
              className="text-lg font-medium text-navy focus:outline-none"
            >
              {node.text}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setCurrentId(node.yes)}
                className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setCurrentId(node.no)}
                className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition"
              >
                No
              </button>
            </div>
          </div>
        )}

        {node.type === 'choice' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p
              tabIndex={-1}
              ref={headingRef}
              className="text-lg font-medium text-navy focus:outline-none"
            >
              {node.text}
            </p>
            <div className="flex flex-col gap-3 max-w-2xl">
              {node.options.map((opt) => (
                <button
                  key={opt.next}
                  type="button"
                  onClick={() => setCurrentId(opt.next)}
                  className={choiceBtnClass}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {node.type === 'result' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 bg-green-50/50 p-6 rounded-xl border border-green-100">
            <p
              tabIndex={-1}
              ref={headingRef}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-700 focus:outline-none"
            >
              Recommended Form
            </p>
            <p className="text-3xl font-extrabold text-navy">{node.form}</p>
            <p className="text-sm font-medium text-text-secondary">{node.description}</p>
            {node.linkKind === 'internal' ? (
              <Link
                href={node.href}
                className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm"
              >
                {node.ctaLabel}
              </Link>
            ) : (
              <ExternalLink
                href={node.href}
                className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm"
                aria-label={node.externalAriaLabel}
              >
                {node.ctaLabel}
              </ExternalLink>
            )}
            <div>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-bold text-primary hover:underline mt-2"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
