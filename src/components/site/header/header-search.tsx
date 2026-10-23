import { Search } from 'lucide-react'
import Link from 'next/link'

import { site } from '@/content/site'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/*
 * Header search (docs/HOME-SPEC.md, Header 2). Server Components, no JavaScript: a plain GET
 * form to /recherche?q=… (the results page is a placeholder until search is built).
 */

/**
 * Search field look-alike (paper ground, "Rechercher…", magnifier) for wide screens. It is
 * 210px wide and may shrink to 132px, so the bar never overflows when the fonts render wider.
 */
export function HeaderSearch({ className }: { className?: string }) {
  const { search } = site.actions

  return (
    <form
      role="search"
      action={search.href}
      method="get"
      className={cn(
        'flex h-11 w-[210px] min-w-[132px] items-center rounded-ui bg-paper',
        'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-terracotta-ink',
        className,
      )}
    >
      <label htmlFor="header-search" className="sr-only">
        Rechercher sur le site
      </label>
      <input
        id="header-search"
        type="search"
        name="q"
        placeholder={search.placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className="h-full min-w-0 flex-1 appearance-none bg-transparent pl-3.5 text-sm text-charcoal outline-none placeholder:text-ink-soft [&::-webkit-search-cancel-button]:appearance-none"
      />
      <button
        type="submit"
        className="mr-1 grid size-9 shrink-0 place-items-center rounded-ui text-charcoal transition-colors duration-200 hover:text-terracotta-ink focus-visible:outline-offset-0"
      >
        <Search aria-hidden="true" strokeWidth={1.5} className="size-[18px]" />
        <span className="sr-only">Lancer la recherche</span>
      </button>
    </form>
  )
}

/** Icon-only link to the search page (phones, tablets and the 1024–1279px bar). */
export function SearchLink({ className }: { className?: string }) {
  return (
    <Link
      href={site.actions.search.href}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
    >
      <Search aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
      <span className="sr-only">{site.actions.search.label}</span>
    </Link>
  )
}
