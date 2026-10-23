import Image from 'next/image'
import Link from 'next/link'

import { navigation, site } from '@/content/site'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { DesktopNav } from './desktop-nav'
import { HeaderScrollState } from './header-scroll-state'
import { HeaderSearch, SearchLink } from './header-search'
import { MobileMenu } from './mobile-menu'
import { TOP_BAR_ID, TopBar } from './top-bar'

/*
 * Shared header (docs/HOME-SPEC.md, "Header (shared, every page)"). Server Component, no props.
 *
 * One <header>, sticky at top: -40px: the charcoal top bar (40px) scrolls away and the white
 * main bar stays pinned. Once the top bar is gone, header-scroll-state.tsx sets
 * data-scrolled="true" and the main bar turns frosted (translucent white, backdrop blur,
 * soft shadow under the hairline).
 *
 * Main bar, by width (sizes measured with the Avenir files so nothing overflows):
 *   < 1024px     logo · search icon (→ /recherche) · menu button (lazy-loaded sheet)
 *   1024–1279px  logo · 4 menus · search icon · Candidater ("Visiter" = /calendrier, which
 *                the top bar's "Calendrier" link already offers at this width)
 *   ≥ 1280px     logo · 4 menus · search field (210px, shrinks to 132px) · Visiter · Candidater
 *
 * Client islands: desktop-nav.tsx (menus + active section), mobile-menu.tsx (button; the sheet
 * is a separate chunk loaded on demand), header-scroll-state.tsx (renders nothing).
 */

const HEADER_ID = 'site-header'

const frosted = [
  'group-data-[scrolled=true]/header:bg-white/85',
  'group-data-[scrolled=true]/header:backdrop-blur-xl',
  'group-data-[scrolled=true]/header:backdrop-saturate-150',
  'group-data-[scrolled=true]/header:shadow-[0_12px_32px_-24px_rgb(40_30_20/0.4)]',
].join(' ')

export function Header() {
  const logo = site.logos.horizontal
  const { visit, apply } = site.actions

  return (
    <header id={HEADER_ID} data-scrolled="false" className="group/header sticky -top-10 z-40">
      <TopBar />

      <div
        className={`border-b border-hairline bg-white transition-[background-color,box-shadow] duration-300 ease-out ${frosted}`}
      >
        <Container className="flex h-16 items-center gap-6 lg:h-header lg:gap-7 xl:gap-8">
          <Link href="/" className="flex shrink-0" aria-label={`${site.name}, accueil`}>
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              unoptimized
              loading="eager"
              className="h-[30px] w-auto sm:h-[34px] xl:h-[38px]"
            />
          </Link>

          <DesktopNav groups={navigation} className="hidden shrink-0 self-stretch lg:block" />

          <div className="ml-auto flex min-w-0 items-center gap-1 lg:gap-2.5">
            <HeaderSearch className="hidden xl:flex" />
            <SearchLink className="xl:hidden" />
            <ButtonLink href={visit.href} variant="outline-dark" className="hidden px-[18px] xl:inline-flex">
              {visit.label}
            </ButtonLink>
            <ButtonLink href={apply.href} className="hidden lg:inline-flex">
              {apply.label}
            </ButtonLink>
            <MobileMenu className="-mr-2.5 lg:hidden" />
          </div>
        </Container>
      </div>

      <HeaderScrollState headerId={HEADER_ID} sentinelId={TOP_BAR_ID} />
    </header>
  )
}
