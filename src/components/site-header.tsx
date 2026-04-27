'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Guide', href: '/' },
    { name: 'Timelines', href: '/timeline' },
    { name: 'Learn', href: '/learn' },
  ]

  return (
    <header className="site-header" role="banner">
      <div className="container-app w-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="site-header__logo" aria-label="India Election Guide - home">
            <span className="site-header__logo-dot" aria-hidden="true" />
            India Election Guide
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold tracking-wide transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-text-secondary hover:text-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-primary flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-white/50 transition-all active:scale-95"
            aria-label="Switch language (currently English)"
          >
            <span>🌐</span> EN
          </button>
          <span className="hidden sm:inline-block site-header__badge" aria-label="Official sources only">
            Official ECI Sources
          </span>
        </div>
      </div>
    </header>
  )
}
