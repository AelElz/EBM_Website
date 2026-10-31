import type { Metadata } from 'next'
import Link from 'next/link'

import {
  absences,
  announcements,
  coveredCount,
  duties,
  events,
  freeFor,
  myLessons,
  openCover,
  people,
  sampleNow,
} from '@/data/sample'
import { longDate, minutesOfDay } from '@/lib/format'
import { getStaffUser } from '@/lib/session'
import { Agenda } from '@/components/home/agenda'
import { Announcements } from '@/components/home/announcements'
import { CoverCard } from '@/components/home/cover-card'
import { MyDay } from '@/components/home/my-day'
import { Page } from '@/components/ui/page'

export const metadata: Metadata = { title: 'Accueil' }

/*
 * The staff home, the page shown after Google sign-in, in the Apple manner (apple-design skill):
 * a large title, then only what the day needs, as grouped lists on white cards.
 *
 *   1. the one thing waiting on you (a class without cover while you are free), with its button
 *   2. Votre journée: your lessons and duty, in time order
 *   3. Annonces and Agenda, three rows each
 *
 * One column on phones; from 1280px two columns, your day on the left and the school's news on
 * the right, so everything is on the first screen.
 */
export default async function HomePage() {
  // Sample moment; with live data this is `new Date()`.
  const now = sampleNow
  const user = (await getStaffUser())!
  const meId = people.find((p) => p.email === user.email)?.id ?? ''
  const nowMinutes = minutesOfDay(now)

  const myDuty = duties.find((d) => d.people.includes(meId))
  const takeable = openCover.find((slot) => freeFor(myLessons, slot.from, slot.to))

  return (
    <Page title={`Bonjour, ${user.givenName}`} subtitle={longDate(now)} wide>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:items-start xl:gap-x-10">
        <div className="grid min-w-0 grid-cols-1 gap-8">
          {takeable ? (
            <section aria-labelledby="remplacement">
              <CoverCard slot={takeable} id="remplacement" />
              <p className="mt-2 px-4 text-foot text-secondary">
                {absences.length} collègues absents aujourd’hui, {coveredCount} créneaux déjà assurés.{' '}
                <Link href="/absences" className="text-accent-text hover:underline">
                  Voir les absences
                </Link>
              </p>
            </section>
          ) : null}

          <MyDay lessons={myLessons} duty={myDuty} now={nowMinutes} />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-8">
          <Announcements items={announcements} now={now} />
          <Agenda items={events} now={now} />
        </div>
      </div>
    </Page>
  )
}
