'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

/*
 * Visibility for the mobile action bar (src/components/site/mobile-action-bar.tsx). The
 * buttons arrive as server-rendered children, so this island holds only the show/hide logic.
 *
 * Shown once the element #primary-actions (the hero buttons) has scrolled up out of view,
 * or, on pages without it, after 480px of scroll. Re-evaluated on every navigation, because
 * the bar lives in the layout. Hidden from 1024px (lg:hidden): the header carries the actions.
 */

/** Wrapper of the hero buttons (src/components/home/hero.tsx). */
const HERO_ACTIONS_ID = 'primary-actions'
/** Scroll distance before the bar appears on pages without hero buttons. */
const FALLBACK_SCROLL = 480
/** Sticky main bar height on phones (header.tsx h-16): buttons under it are out of view. */
const HEADER_OFFSET = 64

/*
 * Bar height = 1px border + 12px top padding + 44px buttons + bottom padding (12px, or the
 * home-indicator inset when larger). The in-flow spacer reserves exactly that much at the end
 * of the page while the bar is shown, so the bar never covers the end of the footer.
 */
const spacerShown = 'h-[calc(57px+max(12px,env(safe-area-inset-bottom)))] lg:hidden'
const spacerHidden = 'h-0'

const barBase =
  'fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white/90 backdrop-blur-lg backdrop-saturate-150 ' +
  'shadow-[0_-12px_32px_-24px_rgb(40_30_20/0.35)] transition-[translate,opacity,visibility] duration-300 ease-out-expo lg:hidden'

export function MobileActionBarFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const actions = document.getElementById(HERO_ACTIONS_ID)

    if (actions && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Out of view *above* the fold, not below it (e.g. a short landscape screen).
          const scrolledPast = entry.boundingClientRect.top < window.innerHeight / 2
          setVisible(!entry.isIntersecting && scrolledPast)
        },
        { rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px` },
      )
      observer.observe(actions)
      return () => observer.disconnect()
    }

    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > FALLBACK_SCROLL)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return (
    <>
      <div aria-hidden="true" className={visible ? spacerShown : spacerHidden} />
      <div
        data-visible={visible}
        className={`${barBase} ${visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'}`}
      >
        {children}
      </div>
    </>
  )
}
