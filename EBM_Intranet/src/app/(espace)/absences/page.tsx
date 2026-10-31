import type { Metadata } from 'next'

import { coverSlots, duties, openCover, people, person, sampleNow, sampleUser, absences } from '@/data/sample'
import { longDate, span } from '@/lib/format'
import { CoverCard } from '@/components/home/cover-card'
import { Page } from '@/components/ui/page'
import { Row, Section } from '@/components/ui/section'

export const metadata: Metadata = { title: 'Absences' }

/*
 * Absences: today's cover, from what still needs someone to what is settled. The open slots come
 * first as cards (with the button when you are free), then the cover already arranged, then the
 * duty rota. The reason for an absence is never shown.
 */
export default function AbsencesPage() {
  const now = sampleNow
  const meId = people.find((p) => p.email === sampleUser.email)?.id
  const covered = coverSlots.filter((s) => s.by !== null).sort((a, b) => a.from - b.from)

  return (
    <Page title="Absences" subtitle={`${longDate(now)} · ${absences.length} collègues absents`}>
      {openCover.length ? (
        <section aria-labelledby="a-pourvoir">
          <h2 id="a-pourvoir" className="text-title font-semibold">
            À pourvoir
          </h2>
          <div className="mt-2.5 grid gap-3">
            {openCover.map((slot, i) => (
              <CoverCard key={`${slot.absence.person}-${slot.from}`} slot={slot} id={`ouvert-${i}`} level="h3" />
            ))}
          </div>
        </section>
      ) : null}

      <Section id="assures" title="Remplacements assurés" footer="Le motif d’une absence n’est jamais affiché.">
        {covered.map((slot) => {
          const absent = person(slot.absence.person)
          return (
            <Row key={`${slot.absence.person}-${slot.from}`}>
              <span className="min-w-0 flex-1">
                <span className="block truncate">{slot.absence.group}</span>
                <span className="block truncate text-sub text-secondary">
                  <span className="num">{span(slot.from, slot.to)}</span> · {absent.name}
                  {slot.absence.kind === 'formation' ? ', en formation' : ''}
                </span>
              </span>
              <span className="shrink-0 text-right text-sub">
                <span className="block">{person(slot.by!).name}</span>
                {slot.note ? <span className="block text-secondary">{slot.note}</span> : null}
              </span>
            </Row>
          )
        })}
      </Section>

      <Section id="surveillances" title="Surveillances du jour">
        {duties.map((duty) => (
          <Row key={duty.from}>
            <span className="min-w-0 flex-1">
              <span className="block truncate">{duty.label}</span>
              <span className="block truncate text-sub text-secondary">
                <span className="num">{span(duty.from, duty.to)}</span> · {duty.place}
              </span>
            </span>
            <span className="shrink-0 text-right text-sub">
              {duty.people.map((id) => (
                <span key={id} className={`block ${id === meId ? 'font-semibold text-accent-text' : ''}`}>
                  {id === meId ? 'Vous' : person(id).name}
                </span>
              ))}
            </span>
          </Row>
        ))}
      </Section>
    </Page>
  )
}
