import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { announcements, event } from '@/data/sample'
import { dayAndTime } from '@/lib/format'
import { Page } from '@/components/ui/page'
import { RowLink, Section } from '@/components/ui/section'

/*
 * One announcement: who and when under its title, the text on one white card, and the event it
 * is about, if any, as a row into the agenda.
 */
export function generateStaticParams() {
  return announcements.map((a) => ({ id: a.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return { title: announcements.find((a) => a.id === id)?.title }
}

export default async function AnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = announcements.find((a) => a.id === id)
  if (!item) notFound()
  const about = item.event ? event(item.event) : null

  return (
    <Page
      title={item.title}
      subtitle={`${item.from} · ${dayAndTime(new Date(item.at))}`}
      back={{ label: 'Annonces', href: '/annonces' }}
    >
      <article className="grid gap-4 rounded-card bg-card p-4 text-[17px] leading-[26px] lg:p-6 lg:text-[15px] lg:leading-6">
        {item.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </article>

      {about ? (
        <Section id="evenement" title="Dans l’agenda">
          <RowLink href="/agenda">
            <span className="min-w-0 flex-1">
              <span className="block truncate">{about.title}</span>
              <span className="block truncate text-sub text-secondary">
                {dayAndTime(new Date(about.at), !about.allDay)} · {about.place}
              </span>
            </span>
          </RowLink>
        </Section>
      ) : null}
    </Page>
  )
}
