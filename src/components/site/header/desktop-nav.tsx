'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react'

import type { NavGroup, NavId } from '@/content/site'
import { getSectionForPath } from '@/lib/routes'

import styles from './desktop-nav.module.css'
import { ChevronDownIcon } from './icons'
import { isCurrentPage } from './nav-utils'

/*
 * Desktop menus (≥ 1024px), docs/HOME-SPEC.md Header 2: four disclosure buttons, each with a
 * dropdown panel of links (white, 3px terracotta top border, soft shadow).
 *
 * A small accessible disclosure pattern rather than Radix NavigationMenu: about 2 KB, no icon
 * library and no tailwind-merge in the first-load bundle (clsx only).
 *
 * - Mouse: opens after a short intent delay, closes shortly after the pointer leaves; moving
 *   to another menu while one is open switches at once. A click on a hover-opened menu pins
 *   it open, a second click closes it. Touch and pen ignore hover: tap to open/close.
 * - Keyboard: Enter/Space toggle; ArrowDown/ArrowUp open and focus the first/last link;
 *   ArrowLeft/ArrowRight/Home/End move between menus; inside a panel ArrowUp/ArrowDown/
 *   Home/End move between links and ArrowLeft/ArrowRight jump to the neighbouring menu;
 *   Escape closes and returns focus to the button; Tab follows the DOM, and focus leaving a
 *   menu closes it.
 * - Active section (route prefix → NavId, src/lib/routes.ts): 3px terracotta bottom border +
 *   terracotta-ink text on the button, aria-current="page" on the link of the current page.
 */

const OPEN_DELAY = 140
const CLOSE_DELAY = 240

const panelId = (id: NavId) => `menu-${id}`

export interface DesktopNavProps {
  groups: NavGroup[]
  className?: string
}

