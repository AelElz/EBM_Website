import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  Sprout,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { home, type HomeIcon } from '@/content/home'
import { Container } from '@/components/ui/container'

import { CountUp } from './count-up'

/*
 * Home section 4 (docs/HOME-SPEC.md): key figures. Server Component; each number is a small
 * client CountUp (count-up.tsx) that counts from `countFrom` to the value when the band scrolls
 * into view, one after the other (120ms apart).
 *
 * One paper band (max 1160px) holding a <dl>; the 1px white lines between cells are the white
 * <dl> ground showing through a 1px grid gap. 2 x 2 on phones and tablets, 4 across from 1024px.
 *
 * Semantics: each cell is <div><dt>label</dt><dd>value</dd></div> (valid <dl> grouping), and
 * flex-col-reverse paints the value above its label (justify-end keeps the pair at the top, so
 * numbers line up across a row whatever the label length). The icon lives inside the <dt> (only dt/dd
 * may be children of a <dl> group) and is positioned against the cell: above the number on
 * phones, to its left from 640px, as on the "version 2" board.
 *
 * Figures come from EBM's current site; EBM to confirm before launch (src/content/home.ts).
 */

/** Every home icon key, so a figure can use any of them; GraduationCap is the highlights'
 *  diploma icon, so the teachers figure uses BadgeCheck to avoid repeating it on the page. */
const icons: Record<HomeIcon, LucideIcon> = {
  diploma: GraduationCap,
  outdoor: Sprout,
  admissions: CalendarCheck,
  pupils: Users,
  teachers: BadgeCheck,
  campus: Building2,
  founded: CalendarDays,
}

export function Figures() {
  return (
    <section aria-label="Les EBM en chiffres" className="py-section">
      <Container>
        <dl className="mx-auto grid max-w-[1160px] grid-cols-2 gap-px bg-white lg:grid-cols-4">
          {home.figures.map((figure, index) => {
            const Icon = icons[figure.icon]
            return (
              <div
                key={figure.label}
                className="relative flex min-w-0 flex-col-reverse justify-end bg-paper px-5 pt-[76px] pb-6 sm:py-9 sm:pr-8 sm:pl-[84px] lg:pr-6 lg:pl-[74px] xl:pr-8 xl:pl-[84px]"
              >
                <dt className="text-sm leading-[1.4] text-ink-soft">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.4}
                    className="absolute top-6 left-5 size-9 text-charcoal sm:top-9 sm:left-8 lg:left-6 xl:left-8"
                  />
                  {figure.label}
                </dt>
                <dd className="text-[34px] leading-[1.1] font-bold text-terracotta tabular-nums sm:text-[42px]">
                  {figure.countFrom === undefined ? (
                    figure.value
                  ) : (
                    <CountUp value={figure.value} from={figure.countFrom} delay={index * 120} />
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </Container>
    </section>
  )
}
