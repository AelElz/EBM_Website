import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export type SmartLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  /** New tab + rel="noopener noreferrer" + "(nouvel onglet)" for screen readers. */
  external?: boolean
  children: ReactNode
}

/**
 * Plain text link that picks the right element: next/link for internal routes, <a> for
 * external URLs, tel: and mailto:. Styling is up to the caller. Server-safe.
 */
export function SmartLink({ href, external, children, ...props }: SmartLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    )
  }

  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