export function DesktopNav({ groups, className }: DesktopNavProps) {
  const pathname = usePathname()
  const activeSection = getSectionForPath(pathname)
  const [openId, setOpenId] = useState<NavId | null>(null)

  const navRef = useRef<HTMLElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  /** The open panel was opened by hover: a click pins it instead of closing it. */
  const openedByHoverRef = useRef(false)
  /** Link to focus once a panel opened with ArrowDown/ArrowUp is visible. */
  const focusOnOpenRef = useRef<'first' | 'last' | null>(null)

  const clearTimer = () => {
    window.clearTimeout(timerRef.current)
    timerRef.current = undefined
  }

  const getTriggers = () =>
    Array.from(navRef.current?.querySelectorAll<HTMLButtonElement>('[data-menu-trigger]') ?? [])
  const getTrigger = (id: NavId) =>
    navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${id}"]`) ?? null
  const getLinks = (id: NavId) =>
    Array.from(document.getElementById(panelId(id))?.querySelectorAll<HTMLAnchorElement>('a') ?? [])

  const openMenu = (id: NavId, byHover: boolean) => {
    clearTimer()
    openedByHoverRef.current = byHover
    setOpenId(id)
  }

  const closeMenu = () => {
    clearTimer()
    openedByHoverRef.current = false
    setOpenId(null)
  }

  /** Move focus to the menu button `step` places away (wraps), or to the first/last one. */
  const focusTrigger = (from: NavId, step: number | 'first' | 'last') => {
    const triggers = getTriggers()
    if (triggers.length === 0) return
    if (step === 'first') return triggers[0].focus()
    if (step === 'last') return triggers[triggers.length - 1].focus()
    const index = triggers.findIndex((trigger) => trigger.dataset.menuTrigger === from)
    triggers[(index + step + triggers.length) % triggers.length]?.focus()
  }

  // Handlers are live: switch off the CSS-only fallback (desktop-nav.module.css).
  useEffect(() => {
    navRef.current?.setAttribute('data-enhanced', '')
    return () => window.clearTimeout(timerRef.current)
  }, [])

  // A navigation (link, back/forward) closes any open panel.
  useEffect(() => {
    clearTimer()
    openedByHoverRef.current = false
    setOpenId(null)
  }, [pathname])

  // Focus the first/last link of a panel opened from the keyboard, once it is visible.
  useEffect(() => {
    const target = focusOnOpenRef.current
    if (!openId || !target) return
    focusOnOpenRef.current = null
    const links = getLinks(openId)
    ;(target === 'first' ? links[0] : links[links.length - 1])?.focus()
  }, [openId])

  // While a panel is open: Escape closes it (focus back on its button when focus was inside
  // the menu); a press anywhere outside the nav closes it.
  useEffect(() => {
    if (!openId) return

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const focusWasInside = navRef.current?.contains(document.activeElement) ?? false
      const trigger = getTrigger(openId)
      closeMenu()
      if (focusWasInside) trigger?.focus()
    }
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && navRef.current?.contains(event.target)) return
      closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
    // closeMenu and getTrigger only read refs and call the state setter: openId is enough.
  }, [openId])

  const onItemPointerEnter = (id: NavId) => (event: PointerEvent<HTMLLIElement>) => {
    if (event.pointerType !== 'mouse') return
    clearTimer()
    if (openId === id) return
    if (openId) {
      openMenu(id, true)
      return
    }
    timerRef.current = window.setTimeout(() => openMenu(id, true), OPEN_DELAY)
  }

  const onItemPointerLeave = (id: NavId) => (event: PointerEvent<HTMLLIElement>) => {
    if (event.pointerType !== 'mouse') return
    clearTimer()
    // A panel opened by click or keyboard stays until it is dismissed.
    if (openId !== id || !openedByHoverRef.current) return
    timerRef.current = window.setTimeout(() => {
      openedByHoverRef.current = false
      setOpenId((current) => (current === id ? null : current))
    }, CLOSE_DELAY)
  }

  const onItemBlur = (id: NavId) => (event: FocusEvent<HTMLLIElement>) => {
    // relatedTarget is null when focus goes nowhere (e.g. Safari on a mouse press); outside
    // presses are handled by the pointerdown listener.
    const next = event.relatedTarget
    if (openId === id && next instanceof Node && !event.currentTarget.contains(next)) closeMenu()
  }

  const onTriggerClick = (id: NavId) => (event: MouseEvent<HTMLButtonElement>) => {
    const fromKeyboard = event.detail === 0
    if (openId !== id) {
      openMenu(id, false)
      return
    }
    if (openedByHoverRef.current && !fromKeyboard) {
      // Pin a hover-opened menu instead of closing it under the pointer.
      clearTimer()
      openedByHoverRef.current = false
      return
    }
    closeMenu()
  }

  const onTriggerKeyDown = (id: NavId) => (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault()
        const where = event.key === 'ArrowDown' ? 'first' : 'last'
        if (openId === id) {
          const links = getLinks(id)
          ;(where === 'first' ? links[0] : links[links.length - 1])?.focus()
        } else {
          focusOnOpenRef.current = where
          openMenu(id, false)
        }
        break
      }
      case 'ArrowRight':
        event.preventDefault()
        focusTrigger(id, 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusTrigger(id, -1)
        break
      case 'Home':
        event.preventDefault()
        focusTrigger(id, 'first')
        break
      case 'End':
        event.preventDefault()
        focusTrigger(id, 'last')
        break
    }
  }

  const onPanelKeyDown = (id: NavId) => (event: KeyboardEvent<HTMLUListElement>) => {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'))
    const index = links.findIndex((link) => link === document.activeElement)
    let next: HTMLAnchorElement | undefined
    switch (event.key) {
      case 'ArrowDown':
        next = links[(index + 1) % links.length]
        break
      case 'ArrowUp':
        next = links[(Math.max(index, 0) - 1 + links.length) % links.length]
        break
      case 'Home':
        next = links[0]
        break
      case 'End':
        next = links[links.length - 1]
        break
      case 'ArrowRight':
      case 'ArrowLeft':
        // Leaving the panel this way closes it (blur).
        event.preventDefault()
        focusTrigger(id, event.key === 'ArrowRight' ? 1 : -1)
        return
      default:
        return
    }
    event.preventDefault()
    next?.focus()
  }

  const onLinkClick = (id: NavId) => (event: MouseEvent<HTMLAnchorElement>) => {
    const fromKeyboard = event.detail === 0
    const trigger = getTrigger(id)
    closeMenu()
    // Keyboard users keep their place instead of falling back to <body>.
    if (fromKeyboard) trigger?.focus()
  }

  return (
    <nav ref={navRef} aria-label="Navigation principale" className={clsx(styles.nav, className)}>
      <ul className="flex h-full items-stretch gap-[clamp(18px,1.9vw,28px)]">
        {groups.map((group) => {
          const isOpen = openId === group.id
          const isActive = activeSection === group.id
          const id = panelId(group.id)

          return (
            <li
              key={group.id}
              className={clsx(styles.item, 'relative flex')}
              onPointerEnter={onItemPointerEnter(group.id)}
              onPointerLeave={onItemPointerLeave(group.id)}
              onBlur={onItemBlur(group.id)}
            >
              <button
                type="button"
                data-menu-trigger={group.id}
                aria-expanded={isOpen}
                aria-controls={id}
                aria-current={isActive ? 'true' : undefined}
                onClick={onTriggerClick(group.id)}
                onKeyDown={onTriggerKeyDown(group.id)}
                className={clsx(
                  'group/trigger flex h-full cursor-pointer items-center border-b-[3px] pt-[3px] text-[15px] font-semibold',
                  'transition-colors duration-200 focus-visible:outline-none',
                  isActive
                    ? 'border-terracotta text-terracotta-ink'
                    : 'border-transparent hover:text-terracotta-ink',
                  isOpen && 'text-terracotta-ink',
                )}
              >
                {/* The focus ring sits on the label, not on the 76px-tall button. */}
                <span className="flex items-center gap-[5px] rounded-[2px] group-focus-visible/trigger:outline-2 group-focus-visible/trigger:outline-offset-4 group-focus-visible/trigger:outline-terracotta-ink">
                  {group.label}
                  <ChevronDownIcon className={clsx('size-3.5 shrink-0', isOpen && 'rotate-180')} />
                </span>
              </button>

              <div
                id={id}
                className={clsx(
                  styles.panel,
                  isOpen && styles.open,
                  'absolute top-full left-[-22px] z-10 min-w-[270px] border-t-[3px] border-terracotta bg-white py-2.5',
                  'shadow-[0_24px_48px_-20px_rgb(40_30_20/0.3)]',
                )}
              >
                <ul onKeyDown={onPanelKeyDown(group.id)}>
                  {group.items.map((item) => {
                    const isCurrent = isCurrentPage(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          onClick={onLinkClick(group.id)}
                          className={clsx(
                            'block px-[22px] py-2.5 text-[15px] leading-6 whitespace-nowrap no-underline',
                            'transition-colors duration-200 hover:bg-paper hover:text-terracotta-ink',
                            'focus-visible:outline-offset-[-3px]',
                            isCurrent ? 'font-semibold text-terracotta-ink' : 'font-medium text-charcoal',
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
