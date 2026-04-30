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
            <p className="mt-4 text-sm opacity-70">
              Hindi translation coming soon. For Hindi assistance, call Voter Helpline{' '}
              <a href="tel:1950" className="font-bold text-white hover:underline" aria-label="Call Voter Helpline 1950">
                1950
              </a>
              .
            </p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 6 }}>
              Official Resources
            </p>
            <nav aria-label="Official external links">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li>
                  <a
                    href="https://voters.eci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Voters' Service Portal (opens in a new tab)"
                  >
                    Voters&apos; Service Portal ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://electoralsearch.eci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Electoral Search (opens in a new tab)"
                  >
                    Electoral Search ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://eci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Election Commission of India (opens in a new tab)"
                  >
                    Election Commission of India ↗
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="site-footer__divider" />
        <p>
          Confirm all final details through the{' '}
          <a
            href="https://eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Election Commission of India (opens in a new tab)"
          >
            Election Commission of India
          </a>{' '}
          or helpline <strong style={{ color: 'white' }}>1950</strong>.
          This guide does not store personal voter data or influence political choices.
        </p>
      </div>
    </footer>
  )
}
