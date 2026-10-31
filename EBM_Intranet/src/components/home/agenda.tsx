import type { SchoolEvent } from '@/data/sample'
import { clock, dateParts, daysBetween, inDays, minutesOfDay } from '@/lib/format'

import { RowLink, Section } from '@/components/ui/section'

/** What is coming, nearest first, each with its date as on a calendar page. */
export function Agenda({ items, now, limit = 3 }: { items: SchoolEvent[]; now: Date; limit?: number }) {
  const upcoming = items.filter((e) => new Date(e.at) >= now)

  return (
    <Section id="agenda" title="Agenda" action={{ label: 'Tout voir', href: '/agenda' }} separatorInset={68}>
      {upcoming.slice(0, limit).map((item) => {
        const date = new Date(item.at)
        const { weekday, day } = dateParts(date)
        return (
          <RowLink key={item.id} href="/agenda">
            <span className="w-10 shrink-0 text-center">
              <span className="block text-[11px] leading-[13px] font-semibold text-accent-text">{weekday}</span>
              <span className="num block text-title">{day}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate">{item.title}</span>
              <span className="block truncate text-sub text-secondary">
                {item.allDay ? 'Toute la journée' : <span className="num">{clock(minutesOfDay(date))}</span>} · {item.place}
              </span>
            </span>
            <span className="shrink-0 self-start pt-px text-sub text-secondary">{inDays(daysBetween(now, date))}</span>
          </RowLink>
        )
      })}
    </Section>
  )
}
