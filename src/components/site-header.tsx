'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { name: 'Guide', href: '/' },
  { name: 'Timelines', href: '/timeline' },
  { name: 'Learn', href: '/learn' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Trap focus inside drawer when open
  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container-app w-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="site-header__logo" aria-label="India Election Guide - home">
              <span className="site-header__logo-dot" aria-hidden="true" />
              India Election Guide
            </Link>

            {/* Desktop navigation — hidden on mobile */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-bold tracking-wide transition-colors ${
                    pathname === link.href ? 'text-primary' : 'text-text-secondary hover:text-navy'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Official ECI badge — desktop only */}
            <span className="hidden sm:inline-block site-header__badge" aria-label="Official sources only">
              Official ECI Sources
            </span>

            {/* Mobile hamburger button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg border border-border bg-white/50 gap-[5px] transition-all"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <span className={`w-5 h-0.5 bg-navy transition-transform origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`w-5 h-0.5 bg-navy transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-navy transition-transform origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-down navigation drawer */}
      <div
        id="mobile-nav"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-x-0 top-20 z-40 bg-white border-b border-border shadow-lg transition-all duration-200 ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="container-app py-6 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-xl text-[15px] font-bold transition-colors ${
                pathname === link.href
                  ? 'text-primary bg-blue-50'
                  : 'text-text-secondary hover:text-navy hover:bg-gray-50'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Helpline in mobile nav */}
          <div className="mt-4 pt-4 border-t border-border px-4">
            <p className="text-[11px] font-bold text-text-light uppercase tracking-widest mb-1">Voter Helpline</p>
            <a
              href="tel:1950"
              className="text-primary font-bold text-lg hover:underline"
              aria-label="Call Voter Helpline 1950"
            >
              1950
            </a>
            <p className="text-xs text-text-light mt-1">Free, available in multiple languages</p>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay when menu is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/20"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
