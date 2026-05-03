'use client'

import clsx from 'clsx'
import {
  BookMarked,
  BookOpen,
  Calendar,
  ClipboardList,
  Phone,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type TabItem = {
  name: string
  href: string
  Icon: LucideIcon
  isActive: (pathname: string, searchParams: URLSearchParams) => boolean
}

const TABS: TabItem[] = [
  {
    name: 'Guide',
    href: '/',
    Icon: ClipboardList,
    isActive: (pathname, searchParams) =>
      pathname === '/' && searchParams.get('glossary') !== 'true',
  },
  {
    name: 'Timeline',
    href: '/timeline',
    Icon: Calendar,
    isActive: (pathname) =>
      pathname === '/timeline' || pathname.startsWith('/timeline/'),
  },
  {
    name: 'Learn',
    href: '/learn',
    Icon: BookOpen,
    isActive: (pathname) => pathname.startsWith('/learn') && !pathname.includes('#glossary'),
  },
  {
    name: 'Glossary',
    href: '/learn#glossary',
    Icon: BookMarked,
    isActive: (pathname, _searchParams) =>
      pathname === '/learn' && (typeof window !== 'undefined' ? window.location.hash === '#glossary' : false),
  },
  {
    name: 'Help',
    href: 'tel:1950',
    Icon: Phone,
    isActive: () => false,
  },
]

function MobileTabBarInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <nav
      className="tabbar md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {TABS.map((tab) => {
        const active = tab.isActive(pathname, searchParams)
        const { Icon } = tab

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={clsx(
              'flex flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 rounded-md text-[10.5px] font-medium transition-colors duration-200 border-t-2',
              active
                ? 'text-blue-600 bg-blue-50 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-600',
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={2} aria-hidden />
            <span>{tab.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function MobileTabBar() {
  return (
    <Suspense
      fallback={
        <nav
          className="tabbar md:hidden min-h-[78px]"
          aria-hidden="true"
        />
      }
    >
      <MobileTabBarInner />
    </Suspense>
  )
}
