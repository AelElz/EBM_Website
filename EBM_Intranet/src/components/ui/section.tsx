import Link from 'next/link'
import type { ReactNode } from 'react'

/*
 * An Apple grouped section: a title on the page, its rows on one white card with hairlines
 * between them, and an optional footnote under the card.
 */
export function Section({
  id,
  title,
  action,
  footer,
  separatorInset,
  hideTitle,
  children,
}: {
  id: string
  /** Hidden when the page title already names the list. */
  title: string
  hideTitle?: boolean
  action?: { label: string; href: string }
  footer?: ReactNode
  /** Where the hairlines start, so they line up with the rows' text. */
  separatorInset?: number
  children: ReactNode
}) {
  return (
    <section aria-labelledby={id}>
      <div className={`flex items-baseline justify-between gap-4 ${hideTitle ? 'sr-only' : ''}`}>
        <h2 id={id} className="text-title font-semibold">
          {title}
        </h2>
        {action ? (
          <Link href={action.href} className="text-sub text-accent-text hover:underline">
            {action.label}
          </Link>
        ) : null}
      </div>
      <ul
        role="list"
        className={`rows overflow-hidden rounded-card bg-card ${hideTitle ? '' : 'mt-2.5'}`}
        style={separatorInset ? ({ '--separator-inset': `${separatorInset}px` } as React.CSSProperties) : undefined}
      >
        {children}
      </ul>
      {footer ? <p className="mt-2 px-4 text-foot text-secondary">{footer}</p> : null}
    </section>
  )
}

/** A row that opens a screen: the whole row is the link, a grey chevron at its end. */
export function RowLink({ href, children, top = false }: { href: string; children: ReactNode; top?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex min-h-11 gap-3 px-4 py-2.5 transition-colors hover:bg-hover active:bg-fill ${top ? 'items-start' : 'items-center'}`}
      >
        {children}
        <svg aria-hidden="true" viewBox="0 0 8 13" className={`h-[13px] w-2 shrink-0 ${top ? 'mt-1' : ''}`}>
          <path d="M1 1l6 5.5L1 12" fill="none" stroke="var(--color-chevron)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </li>
  )
}

/** A row that does not open anything. */
export function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <li className={`flex min-h-11 items-center gap-3 px-4 py-2.5 ${className}`}>{children}</li>
}
