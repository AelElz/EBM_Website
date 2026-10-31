import type { Announcement } from '@/data/sample'
import { ago } from '@/lib/format'

import { RowLink, Section } from '@/components/ui/section'

/** The latest announcements, as in Mail: a tinted dot and a heavier title while unread. */
export function Announcements({ items, now, limit = 3 }: { items: Announcement[]; now: Date; limit?: number }) {
  return (
    <Section id="annonces" title="Annonces" action={{ label: 'Tout voir', href: '/annonces' }} separatorInset={36}>
      {items.slice(0, limit).map((item) => (
        <RowLink key={item.id} href={`/annonces/${item.id}`}>
          <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${item.read ? '' : 'bg-accent'}`} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${item.read ? '' : 'font-semibold'}`}>
              {item.title}
              {item.read ? null : <span className="sr-only"> (non lue)</span>}
            </span>
            <span className="block truncate text-sub text-secondary">{item.from}</span>
          </span>
          <span className="num shrink-0 self-start pt-px text-sub text-secondary">{ago(new Date(item.at), now)}</span>
        </RowLink>
      ))}
    </Section>
  )
}
