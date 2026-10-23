import { ArrowRight, CalendarCheck, GraduationCap, Sprout, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { home, type HomeIcon } from '@/content/home'
import { Container } from '@/components/ui/container'
import { NNBSP } from '@/lib/typography'

/*
 * Home section 1, with the hero (docs/HOME-SPEC.md): the highlights panel, "version 2" composition.
 * Server Component, no client JS.
 *
 * ONE white panel (not three cards) with the soft card shadow, pulled up over the hero:
 * 48px on phones, 96px from 768px. The hero's bottom padding (hero-slider.tsx: pb-18 / md:pb-32)
 * reserves that overlap plus breathing room; change both together.
 * Layout: stacked rows with hairline separators on phones; three columns from 768px (icon above
 * the text), icon beside the text from 1024px where the columns are wide enough.
 */

const icons: Partial<Record<HomeIcon, LucideIcon>> = {
  diploma: GraduationCap,
  outdoor: Sprout,
  admissions: CalendarCheck,
}

export function Highlights() {
  return (
    <section aria-label="L’essentiel" className="relative z-10 -mt-12 md:-mt-24">
      <Container>
        <ul
          role="list"
          className="grid divide-y divide-hairline bg-white px-6 shadow-card sm:px-8 md:grid-cols-3 md:gap-8 md:divide-y-0 md:px-10 md:py-9"
        >
          {home.highlights.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li
                key={item.title}
                className="flex gap-4 py-6 sm:gap-5 md:flex-col md:gap-4 md:py-0 lg:flex-row lg:gap-[18px]"
              >
                {Icon ? (
                  <Icon aria-hidden="true" className="size-10 shrink-0 text-charcoal" strokeWidth={1.4} />
                ) : null}
                <div className="min-w-0">
                  <h2 className="font-sans text-lg leading-snug font-bold tracking-normal">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 max-w-[60ch] text-[15px] leading-[1.55] text-ink-soft">
                    {item.text}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-3 inline-flex min-h-6 items-center gap-1.5 text-sm font-bold text-charcoal no-underline transition-colors duration-200 hover:text-terracotta-ink hover:underline"
                  >
                    {item.linkLabel}
                    <span className="sr-only">{`${NNBSP}: ${item.title}`}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
