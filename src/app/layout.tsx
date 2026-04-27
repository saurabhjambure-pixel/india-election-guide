import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
