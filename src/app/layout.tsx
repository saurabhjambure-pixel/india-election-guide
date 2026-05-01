import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import MobileTabBar from '@/components/mobile-tab-bar'

export const metadata: Metadata = {
  title: 'India Election Guide — Your official voter guidance assistant',
  description:
    'Step-by-step guidance on voter registration, enrollment checks, address updates, polling information, and election timelines — all grounded in official Election Commission of India sources.',
  keywords: [
    'India election',
    'voter registration',
    'EPIC',
    'ECI',
    'Election Commission of India',
    'polling station',
    'enrollment check',
  ],
  openGraph: {
    title: 'India Election Guide',
    description: 'Official-source-first civic guidance for Indian voters.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FAFAFA" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none flex-grow">
          {children}
        </main>
        <SiteFooter />
        <MobileTabBar />
      </body>
    </html>
  )
}
