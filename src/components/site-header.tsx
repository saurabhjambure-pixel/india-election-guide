'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { name: 'Guide', href: '/' },
  { name: 'Timelines', href: '/timeline' },
  { name: 'Learn', href: '/learn' },
]

export default function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header hidden md:flex" role="banner">
      <div className="container-app w-full flex items-center justify-between" style={{ maxWidth: 1200, padding: '0 40px' }}>
        {/* Logo + Nav together on the left */}
        <div className="flex items-center gap-10">
          <Link href="/" className="site-header__logo" aria-label="India Election Guide - home">
            India Election Guide
          </Link>

          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-semibold transition-colors"
                  style={{ color: active ? 'var(--ink)' : 'var(--ink-3)' }}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side: CTA + user icon */}
        <div className="flex items-center gap-3">
          <Link
            href="https://eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            aria-label="Official ECI Sources (opens in a new tab)"
          >
            Official ECI Sources
          </Link>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', color: 'var(--ink-3)' }}
            aria-label="Account"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
