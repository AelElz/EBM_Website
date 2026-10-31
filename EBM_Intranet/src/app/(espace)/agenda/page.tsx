import type { Metadata } from 'next'

import { events, sampleNow } from '@/data/sample'
import { clock, dateParts, daysBetween, inDays, minutesOfDay } from '@/lib/format'
import { Page } from '@/components/ui/page'
import { Row, Section } from '@/components/ui/section'

export const metadata: Metadata = { title: 'Agenda' }

/*
 * Agenda, as the list view of Calendar: what is coming, grouped into this week, next week, then
 * by month, each event dated as on a calendar page.
 */
function group(date: Date, now: Date) {
  // Monday-based weeks, counted in calendar days from today.
  const days = daysBetween(now, date)
  const today = (now.getDay() + 6) % 7
  const week = Math.floor((days + today) / 7)
  if (week === 0) return 'Cette semaine'
  if (week === 1) return 'Semaine prochaine'
  const month = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'Africa/Casablanca' }).format(date)
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export default function AgendaPage() {
  const now = sampleNow
  const upcoming = events.filter((e) => new Date(e.at) >= now).sort((a, b) => a.at.localeCompare(b.at))
  const groups = new Map<string, typeof upcoming>()
  for (const item of upcoming) {
    const key = group(new Date(item.at), now)
    groups.set(key, [...(groups.get(key) ?? []), item])
  }

  return (
    <Page title="Agenda" subtitle={`${upcoming.length} événements à venir`}>
      {[...groups].map(([label, items], index) => (
        <Section key={label} id={`semaine-${index}`} title={label} separatorInset={68}>
          {items.map((item) => {
            const date = new Date(item.at)
            const { weekday, day } = dateParts(date)
            return (
              <Row key={item.id}>
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
              </Row>
            )
          })}
        </Section>
      ))}
    </Page>
  )
}
