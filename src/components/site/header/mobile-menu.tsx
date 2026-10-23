'use client'

import { usePathname } from 'next/navigation'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { MenuIcon } from './icons'
import { MOBILE_MENU_ID } from './nav-utils'

/*
 * Menu button for phones and tablets (< 1024px), docs/HOME-SPEC.md Header 3.
 *
 * The sheet itself (Radix Dialog + Accordion, the menu data, its icons) is a separate chunk,
 * loaded on demand: the first pointer contact or focus on the button starts the download and
 * the first tap opens it. None of it is in the first-load JavaScript.
 */
const loadSheet = () => import('./mobile-sheet')
const MobileSheet = lazy(() => loadSheet().then((module) => ({ default: module.MobileSheet })))

export function MobileMenu({ className }: { className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [requested, setRequested] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Any navigation (a link in the sheet, back/forward) closes the sheet.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const warmUp = () => {
    void loadSheet()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Ouvrir le menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? MOBILE_MENU_ID : undefined}
        onPointerEnter={warmUp}
        onPointerDown={warmUp}
        onFocus={warmUp}
        onClick={() => {
          setRequested(true)
          setOpen(true)
        }}
        className={[
          'inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-ui text-charcoal',
          'transition-colors duration-200 hover:bg-paper',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <MenuIcon className="size-6" />
      </button>

      {requested ? (
        <Suspense fallback={null}>
          <MobileSheet open={open} onOpenChange={setOpen} triggerRef={triggerRef} />
        </Suspense>
      ) : null}
    </>
  )
}
