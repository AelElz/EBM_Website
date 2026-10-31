import { bell, type Duty, type Lesson } from '@/data/sample'
import { clock } from '@/lib/format'

import { Section } from '@/components/ui/section'

/*
 * "Votre journée": your lessons and your duty as one list in time order, like a calendar's day
 * view. The next item has its time in the tint. The footnote names your free periods.
 */
export function MyDay({ lessons, duty, now }: { lessons: Lesson[]; duty?: Duty; now: number }) {
  const items = [
    ...lessons.map((lesson) => {
      const slot = bell.find((b) => b.code === lesson.slot)!
      return { from: slot.from, to: slot.to, title: lesson.group, detail: `Salle ${lesson.room}` }
    }),
    ...(duty ? [{ from: duty.from, to: duty.to, title: 'Surveillance', detail: duty.place }] : []),
  ].sort((a, b) => a.from - b.from)

  const next = items.find((item) => item.to > now)
  const free = bell.filter(
    (b) => b.kind === 'period' && !items.some((item) => item.from < b.to && b.from < item.to),
  )

  return (
    <Section
      id="journee"
      title="Votre journée"
      separatorInset={84}
      footer={
        free.length
          ? `Libre à ${free
              .map((b) => clock(b.from))
              .join(', ')
              .replace(/, ([^,]*)$/, ' et $1')}.`
          : undefined
      }
    >
      {items.map((item) => {
        const isNext = item === next
        return (
          <li key={item.from} className="flex min-h-11 items-center gap-3 px-4 py-2.5">
            <span className={`num w-14 shrink-0 ${isNext ? 'font-semibold text-accent-text' : 'text-secondary'}`}>
              {clock(item.from)}
              {isNext ? <span className="sr-only"> (à suivre)</span> : null}
            </span>
            <span className="min-w-0 flex-1 truncate">{item.title}</span>
            <span className="shrink-0 text-sub text-secondary">{item.detail}</span>
          </li>
        )
      })}
    </Section>
  )
}
