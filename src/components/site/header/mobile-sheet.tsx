'use client'

import { UserRound, X } from 'lucide-react'
import Image from '@/cms/image'
import Link from '@/cms/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, type RefObject } from 'react'

import { useCmsContext } from '@/cms/context'
import type { SiteConfig, NavGroup } from '@/content/site'

import { navigation as defaultNavigation, site as defaultSite } from '@/content/site'
import { getSectionForPath, routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ButtonLink } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'

import { MOBILE_MENU_ID, isCurrentPage } from './nav-utils'

/*
 * Mobile menu sheet (< 1024px), docs/HOME-SPEC.md Header 3. Loaded on demand by
 * mobile-menu.tsx, never part of the first-load JavaScript.
 *
 * Full-height panel from the right (full width on phones, 420px from 640px): logo + close,
 * the four menus as accordions (the current section starts open), Espace Eduka (the login
 * page, /espace-eduka), then the header's two actions, Calendrier and Candidater, pinned at the bottom above
 * the home indicator. Phones and e-mails are in the footer (Ayoub, 24 Oct 2026).
 */

export interface MobileSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The menu button: focus returns to it when the sheet closes. */
  triggerRef: RefObject<HTMLButtonElement | null>
}

const rowClass =
  'flex min-h-12 items-center gap-3 py-2 text-base transition-colors duration-200 hover:text-terracotta-ink'

export function MobileSheet({ open, onOpenChange, triggerRef }: MobileSheetProps) {
  const cms = useCmsContext()
  const site = (cms.site as SiteConfig | undefined) ?? defaultSite
  const navigation = (cms.navigation as NavGroup[] | undefined) ?? defaultNavigation
  const pathname = usePathname()
  const activeSection = getSectionForPath(pathname)
  const closeRef = useRef<HTMLButtonElement>(null)
  const logo = site.logos.horizontal
  const close = () => onOpenChange(false)

  // Rotating a tablet past 1024px shows the desktop bar: close the sheet.
  useEffect(() => {
    if (!open) return
    const wide = window.matchMedia('(min-width: 64rem)')
    const onChange = () => {
      if (wide.matches) onOpenChange(false)
    }
    wide.addEventListener('change', onChange)
    return () => wide.removeEventListener('change', onChange)
  }, [open, onOpenChange])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id={MOBILE_MENU_ID}
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          closeRef.current?.focus()
        }}
        onCloseAutoFocus={(event) => {
          // No Radix Trigger here (the button lives outside the lazy chunk): restore focus.
          event.preventDefault()
          triggerRef.current?.focus()
        }}
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>

        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-hairline px-gutter">
          <Link href="/" onClick={close} className="flex shrink-0" aria-label={`${site.name}, accueil`}>
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              unoptimized
              className="h-[30px] w-auto sm:h-[34px]"
            />
          </Link>
          <SheetClose
            ref={closeRef}
            className="-mr-2.5 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-charcoal transition-colors duration-200 hover:bg-paper"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
            <span className="sr-only">Fermer le menu</span>
          </SheetClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-gutter pb-6">
          <nav aria-label="Menu principal">
            <Accordion type="single" collapsible defaultValue={activeSection}>
              {navigation.map((group) => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionTrigger className={cn(activeSection === group.id && 'text-terracotta-ink')}>
                    {group.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <ul>
                      {group.items.map((item) => {
                        const isCurrent = isCurrentPage(pathname, item.href)
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={close}
                              aria-current={isCurrent ? 'page' : undefined}
                              className={cn(
                                'flex min-h-11 flex-col justify-center py-2 pl-3 text-base transition-colors duration-200 hover:text-terracotta-ink',
                                isCurrent ? 'font-semibold text-terracotta-ink' : 'text-charcoal',
                              )}
                            >
                              {item.label}
                              {item.hint ? <span className="text-sm font-normal text-ink-soft">{item.hint}</span> : null}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>

          <ul className="border-b border-hairline py-2">
            <li>
              <Link
                href={routes.espaceEduka}
                onClick={close}
                aria-current={isCurrentPage(pathname, routes.espaceEduka) ? 'page' : undefined}
                className={cn(rowClass, 'font-semibold')}
              >
                <UserRound aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0 text-terracotta" />
                {site.eduka.label}
                <span className="sr-only"> (connexion)</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-hairline px-gutter pt-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          <ButtonLink href={site.actions.calendar.href} variant="outline-dark" onClick={close} className="w-full px-3">
            {site.actions.calendar.label}
          </ButtonLink>
          <ButtonLink href={site.actions.apply.href} onClick={close} className="w-full px-3">
            {site.actions.apply.label}
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

