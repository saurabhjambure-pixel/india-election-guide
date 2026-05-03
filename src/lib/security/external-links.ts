const ALLOWED_SOURCE_DOMAINS = new Set([
  'voters.eci.gov.in',
  'ecisveep.nic.in',
  'electoralsearch.eci.gov.in',
  'eci.gov.in',
])

export function isAllowedExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === 'https:' &&
      ALLOWED_SOURCE_DOMAINS.has(parsed.hostname)
    )
  } catch {
    return false
  }
}

export function assertAllowedExternalUrl(url: string): string | null {
  return isAllowedExternalUrl(url) ? url : null
}

export { ALLOWED_SOURCE_DOMAINS }
