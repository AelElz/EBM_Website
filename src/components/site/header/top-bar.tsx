import { ArrowUpRight, Phone, UserRound } from 'lucide-react'
import Link from 'next/link'

import { site } from '@/content/site'
import { Container } from '@/components/ui/container'

/** id of the top bar: the scroll-state observer watches it to frost the main bar. */
export const TOP_BAR_ID = 'top-bar'

/*
 * Charcoal top bar (docs/HOME-SPEC.md, Header 1): 40px, 13px text, white at 86%. It is part of
 * the sticky <header> (top: -40px), so it scrolls away and the main bar stays.
 *
 * What fits at each width (measured with the Avenir files, 13px):
 *   < 480px  Casablanca phone only (the menu sheet carries everything else)
 *   ≥ 480px  + "Nous contacter"
 *   ≥ 640px  + Rabat phone
 *   ≥ 1024px + Calendrier, Espace Eduka
 * Links are 40px tall (touch target); -mx-2/px-2 keeps the text aligned and gives the white
 * focus ring room inside the bar.
 */
const linkClass =
  '-mx-2 inline-flex h-10 items-center gap-2 whitespace-nowrap px-2 text-white/86 ' +
  'transition-colors duration-200 hover:text-white ' +
  'focus-visible:outline-white focus-visible:outline-offset-[-5px]'

const iconClass = 'size-3.5 shrink-0'

export function TopBar() {
  const { casablanca, rabat } = site.phones
  const { calendar, contact } = site.actions

  return (
    <div id={TOP_BAR_ID} className="bg-charcoal text-[13px] leading-none text-white/86">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex min-w-0 items-center gap-6">
          <li>
            <a href={casablanca.href} className={linkClass}>
              <Phone aria-hidden="true" strokeWidth={1.5} className={iconClass} />
              {casablanca.label} {casablanca.display}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={rabat.href} className={linkClass}>
              <Phone aria-hidden="true" strokeWidth={1.5} className={iconClass} />
              {rabat.label} {rabat.display}
            </a>
          </li>
        </ul>

        <nav aria-label="Liens utiles" className="hidden min-[480px]:block">
          <ul className="flex items-center gap-[22px]">
            <li className="hidden lg:block">
              <Link href={calendar.href} className={linkClass}>
                {calendar.label}
              </Link>
            </li>
            <li className="hidden lg:block">
              <a
                href={site.eduka.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <UserRound aria-hidden="true" strokeWidth={1.5} className={iconClass} />
                {site.eduka.label}
                <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="-ml-1 size-3 shrink-0" />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
            <li>
              <Link
                href={contact.href}
                className="flex h-10 items-center whitespace-nowrap bg-terracotta px-[18px] font-semibold text-white transition-colors duration-200 hover:bg-terracotta-ink focus-visible:outline-white focus-visible:outline-offset-[-5px]"
              >
                {contact.label}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  )
}
