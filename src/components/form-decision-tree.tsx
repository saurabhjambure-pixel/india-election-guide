'use client'

import { useState, useRef, useEffect } from 'react'
import ExternalLink from './external-link'

// ---------------------------------------------------------------------------
// Tree data structure — adding a new branch is a data change, not a code change.
// Each node is either a Question (yes/no branches) or a Result (leaf node).
// ---------------------------------------------------------------------------
type QuestionNode = {
  type: 'question'
  id: string
  text: string
  yes: string   // id of next node on "Yes"
  no: string    // id of next node on "No"
}

type ResultNode = {
  type: 'result'
  id: string
  form: string
  description: string
  href?: string
}

type TreeNode = QuestionNode | ResultNode

const TREE: TreeNode[] = [
  {
    type: 'question',
    id: 'q_first_time',
    text: 'Are you registering to vote for the first time?',
    yes: 'q_nri',
    no: 'q_delete',
  },
  {
    type: 'question',
    id: 'q_nri',
    text: 'Are you an NRI (Non-Resident Indian) living abroad?',
    yes: 'result_6a',
    no: 'result_6',
  },
  {
    type: 'question',
    id: 'q_delete',
    text: 'Do you want to delete or object to a name on the voter list?',
    yes: 'result_7',
    no: 'q_update',
  },
  {
    type: 'question',
    id: 'q_update',
    text: 'Do you need to update details, shift residence, or get a replacement EPIC?',
    yes: 'result_8',
    no: 'result_unknown',
  },
  {
    type: 'result',
    id: 'result_6',
    form: 'Form 6',
    description: 'For general new voters applying for the first time.',
    href: 'https://voters.eci.gov.in/',
  },
  {
    type: 'result',
    id: 'result_6a',
    form: 'Form 6A',
    description: 'For overseas electors (NRIs) registering to vote from abroad.',
    href: 'https://voters.eci.gov.in/',
  },
  {
    type: 'result',
    id: 'result_7',
    form: 'Form 7',
    description: 'For objection to inclusion of a name or deletion of a name from the electoral roll.',
    href: 'https://voters.eci.gov.in/',
  },
  {
    type: 'result',
    id: 'result_8',
    form: 'Form 8',
    description: 'For shifting of residence, correction of entries, or replacement EPIC card.',
    href: 'https://voters.eci.gov.in/',
  },
  {
    type: 'result',
    id: 'result_unknown',
    form: 'Not sure?',
    description: 'Visit voters.eci.gov.in or call the Voter Helpline at 1950 for personalised guidance.',
  },
]

const NODE_MAP = Object.fromEntries(TREE.map((n) => [n.id, n]))
const START_ID = 'q_first_time'

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
                onClick={() => setCurrentId(node.yes)}
                className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm"
              >
                Yes
              </button>
              <button
                onClick={() => setCurrentId(node.no)}
                className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition"
              >
                No
              </button>
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
            {node.href && (
              <ExternalLink
                href={node.href}
                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                aria-label={`Apply ${node.form} on Voters' Service Portal (opens in a new tab)`}
              >
                Apply on Voters&apos; Service Portal ↗
              </ExternalLink>
            )}
            <div>
              <button onClick={reset} className="text-sm font-bold text-primary hover:underline mt-2">
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
