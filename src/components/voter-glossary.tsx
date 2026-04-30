'use client'

import { useState } from 'react'

const GLOSSARY = [
  { term: 'EPIC', def: 'Electors Photo Identity Card. Your official Voter ID card issued by the Election Commission of India.' },
  { term: 'BLO', def: 'Booth Level Officer. A local government official responsible for maintaining the electoral roll for your polling booth.' },
  { term: 'ERO', def: 'Electoral Registration Officer. The official responsible for the preparation of electoral rolls for a constituency.' },
  { term: 'Qualifying Date', def: 'The date on which you must be 18 years old to be eligible to register. There are four qualifying dates: Jan 1, April 1, July 1, and Oct 1.' },
  { term: 'Electoral Roll', def: 'The official list of registered voters for a specific constituency or polling booth. Also known as the voter list.' },
  { term: 'Constituency', def: 'A specific geographic area that elects one representative to a legislative body.' },
  { term: 'Form 6', def: 'The application form used to register as a new voter for the first time.' },
  { term: 'Form 8', def: 'The application form used for making corrections to your details, shifting residence, or requesting a replacement EPIC.' }
]

export default function VoterGlossary() {
  const [search, setSearch] = useState('')
  
  const filtered = GLOSSARY.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.def.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-6 bg-gray-50/50 border-b border-border">
        <h2 className="text-xl font-bold mb-4 text-navy">Voter Glossary</h2>
        <input 
          type="search" 
          placeholder="Search terms (e.g., EPIC, Form 6)..." 
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="divide-y divide-border overflow-y-auto" style={{ maxHeight: '400px' }}>
        {filtered.length > 0 ? filtered.map((item, i) => (
          <div key={i} className="p-6 hover:bg-gray-50/30 transition-colors">
            <p className="font-bold text-navy text-lg mb-2">{item.term}</p>
            <p className="text-text-secondary text-sm leading-relaxed font-medium">{item.def}</p>
          </div>
        )) : (
          <div className="p-8 text-center text-text-secondary font-medium">No terms found matching "{search}".</div>
        )}
      </div>
    </div>
  )
}
