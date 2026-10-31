import { freeFor, myLessons, person, coverCoordinator, type Absence } from '@/data/sample'
import { span } from '@/lib/format'

import { CoverOffer } from './cover-offer'

/*
 * A class without cover. When the signed-in teacher is free at that time, the card carries the
 * screen's one filled button; otherwise it says who is handling it.
 */
export function CoverCard({
  slot,
  id,
  level = 'h2',
}: {
  slot: { from: number; to: number; absence: Absence }
  id: string
  /** h3 when the card sits under a section title, which then also replaces the card's label. */
  level?: 'h2' | 'h3'
}) {
  const Heading = level
  const coordinator = person(coverCoordinator)
  const free = freeFor(myLessons, slot.from, slot.to)
  const absent = person(slot.absence.person)

  return (
    <div className="flex flex-col gap-4 rounded-card bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        {level === 'h2' ? <p className="text-foot font-semibold text-accent-text">Remplacement à pourvoir</p> : null}
        <Heading id={id} className={`text-[17px] leading-[22px] font-semibold ${level === 'h2' ? 'mt-0.5' : ''}`}>
          {slot.absence.group}, <span className="num whitespace-nowrap">{span(slot.from, slot.to)}</span>
        </Heading>
        <p className="mt-0.5 text-sub text-secondary">
          {free ? 'Vous êtes libre à ces heures-là.' : `À la place de ${absent.name}. ${coordinator.name} s’en occupe.`}
        </p>
      </div>
      {free ? <CoverOffer coordinator={coordinator.name} /> : null}
    </div>
  )
}
