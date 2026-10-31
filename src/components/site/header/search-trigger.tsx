'use client'

import Link from '@/cms/link'
import { usePathname } from 'next/navigation'
import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

/*
 * "Rechercher" in the header (header-links.tsx renders its icon and label as children). A real
 * link to the search page, so it works without JavaScript and with Cmd/Ctrl-click; a plain click
 * opens the search overlay instead.
 *
 * The overlay (search-overlay.tsx, with Radix Dialog and the search index) is a separate chunk:
 * the first pointer contact or focus on the link starts the download, the click opens it. None
 * of it is in the first-load JavaScript.
 */
const loadOverlay = () => import('./search-overlay')
const SearchOverlay = lazy(() => loadOverlay().then((module) => ({ default: module.SearchOverlay })))

export function SearchTrigger({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [requested, setRequested] = useState(false)
  const triggerRef = useRef<HTMLAnchorElement>(null)

  // Any navigation (a result, back/forward) closes the overlay.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const warmUp = () => {
    void loadOverlay()
  }

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setRequested(true)
    setOpen(true)
  }

  return (
    <>
      <Link
        ref={triggerRef}
        href={href}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={warmUp}
        onPointerDown={warmUp}
        onFocus={warmUp}
        onClick={onClick}
        className={className}
      >
        {children}
      </Link>

      {requested ? (
        <Suspense fallback={null}>
          <SearchOverlay open={open} onOpenChange={setOpen} triggerRef={triggerRef} />
        </Suspense>
      ) : null}
    </>
  )
}
