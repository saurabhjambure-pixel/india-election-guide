import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import MobileTabBar from '@/components/mobile-tab-bar'

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'India Election Guide — Your official voter guidance assistant',
  description:
    'Step-by-step guidance on voter registration, enrollment checks, address updates, polling information, and election timelines — all grounded in official Election Commission of India sources.',
  metadataBase: new URL('https://india-election-guide.vercel.app'),
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
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} flex flex-col min-h-screen`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="outline-none flex-grow"
        >
          {children}
        </main>
        <SiteFooter />
        <MobileTabBar />
      </body>
    </html>
  )
}
