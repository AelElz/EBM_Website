import { site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'

import { MobileActionBarFrame } from './header/mobile-action-bar-frame'

/*
 * Mobile action bar (docs/HOME-SPEC.md, Header 3): a frosted white bar pinned to the bottom of
 * phones and tablets (< 1024px) with two equal buttons, "Calendrier" and "Candidater" (the
 * header's two actions since 24 Oct 2026; the visit is in the Admissions menu).
 * It appears once the hero buttons (#primary-actions) have scrolled out of view, or after
 * 480px of scroll on pages without them, and pads itself above the home indicator
 * (env(safe-area-inset-bottom)). Rendered once in the (frontend) layout and in
 * global-not-found.tsx. Same export, no props.
 *
 * Server Component on purpose: the links are rendered here, so the client island
 * (header/mobile-action-bar-frame.tsx) carries only the visibility logic, not the content
 * modules or the button styles.
 */
export function MobileActionBar() {
  const { calendar, apply } = site.actions

  return (
    <MobileActionBarFrame>
      <nav
        aria-label="Actions principales"
        className="mx-auto grid max-w-xl grid-cols-2 gap-3 px-gutter pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      >
        <ButtonLink href={calendar.href} variant="outline-dark" className="w-full px-3">
          {calendar.label}
        </ButtonLink>
        <ButtonLink href={apply.href} className="w-full px-3">
          {apply.label}
        </ButtonLink>
      </nav>
    </MobileActionBarFrame>
  )
}
