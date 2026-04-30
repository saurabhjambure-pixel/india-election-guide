import type { DocumentItem } from '@/lib/types/civic'

const CATEGORY_LABELS: Record<DocumentItem['category'], { label: string; color: string }> = {
  age:      { label: 'Age Proof',     color: 'bg-purple-50 text-purple-700 border-purple-100' },
  address:  { label: 'Address Proof', color: 'bg-blue-50 text-primary border-blue-100' },
  identity: { label: 'Identity',      color: 'bg-green-50 text-green-700 border-green-100' },
  other:    { label: 'Supporting',    color: 'bg-gray-100 text-gray-700 border-gray-200' },
}

interface Props {
  documents: DocumentItem[]
}

export default function DocumentGuide({ documents }: Props) {
  if (documents.length === 0) return null

  return (
    <details className="group mt-8">
      <summary className="flex items-center justify-between cursor-pointer list-none select-none p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100/50 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-lg" aria-hidden="true">📄</span>
          <span className="font-bold text-navy text-sm">Document Guide</span>
          <span className="text-[11px] text-text-light font-medium">
            — which documents satisfy which requirements
          </span>
        </div>
        <span
          className="text-text-light text-sm font-bold transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>

      <div className="mt-3 space-y-4 border border-gray-100 rounded-2xl p-6 bg-white">
        {documents.map((doc) => {
          const style = CATEGORY_LABELS[doc.category]
          return (
            <div key={doc.name} className="space-y-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${style.color}`}
                >
                  {style.label}
                </span>
                <span className="font-bold text-navy text-sm">{doc.name}</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{doc.note}</p>
              {doc.examples && doc.examples.length > 0 && (
                <ul className="space-y-1 mt-1">
                  {doc.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2 text-sm text-text-body">
                      <span className="w-1 h-1 rounded-full bg-text-light mt-2 shrink-0" aria-hidden="true" />
                      {ex}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}

        <p className="text-xs text-text-light pt-2 border-t border-gray-100 mt-4">
          Accepted documents are subject to ECI guidelines. When in doubt, call Voter Helpline{' '}
          <a href="tel:1950" className="font-bold text-primary hover:underline" aria-label="Call Voter Helpline 1950">
            1950
          </a>.
        </p>
      </div>
    </details>
  )
}
