'use client'

import { useState } from 'react'

const GLOSSARY = [
  // Forms
  { term: 'Form 6',       def: 'Application for new voter registration for Indian citizens residing in India.' },
  { term: 'Form 6A',      def: 'Application for overseas electors (NRIs) living abroad who wish to register to vote in their home constituency.' },
  { term: 'Form 7',       def: 'Application for objection to inclusion or for deletion of a name from the electoral roll.' },
  { term: 'Form 8',       def: 'Application for correction of entries, shifting of residence, replacement of EPIC, or marking as PwD in the electoral roll.' },
  // Identity & Cards
  { term: 'EPIC',         def: 'Electors Photo Identity Card — your official photo identity card issued by the Election Commission of India. Also called Voter ID.' },
  { term: 'e-EPIC',       def: 'Digital version of your Voter ID (EPIC) that can be downloaded as a PDF from voters.eci.gov.in. Accepted at polling booths.' },
  // Officials
  { term: 'BLO',          def: 'Booth Level Officer — a local government official who maintains the electoral roll for your polling booth and assists with registrations.' },
  { term: 'ERO',          def: 'Electoral Registration Officer — the official responsible for preparing and maintaining the electoral roll for a constituency.' },
  { term: 'DEO',          def: 'District Election Officer — the senior official responsible for supervising elections across a district.' },
  { term: 'Returning Officer', def: 'The officer responsible for conducting elections in a constituency, including receiving nominations and counting votes.' },
  { term: 'Polling Agent', def: 'A representative appointed by a candidate to observe the polling process at a polling booth on election day.' },
  { term: 'Presiding Officer', def: 'The government official in charge of a polling booth on election day, responsible for conducting polling in an orderly manner.' },
  // Electoral Roll
  { term: 'Electoral Roll', def: 'The official list of registered voters for a specific constituency. Sometimes informally called voter list or voter roll; "Electoral Roll" is the official ECI term.' },
  { term: 'Constituency',  def: 'A specific geographic area that elects one representative to a legislative body (Lok Sabha or State Assembly).' },
  { term: 'Qualifying Date', def: 'The date on which you must be 18+ to be eligible to register. There are now four qualifying dates a year: January 1, April 1, July 1, and October 1 (previously only January 1).' },
  { term: 'Summary Revision', def: 'The annual process of updating the electoral roll — adding new voters, removing deceased entries, and correcting errors. Usually done before major elections.' },
  { term: 'Special Summary Revision', def: 'An additional round of roll revision ordered by ECI, often held before a major election announcement.' },
  { term: 'Overseas Elector', def: 'An Indian citizen living abroad who is registered to vote in their home constituency in India using Form 6A.' },
  // Portals & Bodies
  { term: 'ECI',          def: 'Election Commission of India — the constitutional body responsible for overseeing and conducting elections in India.' },
  { term: 'NVSP',         def: 'National Voters\' Service Portal — the online platform (voters.eci.gov.in) for all voter service applications including registration, correction, and EPIC download.' },
  { term: 'SVEEP',        def: 'Systematic Voters\' Education and Electoral Participation — ECI\'s programme to increase voter awareness and participation.' },
  // Voting Technology
  { term: 'EVM',          def: 'Electronic Voting Machine — the tamper-proof standalone machine used for casting and counting votes in Indian elections.' },
  { term: 'VVPAT',        def: 'Voter Verifiable Paper Audit Trail — a printer attached to the EVM that prints a paper slip showing the symbol of the party/candidate voted for, visible to the voter for 7 seconds.' },
  // Incidents
  { term: 'Model Code of Conduct', def: 'A set of guidelines issued by ECI for political parties and candidates once election dates are announced, covering campaign conduct, use of government machinery, and polling day behaviour.' },
  { term: 'Booth Capture', def: 'An election offence where individuals forcibly seize control of a polling booth to stuff ballot boxes or prevent voters from voting. Punishable under the Representation of the People Act.' },
]

// Sort alphabetically for easy scanning
const SORTED_GLOSSARY = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))

export default function VoterGlossary() {
  const [search, setSearch] = useState('')

  const filtered = SORTED_GLOSSARY.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.def.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-6 bg-gray-50/50 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy">Voter Glossary</h2>
          <span className="text-[11px] font-bold text-text-light uppercase tracking-widest">
            {filtered.length} / {SORTED_GLOSSARY.length} terms
          </span>
        </div>
        <input
          type="search"
          placeholder="Search terms (e.g., EPIC, BLO, Form 6A)..."
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search glossary terms"
        />
      </div>
      <div className="divide-y divide-border overflow-y-auto" style={{ maxHeight: '420px' }}>
        {filtered.length > 0 ? filtered.map((item) => (
          <div key={item.term} className="p-6 hover:bg-gray-50/30 transition-colors">
            <p className="font-bold text-navy text-base mb-1">{item.term}</p>
            <p className="text-text-secondary text-sm leading-relaxed font-medium">{item.def}</p>
          </div>
        )) : (
          <div className="p-8 text-center text-text-secondary font-medium">
            No terms found matching &quot;{search}&quot;.
          </div>
        )}
      </div>
    </div>
  )
}
