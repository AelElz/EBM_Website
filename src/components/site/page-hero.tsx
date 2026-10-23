import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/ui/container'

export interface BreadcrumbItem {
  label: string
  /** Omit on the last item (current page). */
  href?: string
}

export interface PageHeroProps {
  /** The page's only h1. */
  title: string
  /** One-line purpose under the title. */
  intro?: string
  /** Trail after "Accueil" (prepended automatically); the last item is the current page. */
  breadcrumb?: BreadcrumbItem[]
}

/**
 * Compact page hero for inner pages: paper band, breadcrumb, Playfair h1, intro.
 * Two thin circle outlines echo the home collage (decorative, desktop only).
 */
export function PageHero({ title, intro, breadcrumb = [] }: PageHeroProps) {
  const trail: BreadcrumbItem[] = [{ label: 'Accueil', href: '/' }, ...breadcrumb]
  if (breadcrumb.length === 0) trail.push({ label: title })

  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute -top-44 -right-28 size-[460px] rounded-full border-[1.5px] border-terracotta/35" />
        <div className="absolute top-24 right-6 size-[200px] rounded-full border-[1.5px] border-olive/40 xl:right-24" />
      </div>

      <Container className="pt-6 pb-[clamp(56px,7vw,96px)] sm:pt-8">
        <nav aria-label="Fil d’Ariane">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6 text-ink-soft">
            {trail.map((item, index) => {
              const isCurrent = index === trail.length - 1
              return (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.5} />
                  ) : null}
                  {isCurrent || !item.href ? (
                    <span aria-current={isCurrent ? 'page' : undefined} className="text-charcoal">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="underline-offset-3 transition-colors hover:text-terracotta-ink hover:underline"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <h1
          id="page-title"
          className="mt-[clamp(40px,6vw,72px)] max-w-[15em] font-display text-h1 font-semibold"
        >
          {title}
        </h1>
        {intro ? <p className="mt-5 max-w-[56ch] text-lead text-ink-soft">{intro}</p> : null}
      </Container>
    </section>
  )
}
