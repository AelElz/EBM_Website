'use client'

import { usePathname } from 'next/navigation'
import { ViewTransition, type ReactNode } from 'react'

/*
 * The page change, Apple style (30 Oct 2026): keyed by the path, so only a move to another page
 * runs it. The old page leaves and the new one enters with the `.page` animations
 * (globals.css); a hash or query change on the same page (the stage tabs on /pedagogie) does
 * not animate.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <ViewTransition key={pathname} enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
