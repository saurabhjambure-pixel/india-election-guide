import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Learn the Process · India Election Guide',
  description: 'Essential information about your rights and the procedural steps to voting in India.',
  openGraph: {
    title: 'Learn the Process · India Election Guide',
    description: 'Essential information about your rights and the procedural steps to voting in India.',
    url: 'https://india-election-guide.vercel.app/learn',
    siteName: 'India Election Guide',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}
import FormDecisionTree from '@/components/form-decision-tree'
import VoterGlossary from '@/components/voter-glossary'

const FAQ_CATEGORIES = [
  {
    category: 'Registration',
    faqs: [
      {
        q: 'Who is eligible to vote in India?',
        a: 'Any Indian citizen who is 18 years or older on January 1 of the year of the electoral roll revision, and is an ordinary resident of the polling area. NRIs can register as overseas electors using Form 6A.',
      },
      {
        q: 'Can I register online?',
        a: 'Yes. Visit voters.eci.gov.in or use the Voter Helpline App to fill Form 6 online. You can also download and submit Form 6 offline to your Booth Level Officer (BLO).',
      },
      {
        q: 'How long does Form 6 take to process?',
        a: 'Typically 30–45 days after submission, subject to the annual Summary Revision period. Your application may be accepted, queried for more documents, or rejected. You can track status on the portal using your reference number.',
      },
      {
        q: 'What if I moved to a different city?',
        a: 'Use Form 8 to shift your residence — do not apply for a fresh Form 6 registration if you already have an EPIC number. Filing a fresh Form 6 when you already have an EPIC can result in duplicate registration, which is an electoral offence.',
      },
      {
        q: 'What happens if I am registered in two places?',
        a: 'Duplicate registration is not permitted. If detected, one entry will be deleted. If you have moved, use Form 8 to shift to the new address, which automatically removes your old entry. You can check your current registration on electoralsearch.eci.gov.in.',
      },
      {
        q: 'How do I check if my Form 6 was accepted?',
        a: 'Log in to voters.eci.gov.in and enter your Application Reference Number to check the status. You will also receive an SMS if you provided your mobile number. Once accepted, your name will appear on the electoral roll at electoralsearch.eci.gov.in.',
      },
    ],
  },
  {
    category: 'Documents',
    faqs: [
      {
        q: 'What documents prove age for 18–19 year olds?',
        a: 'Accepted age proofs include: Aadhaar card (if it shows date of birth), birth certificate, school leaving certificate (Class 10 mark sheet), passport, or PAN card. Your school leaving certificate is often the easiest to use if Aadhaar is not available.',
      },
      {
        q: 'What if I do not have Aadhaar?',
        a: 'Aadhaar is not mandatory for voter registration. You can use any valid age proof (birth certificate, passport, PAN card, school leaving certificate) and address proof (utility bill, bank passbook with address, rent agreement, or passport). The ECI accepts a wide range of official documents.',
      },
      {
        q: 'What if my Aadhaar address does not match where I live?',
        a: 'Use an alternative address proof such as a utility bill (electricity, water, or gas — within the last 3 months), a bank account statement, or a rent agreement with your current address. You do not need to update your Aadhaar first.',
      },
      {
        q: 'Which documents are accepted at the polling booth on election day?',
        a: 'Any one of these photo-identity documents is accepted: EPIC (Voter ID), Aadhaar card, PAN card, passport, driving licence, MGNREGA job card, bank/post office passbook with photo, pension documents with photo, or central/state government service identity cards with photo.',
      },
    ],
  },
  {
    category: 'Voting Day',
    faqs: [
      {
        q: 'Can I vote without my EPIC card?',
        a: 'Yes. Your EPIC (Voter ID) is not the only valid identity document at the polling booth. Any of the 11 approved photo-identity documents (Aadhaar, PAN card, passport, driving licence, etc.) are accepted. However, your name must be on the electoral roll at that booth — documents alone are not sufficient without prior registration.',
      },
      {
        q: 'What are the polling booth timings?',
        a: 'Generally 7:00 AM to 6:00 PM, though exact timings vary by constituency and election phase. The ECI publishes phase-wise schedules on eci.gov.in. Voters in the queue before closing time are entitled to vote.',
      },
      {
        q: 'How do I find my polling station?',
        a: 'Visit electoralsearch.eci.gov.in/pollingstation and enter your EPIC number. The portal shows your exact booth name, address, and the area it covers. You can also download a print-out of your voter details showing the polling station.',
      },
      {
        q: 'What is the Model Code of Conduct and how does it affect me?',
        a: 'The Model Code of Conduct (MCC) is a set of guidelines issued by ECI once election dates are announced. For voters, it means political parties cannot use government resources for campaigning, bribery is strictly prohibited, and you have the right to vote free from intimidation. Violations can be reported to the returning officer or on the cVIGIL app.',
      },
      {
        q: 'What should I do if I face a problem at the polling booth?',
        a: 'First speak to the Presiding Officer at the booth. If unresolved, call the national Voter Helpline at 1950 or use the cVIGIL app to report the issue with a photo or video. You can also report to your district\'s Returning Officer.',
      },
    ],
  },
]

