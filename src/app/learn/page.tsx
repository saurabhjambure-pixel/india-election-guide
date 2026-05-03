import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = false

export const metadata: Metadata = {
  title: 'Learn the Process · India Election Guide',
  description:
    'Essential information about your rights and the procedural steps to voting in India.',
  openGraph: {
    title: 'Learn the Process · India Election Guide',
    description:
      'Essential information about your rights and the procedural steps to voting in India.',
    url: 'https://india-election-guide.vercel.app/learn',
    siteName: 'India Election Guide',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
}
import FormDecisionTree from '@/components/form-decision-tree'
import VoterGlossary from '@/components/voter-glossary'
import FormsDocumentation from '@/components/forms-documentation'

const FAQ_CATEGORIES = [
  {
    category: 'Registration',
    faqs: [
      {
        q: 'Who is eligible to vote in India?',
        a: 'Any Indian citizen who is 18 years or older on any of the four qualifying dates (January 1, April 1, July 1, or October 1) of the year of revision, and is an ordinary resident of the polling area. NRIs can register as overseas electors using Form 6A.',
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
        q: 'Can I vote without my EPIC?',
        a: 'Yes. Your EPIC (Voter ID) is not the only valid identity document at the polling booth. Any of the 12 approved photo-identity documents (Aadhaar, PAN card, passport, driving licence, etc.) are accepted. However, your name must be on the electoral roll at that booth — documents alone are not sufficient without prior registration.',
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
        a: "First speak to the Presiding Officer at the booth. If unresolved, call the national Voter Helpline at 1950 or use the cVIGIL app to report the issue with a photo or video. You can also report to your district's Returning Officer.",
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
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tighter leading-tight">
                Learn the Process
              </h1>
              <p className="text-text-secondary text-lg max-w-xl font-medium leading-relaxed">
                Essential information about your rights and the procedural steps
                to voting in India.
              </p>
              <div className="mt-8">
                <a
                  href="#glossary"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-bold rounded-full text-sm hover:bg-accent/20 transition-all border border-accent/20"
                >
                  Jump to Glossary ↓
                </a>
              </div>
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

        <FormsDocumentation />

        <section id="documents" className="my-20">
          <h2 className="text-3xl font-bold mb-12">Required Documents</h2>

          {/* Form-by-Form Comparison Table */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-6">
              Document Requirements by Form
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    className="border-b-2"
                    style={{ borderColor: 'var(--accent)' }}
                  >
                    <th
                      className="text-left py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Form
                    </th>
                    <th
                      className="text-left py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Purpose
                    </th>
                    <th
                      className="text-left py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Required Proof
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{ borderColor: 'var(--line)' }}
                    className="border-b"
                  >
                    <td
                      className="py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Form 6
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      New Registration
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      Age + Address + Identity (3 documents)
                    </td>
                  </tr>
                  <tr
                    style={{ borderColor: 'var(--line)' }}
                    className="border-b"
                  >
                    <td
                      className="py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Form 8A
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      Correction of Details
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      Identity + Address (2 documents)
                    </td>
                  </tr>
                  <tr
                    style={{ borderColor: 'var(--line)' }}
                    className="border-b"
                  >
                    <td
                      className="py-3 px-4 font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Form 8
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      Updates & Shifting
                    </td>
                    <td className="py-3 px-4" style={{ color: 'var(--ink-2)' }}>
                      Age + Address + Identity (varies by update type)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Categories - Card Layout */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-6">
              Accepted Documents by Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Age Proof Card */}
              <div
                className="border-l-4 p-6 rounded-lg"
                style={{ borderColor: '#a855f7', backgroundColor: '#faf5ff' }}
              >
                <h4
                  className="font-bold text-lg mb-3"
                  style={{ color: '#6b21a8' }}
                >
                  Proof of Age
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>✓ Birth Certificate</li>
                  <li>✓ School/College Certificate (Class 10 mark sheet)</li>
                  <li>✓ Passport</li>
                  <li>✓ Aadhaar Card</li>
                  <li>✓ Driving License</li>
                  <li>✓ PAN Card</li>
                </ul>
              </div>

              {/* Address Proof Card */}
              <div
                className="border-l-4 p-6 rounded-lg"
                style={{
                  borderColor: 'var(--accent)',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                }}
              >
                <h4
                  className="font-bold text-lg mb-3"
                  style={{ color: '#1e40af' }}
                >
                  Proof of Address
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    ✓ Utility Bill (Electricity, Water, Gas — within 3 months)
                  </li>
                  <li>✓ Rental Agreement</li>
                  <li>✓ Aadhaar Card</li>
                  <li>✓ Passport</li>
                  <li>✓ Bank Account Statement</li>
                  <li>✓ Property Tax Receipt</li>
                </ul>
              </div>

              {/* Photo ID Card */}
              <div
                className="border-l-4 p-6 rounded-lg"
                style={{ borderColor: '#22c55e', backgroundColor: '#f0fdf4' }}
              >
                <h4
                  className="font-bold text-lg mb-3"
                  style={{ color: '#15803d' }}
                >
                  Photo ID Documents
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>✓ Passport</li>
                  <li>✓ Aadhaar Card</li>
                  <li>✓ Driving License</li>
                  <li>✓ State ID Card</li>
                  <li>✓ PAN Card</li>
                  <li>✓ MGNREGA Job Card</li>
                </ul>
              </div>

              {/* Supporting Documents Card */}
              <div
                className="border-l-4 p-6 rounded-lg"
                style={{ borderColor: '#6b7280', backgroundColor: '#f9fafb' }}
              >
                <h4
                  className="font-bold text-lg mb-3"
                  style={{ color: '#374151' }}
                >
                  Supporting Documents
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>✓ Marriage Certificate (for name changes)</li>
                  <li>✓ Court Order (for legal corrections)</li>
                  <li>✓ Affidavit (if original unavailable)</li>
                  <li>✓ Registered Deed (for address changes)</li>
                  <li>✓ Government Service ID</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div
            className="p-6 rounded-lg border-l-4"
            style={{ borderColor: '#eab308', backgroundColor: '#fefce8' }}
          >
            <p className="text-sm" style={{ color: '#713f12' }}>
              <strong>Note:</strong> Original documents or certified copies must
              be produced at the time of voter registration. Document
              requirements vary slightly by state. For exact requirements and
              state-specific acceptance, refer to the specific form and your
              state&apos;s ECI guidelines.
            </p>
          </div>
        </section>

        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20"
          aria-label="Interactive guides"
        >
          <div>
            <FormDecisionTree />
          </div>
          <div id="glossary" className="scroll-mt-24">
            <VoterGlossary />
          </div>
        </section>

        {/* FAQ — 15 questions in 3 categories using native <details> accordion */}
        <section aria-labelledby="faq-heading">
          <header className="p-8 bg-gray-50/50 border border-border rounded-t-[var(--r-lg)] border-b-0">
            <h2 className="text-xl font-bold" id="faq-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-light mt-1">
              {FAQ_CATEGORIES.reduce((n, c) => n + c.faqs.length, 0)} questions
              across {FAQ_CATEGORIES.length} categories
            </p>
          </header>

          <div className="border border-border rounded-b-[var(--r-lg)] overflow-hidden">
            {FAQ_CATEGORIES.map((cat, ci) => (
              <div key={cat.category}>
                <div className="px-8 py-4 bg-gray-50 border-b border-border">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-light">
                    {cat.category}
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {cat.faqs.map((faq, fi) => (
                    <details key={fi} className="group bg-white">
                      <summary className="flex items-center justify-between gap-4 p-8 cursor-pointer list-none hover:bg-gray-50/50 transition-colors">
                        <span className="font-bold text-ink text-base">
                          {faq.q}
                        </span>
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
                {ci < FAQ_CATEGORIES.length - 1 && (
                  <div className="border-b border-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 text-center">
          <p className="text-sm text-text-secondary mb-6 font-bold uppercase tracking-widest opacity-60">
            Still have questions?
          </p>
          <a
            href="tel:1950"
            className="inline-flex items-center gap-3 px-10 py-4 bg-ink text-paper font-bold rounded-2xl hover:bg-ink-2 transition-all shadow-xl active:scale-95"
            aria-label="Call Voter Helpline 1950"
          >
            <span aria-hidden="true">📞</span> Call Voter Helpline 1950
          </a>
        </div>
      </div>
    </div>
  )
}
