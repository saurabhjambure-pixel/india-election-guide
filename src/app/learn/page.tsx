import Image from 'next/image'

export default function LearnPage() {
  const faqs = [
    {
      q: 'Who is eligible to vote in India?',
      a: 'Any Indian citizen who is 18 years or older on the qualifying date (Jan 1, April 1, July 1, or Oct 1) and is an ordinary resident of the constituency.',
    },
    {
      q: 'Can I register online?',
      a: 'Yes, through the Voters\' Service Portal (voters.eci.gov.in) or the Voter Helpline App.',
    },
    {
      q: 'What if I moved to a different city?',
      a: 'Use Form 8 to shift your residence. Do not apply for a fresh registration if you already have an EPIC number.',
    },
  ]

  return (
    <div className="py-16">
      <div className="container-app">
        <header className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter leading-tight">Learn the Process</h1>
              <p className="text-text-secondary text-lg max-w-xl font-medium leading-relaxed">
                Essential information about your rights and the procedural steps to voting in India.
              </p>
            </div>
            <div className="flex justify-center md:justify-end opacity-90 drop-shadow-sm pointer-events-none">
              <Image 
                src="/images/forms.png" 
                alt="Illustration of official civic forms" 
                width={300} 
                height={300}
                className="w-full max-w-[280px] h-auto object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">The Forms</h2>
            {[
              { id: '6', title: 'New Registration', desc: 'For first-time general voters.' },
              { id: '6A', title: 'Overseas Voter', desc: 'For NRI citizens living abroad.' },
              { id: '8', title: 'Updates & Shifting', desc: 'For corrections or change of address.' },
            ].map((f) => (
              <div key={f.id} className="bg-white border border-border p-6 rounded-2xl shadow-subtle hover:shadow-card transition-all">
                <p className="font-bold text-primary text-xs uppercase mb-1">Form {f.id}</p>
                <p className="text-lg font-bold text-navy mb-1">{f.title}</p>
                <p className="text-sm text-text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Documentation</h2>
            <div className="bg-navy rounded-3xl p-8 text-white h-full flex flex-col justify-center shadow-lg">
              <ul className="space-y-6">
                {[
                  'Proof of Age (10th Cert, Birth Cert)',
                  'Proof of Residence (Aadhaar, Bill)',
                  'Passport size Photograph',
                  'Voter ID (for corrections only)',
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-4 text-sm font-medium">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] shrink-0" aria-hidden="true">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
          <div className="p-8 bg-gray-50/50 border-b border-border">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 hover:bg-gray-50/30 transition-colors">
                <p className="font-bold text-navy text-lg mb-3">{faq.q}</p>
                <p className="text-text-secondary leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 text-center">
          <p className="text-sm text-text-secondary mb-6 font-bold uppercase tracking-widest opacity-60">Still have questions?</p>
          <a
            href="tel:1950"
            className="inline-flex items-center gap-3 px-10 py-4 bg-navy text-white font-bold rounded-2xl hover:bg-navy/90 transition-all shadow-xl active:scale-95"
          >
            <span>📞</span> Call Voter Helpline 1950
          </a>
        </div>
      </div>
    </div>
  )
}
