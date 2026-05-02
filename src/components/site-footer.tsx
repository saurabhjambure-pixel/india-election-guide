import ExternalLink from './external-link'

export default function SiteFooter() {
  return (
    <footer className="site-footer hidden md:block" role="contentinfo">
      <div className="container-app">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand">India Election Guide</p>
            <p className="text-ink-2">
              An informational assistant built on public election information.
              All procedural guidance is sourced from official ECI resources.
            </p>
            <p className="mt-4 text-sm text-ink-3">
              Hindi translation coming soon. For Hindi assistance, call Voter Helpline{' '}
              <a href="tel:1950" className="font-bold hover:underline" aria-label="Call Voter Helpline 1950">
                1950
              </a>
              .
            </p>
          </div>
          <div>
            <p className="font-bold mb-2 text-ink">Official Resources</p>
            <nav aria-label="Official external links">
              <ul className="flex flex-col gap-1">
                <li>
                  <ExternalLink
                    href="https://voters.eci.gov.in/"
                    aria-label="Voters' Service Portal (opens in a new tab)"
                  >
                    Voters&apos; Service Portal ↗
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    href="https://electoralsearch.eci.gov.in/"
                    aria-label="Electoral Search (opens in a new tab)"
                  >
                    Electoral Search ↗
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    href="https://eci.gov.in/"
                    aria-label="Election Commission of India (opens in a new tab)"
                  >
                    Election Commission of India ↗
                  </ExternalLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="site-footer__divider" />
        <div className="space-y-2 text-ink-3">
          <p>
            Confirm all final details through the official portal or helpline <strong>1950</strong>.
            This guide does not store personal voter data or influence political choices.
          </p>
          <p>
            <ExternalLink
              href="https://eci.gov.in/"
              aria-label="Election Commission of India (opens in a new tab)"
            >
              Election Commission of India ↗
            </ExternalLink>
          </p>
        </div>
      </div>
    </footer>
  )
}