export default function LearnPage() {
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
                width={260}
                height={260}
                sizes="(max-width: 768px) 100vw, 260px"
                className="w-full max-w-[240px] h-auto object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">The Forms</h2>
            {[
              { id: '6',  title: 'New Registration',  desc: 'For first-time general voters residing in India.' },
              { id: '6A', title: 'Overseas Voter',     desc: 'For NRI citizens living abroad.' },
              { id: '7',  title: 'Deletion / Objection', desc: 'To object to inclusion or remove a name.' },
              { id: '8',  title: 'Updates & Shifting', desc: 'For corrections, address change, or replacement EPIC.' },
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
                  'Age proof: birth certificate, school leaving cert, Aadhaar, passport',
                  'Address proof: Aadhaar, utility bill (≤3 months), bank passbook, rent agreement',
                  'Passport-size photograph',
                  'EPIC number (for corrections and address changes only)',
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-4 text-sm font-medium">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5" aria-hidden="true">✓</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20" aria-label="Interactive guides">
          <div>
            <FormDecisionTree />
          </div>
          <div>
            <VoterGlossary />
          </div>
        </section>

        {/* FAQ — 15 questions in 3 categories using native <details> accordion */}
        <section aria-labelledby="faq-heading">
          <header className="p-8 bg-gray-50/50 border border-border rounded-t-[var(--radius-lg)] border-b-0">
            <h2 className="text-xl font-bold" id="faq-heading">Frequently Asked Questions</h2>
            <p className="text-sm text-text-light mt-1">{FAQ_CATEGORIES.reduce((n, c) => n + c.faqs.length, 0)} questions across {FAQ_CATEGORIES.length} categories</p>
          </header>

          <div className="border border-border rounded-b-[var(--radius-lg)] overflow-hidden">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div key={cat.category}>
                <div className="px-8 py-4 bg-gray-50 border-b border-border">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-light">{cat.category}</h3>
                </div>
                <div className="divide-y divide-border">
                  {cat.faqs.map((faq, fi) => (
                    <details
                      key={fi}
                      className="group bg-white"
                    >
                      <summary className="flex items-center justify-between gap-4 p-8 cursor-pointer list-none hover:bg-gray-50/50 transition-colors">
                        <span className="font-bold text-navy text-base">{faq.q}</span>
                        <span
                          className="shrink-0 w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-text-light text-xs transition-transform group-open:rotate-45"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-8 pb-8 text-text-secondary leading-relaxed font-medium text-[15px]">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
                {ci < FAQ_CATEGORIES.length - 1 && <div className="border-b border-border" />}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 text-center">
          <p className="text-sm text-text-secondary mb-6 font-bold uppercase tracking-widest opacity-60">Still have questions?</p>
          <a
            href="tel:1950"
            className="inline-flex items-center gap-3 px-10 py-4 bg-navy text-white font-bold rounded-2xl hover:bg-navy/90 transition-all shadow-xl active:scale-95"
            aria-label="Call Voter Helpline 1950"
          >
            <span aria-hidden="true">📞</span> Call Voter Helpline 1950
          </a>
        </div>
      </div>
    </div>
  )
}
