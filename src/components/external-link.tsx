import { AnchorHTMLAttributes } from 'react'
import { isAllowedExternalUrl } from '@/lib/security/external-links'

export default function ExternalLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && !isAllowedExternalUrl(href)) {
    return (
      <span className="text-red-500 line-through" title="Blocked by allowlist">
        {children}
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
