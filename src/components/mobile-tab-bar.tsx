'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { name: 'Guide', href: '/', icon: '📋' },
  { name: 'Timeline', href: '/timeline', icon: '📅' },
  { name: 'Learn', href: '/learn', icon: '📚' },
  { name: 'Glossary', href: '/?glossary=true', icon: '📖' },
  { name: 'Help', href: 'tel:1950', icon: '📞' },
]

export default function MobileTabBar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="tabbar md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`tab ${isActive(tab.href) ? 'active' : ''}`}
          aria-current={isActive(tab.href) ? 'page' : undefined}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.name}</span>
        </Link>
      ))}
    </nav>
  )
}
