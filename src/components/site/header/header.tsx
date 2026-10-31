import { getCmsContent } from '@/cms/server'
import Image from '@/cms/image'
import Link from '@/cms/link'

import { navigation as defaultNavigation, site as defaultSite } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { DesktopNav } from './desktop-nav'
import { EdukaLink, SearchLink } from './header-links'
import { HeaderScrollState } from './header-scroll-state'
import { MobileMenu } from './mobile-menu'

/*
 * Shared header (docs/HOME-SPEC.md, "Header (shared, every page)"). Server Component, no props.
 *
 * One white bar, sticky at the top (since 24 Oct 2026 there is no charcoal top bar: phones,
 * e-mails and "Nous contacter" live in the footer). Once the page has scrolled a few pixels,
 * header-scroll-state.tsx sets data-scrolled="true" and the bar turns frosted (translucent
 * white, backdrop blur, soft shadow under the hairline).
 *
 * The bar uses the wide container (1440px incl. gutters, as on Korowa), wider than the page
 * column: with labels, the right-hand group alone is ~550px. By width (measured with the Avenir
 * files so nothing overflows):
 *   < 1024px     logo · search icon · Eduka icon (login) · menu button (lazy-loaded sheet)
 *   1024–1279px  logo · 4 menus · search icon · Eduka icon | Candidater
 *   1280–1439px  logo · 4 menus · search icon · Eduka icon | Calendrier · Candidater
 *   ≥ 1440px     logo · 4 menus · Rechercher · Espace Eduka | Calendrier · Candidater
 * The visit ("Demander une visite", on /calendrier#visite) is in the Vie scolaire menu, not in the bar.
 *
 * Client islands: desktop-nav.tsx (menus + active section), mobile-menu.tsx (button; the sheet
 * is a separate chunk loaded on demand), header-scroll-state.tsx (renders nothing).
 */

const HEADER_ID = 'site-header'
/** 8px strip at the very top of the page: once it has scrolled away, the bar frosts. */
const SENTINEL_ID = 'header-sentinel'

const frosted = [
  'group-data-[scrolled=true]/header:bg-white/85',
  'group-data-[scrolled=true]/header:backdrop-blur-xl',
  'group-data-[scrolled=true]/header:backdrop-saturate-150',
  'group-data-[scrolled=true]/header:shadow-[0_12px_32px_-24px_rgb(40_30_20/0.4)]',
].join(' ')

export async function Header() {
  const site = await getCmsContent('site', defaultSite)
  const navigation = await getCmsContent('navigation', defaultNavigation)
  const logo = site.logos.horizontal
  const { calendar, apply } = site.actions

  return (
    <>
      <div id={SENTINEL_ID} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2" />
      <header id={HEADER_ID} data-scrolled="false" className="group/header sticky top-0 z-40">
        <div
          className={`border-b border-hairline bg-white transition-[background-color,box-shadow] duration-300 ease-out ${frosted}`}
        >
          <Container size="wide" className="flex h-16 items-center gap-4 sm:gap-6 lg:h-header xl:gap-8">
            <Link href="/" className="flex shrink-0" aria-label={`${site.name}, accueil`}>
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                unoptimized
                loading="eager"
                // 26px under 400px wide: room for the three 44px buttons on a 360px phone.
                className="h-[26px] w-auto min-[400px]:h-[30px] sm:h-[34px] xl:h-[38px]"
              />
            </Link>

            <DesktopNav groups={navigation} className="hidden shrink-0 self-stretch lg:block" />

            <div className="ml-auto flex min-w-0 items-center gap-0.5 sm:gap-1 lg:gap-1.5 xl:gap-5">
              <SearchLink labelClassName="sr-only min-[90rem]:not-sr-only" />
              <EdukaLink labelClassName="sr-only min-[90rem]:not-sr-only" />
              <span aria-hidden="true" className="mx-0.5 hidden h-7 w-px shrink-0 bg-charcoal/20 lg:block xl:mx-0" />
              <ButtonLink href={calendar.href} variant="outline-dark" className="hidden px-[18px] xl:inline-flex">
                {calendar.label}
              </ButtonLink>
              <ButtonLink href={apply.href} className="hidden lg:inline-flex">
                {apply.label}
              </ButtonLink>
              <MobileMenu className="-mr-2.5 lg:hidden" />
            </div>
          </Container>
        </div>

        <HeaderScrollState headerId={HEADER_ID} sentinelId={SENTINEL_ID} />
      </header>
    </>
  )
}
