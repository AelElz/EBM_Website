import { Search, UserRound, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { site } from '@/content/site'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

import { SearchTrigger } from './search-trigger'

/*
 * Header utility links, after Ayoub's reference screenshot (24 Oct 2026, "PORTALS" / "SEARCH"):
 * a Fired Clay line icon followed by a label in the menu triggers' voice (Avenir 600, 15px,
 * sentence case like the rest of the bar). `labelClassName` decides from which width the label
 * shows (e.g. "sr-only xl:not-sr-only"); below that the link is a 44px icon button whose label
 * stays for screen readers. Server Components; the search link wraps the client trigger that
 * opens the search overlay (search-trigger.tsx).
 */

const linkClass =
  'inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full text-[15px] ' +
  'font-semibold whitespace-nowrap text-charcoal transition-colors duration-200 hover:text-terracotta-ink'

function Icon({ icon: Glyph }: { icon: LucideIcon }) {
  return <Glyph aria-hidden="true" strokeWidth={1.75} className="size-[22px] shrink-0 text-terracotta" />
}

/** Opens the search overlay (search-trigger.tsx); a link to /recherche without JavaScript. */
export function SearchLink({ className, labelClassName }: { className?: string; labelClassName?: string }) {
  const { search } = site.actions

  return (
    <SearchTrigger href={search.href} className={cn(linkClass, className)}>
      <Icon icon={Search} />
      <span className={labelClassName}>{search.label}</span>
    </SearchTrigger>
  )
}

/** Login: the site's Espace Eduka page (/espace-eduka), which hands off to Eduka's sign-in. */
export function EdukaLink({ className, labelClassName }: { className?: string; labelClassName?: string }) {
  return (
    <Link href={routes.espaceEduka} className={cn(linkClass, className)}>
      <Icon icon={UserRound} />
      <span className={labelClassName}>{site.eduka.label}</span>
      <span className="sr-only"> (connexion)</span>
    </Link>
  )
}
