import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-app">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand">India Election Guide</p>
            <p>
              An informational assistant built on public election information.
              All procedural guidance is sourced from official ECI resources.
            </p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 6 }}>
              Official Resources
            </p>
            <nav aria-label="Official external links">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li><a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer">Voters&apos; Service Portal ↗</a></li>
                <li><a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer">Electoral Search ↗</a></li>
                <li><a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer">Election Commission of India ↗</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="site-footer__divider" />
        <p>
          Confirm all final details through the{' '}
          <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer">
            Election Commission of India
          </a>{' '}
          or helpline <strong style={{ color: 'white' }}>1950</strong>.
          This guide does not store personal voter data or influence political choices.
        </p>
      </div>
    </footer>
  )
}
