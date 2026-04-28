'use client'

import { useState, useRef, useEffect } from 'react'

type Step = 'start' | 'q1' | 'q1_nri' | 'q2' | 'q3' | 'result_6' | 'result_6a' | 'result_7' | 'result_8' | 'result_unknown'

export default function FormDecisionTree() {
  const [step, setStep] = useState<Step>('q1')
  const headingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus()
    }
  }, [step])

  const reset = () => setStep('q1')

  return (
    <div className="bg-white border border-border p-8 rounded-2xl shadow-subtle h-full">
      <h3 className="text-xl font-bold text-navy mb-6">Which form do I need?</h3>
      
      <div className="min-h-[160px]" aria-live="polite">
        {step === 'q1' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p tabIndex={-1} ref={headingRef} className="text-lg font-medium text-navy focus:outline-none">1. Are you registering to vote for the first time?</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setStep('q1_nri')} className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm">Yes</button>
              <button onClick={() => setStep('q2')} className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition">No</button>
            </div>
          </div>
        )}

        {step === 'q1_nri' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p tabIndex={-1} ref={headingRef} className="text-lg font-medium text-navy focus:outline-none">2. Are you an NRI (Non-Resident Indian) living abroad?</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setStep('result_6a')} className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm">Yes</button>
              <button onClick={() => setStep('result_6')} className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition">No</button>
            </div>
          </div>
        )}

        {step === 'q2' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p tabIndex={-1} ref={headingRef} className="text-lg font-medium text-navy focus:outline-none">2. Do you want to delete or object to a name on the voter list?</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setStep('result_7')} className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm">Yes</button>
              <button onClick={() => setStep('q3')} className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition">No</button>
            </div>
          </div>
        )}

        {step === 'q3' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <p tabIndex={-1} ref={headingRef} className="text-lg font-medium text-navy focus:outline-none">3. Do you need to update details, shift residence, or request a replacement EPIC?</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setStep('result_8')} className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition shadow-sm">Yes</button>
              <button onClick={() => setStep('result_unknown')} className="px-6 py-3 bg-gray-100 text-navy rounded-xl font-bold hover:bg-gray-200 transition">No</button>
            </div>
          </div>
        )}

        {step.startsWith('result_') && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 bg-green-50/50 p-6 rounded-xl border border-green-100">
            <p tabIndex={-1} ref={headingRef} className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-700 focus:outline-none">Recommended Form</p>
            
            {step === 'result_6' && <div><p className="text-3xl font-extrabold text-navy">Form 6</p><p className="text-sm font-medium text-text-secondary mt-2">For general new voters applying for the first time.</p></div>}
            {step === 'result_6a' && <div><p className="text-3xl font-extrabold text-navy">Form 6A</p><p className="text-sm font-medium text-text-secondary mt-2">For overseas electors (NRIs) registering to vote.</p></div>}
            {step === 'result_7' && <div><p className="text-3xl font-extrabold text-navy">Form 7</p><p className="text-sm font-medium text-text-secondary mt-2">For objection to inclusion of name or deletion of name.</p></div>}
            {step === 'result_8' && <div><p className="text-3xl font-extrabold text-navy">Form 8</p><p className="text-sm font-medium text-text-secondary mt-2">For shifting of residence, correction of entries, or replacement EPIC.</p></div>}
            {step === 'result_unknown' && <div><p className="text-2xl font-extrabold text-navy">Unsure?</p><p className="text-sm font-medium text-text-secondary mt-2">Visit voters.eci.gov.in or call the Voter Helpline at 1950.</p></div>}
            
            <button onClick={reset} className="text-sm font-bold text-primary hover:underline mt-2">Start Over</button>
          </div>
        )}
      </div>
    </div>
  )
}
