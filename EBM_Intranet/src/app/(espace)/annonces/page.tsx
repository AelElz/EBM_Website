import type { Metadata } from 'next'

import { announcements, sampleNow } from '@/data/sample'
import { ago } from '@/lib/format'
import { Page } from '@/components/ui/page'
import { RowLink, Section } from '@/components/ui/section'

export const metadata: Metadata = { title: 'Annonces' }

/*
 * Annonces, as in Mail: unread first, then the rest. Each row shows who wrote it, when, and the
 * first two lines of the text; it opens the announcement.
 */
export default function AnnouncementsPage() {
  const now = sampleNow
  const unread = announcements.filter((a) => !a.read)
  const read = announcements.filter((a) => a.read)

  const rows = (items: typeof announcements) =>
    items.map((item) => (
      <RowLink key={item.id} href={`/annonces/${item.id}`} top>
        <span aria-hidden="true" className={`mt-1.5 size-2 shrink-0 rounded-full ${item.read ? '' : 'bg-accent'}`} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-3">
            <span className={`min-w-0 flex-1 truncate ${item.read ? '' : 'font-semibold'}`}>{item.title}</span>
            <span className="num shrink-0 text-sub text-secondary">{ago(new Date(item.at), now)}</span>
          </span>
          <span className="block text-sub text-secondary">{item.from}</span>
          <span className="mt-0.5 line-clamp-2 text-sub text-secondary">{item.body[0]}</span>
        </span>
      </RowLink>
    ))

  return (
    <Page title="Annonces" subtitle={unread.length ? `${unread.length} non lues` : 'Tout est lu'}>
      {unread.length ? (
        <Section id="non-lues" title="Non lues" separatorInset={36}>
          {rows(unread)}
        </Section>
      ) : null}
      <Section id="lues" title="Déjà lues" separatorInset={36}>
        {rows(read)}
      </Section>
    </Page>
  )
}
