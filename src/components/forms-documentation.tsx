'use client'

import { useState } from 'react'

const FORMS_DATA = [
  {
    id: '6',
    title: 'New Registration',
    desc: 'For first-time general voters residing in India.',
    docs: [
      'Age proof: birth certificate, school leaving cert, Aadhaar, passport',
      'Address proof: Aadhaar, utility bill (≤3 months), bank passbook, rent agreement',
      'Passport-size photograph',
    ],
  },
  {
    id: '6A',
    title: 'Overseas Voter',
    desc: 'For NRI citizens living abroad.',
    docs: [
      'Valid Indian Passport (front and back pages)',
      'Valid Visa / Resident Permit / Work Permit',
      'Passport-size photograph',
    ],
  },
  {
    id: '7',
    title: 'Deletion / Objection',
    desc: 'To object to inclusion or remove a name.',
    docs: [
      'EPIC number of the person whose name is to be deleted',
      'Death certificate (if reason is death)',
      'Proof of shifting (if reason is shifting)',
    ],
  },
  {
    id: '8',
    title: 'Updates & Shifting',
    desc: 'For corrections, address change, or replacement EPIC.',
    docs: [
      'EPIC number',
      'Proof of new address (for shifting)',
      'Relevant proof for correction (e.g., Aadhaar for name, birth cert for age)',
      'Passport-size photograph',
    ],
  },
]

export default function FormsDocumentation() {
  const [activeFormId, setActiveFormId] = useState('6')
  const activeForm =
    FORMS_DATA.find((f) => f.id === activeFormId) || FORMS_DATA[0]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
      <div className="space-y-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
          The Forms
        </h2>
        {FORMS_DATA.map((f) => {
          const isActive = activeFormId === f.id
          return (
            <button
              key={f.id}
              onClick={() => setActiveFormId(f.id)}
              style={
                isActive
                  ? { backgroundColor: 'var(--ink)', borderColor: 'var(--ink)' }
                  : {}
              }
              className={`w-full text-left p-6 rounded-2xl transition-all block ${
                isActive
                  ? 'text-white shadow-card scale-[1.02]'
                  : 'bg-white border-border shadow-subtle hover:shadow-card hover:scale-[1.01]'
              } border`}
            >
              <p
                className={`font-bold text-xs uppercase mb-1 ${isActive ? 'text-white/70' : 'text-primary'}`}
              >
                Form {f.id}
              </p>
              <p
                className={`text-lg font-bold mb-1 ${isActive ? 'text-white' : 'text-ink'}`}
              >
                {f.title}
              </p>
              <p
                className={`text-sm ${isActive ? 'text-white/80' : 'text-text-secondary'}`}
              >
                {f.desc}
              </p>
            </button>
          )
        })}
      </div>

      <div className="space-y-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
          Documentation Required
        </h2>
        <div
          style={{ backgroundColor: 'var(--ink)' }}
          className="rounded-3xl p-8 text-white h-full flex flex-col justify-center shadow-lg transition-all duration-300"
        >
          <div className="mb-8 fade-in" key={`title-${activeForm.id}`}>
            <span className="inline-block px-3 py-1 bg-accent rounded-full text-[10px] text-white font-bold tracking-widest uppercase mb-4">
              Form {activeForm.id}
            </span>
            <h3 className="text-2xl font-bold text-white">
              {activeForm.title}
            </h3>
          </div>
          <ul className="space-y-6" key={`docs-${activeForm.id}`}>
            {activeForm.docs.map((doc, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 text-sm font-medium text-white fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span
                  className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
