import Image from 'next/image'
import type { CSSProperties } from 'react'

import { PageActions, SectionNav } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { schoolImages } from '@/content/migration/school'
import { parcoursOverview, parcoursStages } from '@/content/parcours'
import { pedagogie } from '@/content/pedagogie'
import { routes } from '@/lib/routes'

import { EditorialHero } from './editorial-hero'
import shared from './editorial.module.css'
import { LevelTabs } from './level-tabs'
import styles from './pedagogy.module.css'

/*
 * Pédagogie (/pedagogie), rebuilt on 30 Oct 2026 from EBM's validated `Notre_pédagogie.docx` and
 * `Parcours_scolaire.docx` (content in pedagogie.ts and parcours.ts), in the document's order.
 * Each section opens like the home bands (clay uppercase label, Playfair sentence) and carries
 * the figure the document asks for in its "Traitement graphique" notes:
 *   the framework: three sober markers side by side;
 *   the way of teaching: the four steps 01 to 04 on one line;
 *   the school path: the four stages as tabs, each with its full text and photo;
 *   the languages: a timeline across the three levels, on olive;
 *   the diplomas: a staircase of three steps, each taller than the last, the diploma on its
 *     landing and the years that lead to it at its foot (data from Ayoub's board
 *     Parcours_scolaire.ai; the board says CEP, the validated text CEB);
 *   autonomy: the three "savoirs" as rings that meet, on Fired Clay.
 * Server Component; the stage tabs are the only client island (level-tabs.tsx). Motion is
 * scroll-driven CSS (pedagogy.module.css), complete and still without support or with reduced
 * motion.
 */

const admissionsActions = {
  primary: { label: 'Candidater', href: routes.candidater },
  secondary: { label: 'Demander une visite', href: routes.reserverVisite },
}
const visitQualification =
  'Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles.'

function Rich({ text }: { text: string }) {
  return text.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))
}

function SectionHead({ id, label, title, paragraphs }: { id: string; label: string; title: string; paragraphs: string[] }) {
  return (
    <div className={styles.head}>
      <div>
        <p className={`${styles.label} reveal`}>{label}</p>
        <h2 id={id} className={`${shared.title} ${styles.headTitle} reveal`}>
          {title}
        </h2>
      </div>
      <div className={`${styles.headText} reveal-2`}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Rich text={paragraph} />
          </p>
        ))}
      </div>
    </div>
  )
}

/* "La classe d’accueil" becomes the tab "Classe d’accueil". */
function tabLabel(name: string) {
  const bare = name.replace(/^(La |Le )/, '')
  return bare.charAt(0).toUpperCase() + bare.slice(1)
}

export function PedagogyPage() {
  const { framework, method, path, languages, diplomas, autonomy } = pedagogie

  return (
    <>
      <EditorialHero
        title={pedagogie.title}
        intro={pedagogie.intro}
        trail={[{ label: pedagogie.label }]}
        image={schoolImages.library}
        facts={pedagogie.keyFacts}
        actions={
          <>
            <ButtonLink href="#parcours" size="lg">
              Le parcours scolaire
            </ButtonLink>
            <ButtonLink href="#diplomes" variant="outline-dark" size="lg">
              Les diplômes
            </ButtonLink>
          </>
        }
      />

      <SectionNav
        items={[
          { label: 'Le cadre', href: '#cadre' },
          { label: 'Notre manière d’enseigner', href: '#methode' },
          { label: 'Le parcours', href: '#parcours' },
          { label: 'Les langues', href: '#langues' },
          { label: 'Les diplômes', href: '#diplomes' },
          { label: 'L’autonomie', href: '#autonomie' },
        ]}
      />

      {/* ---- 1. The framework: three sober markers ------------------------------------- */}
      <section id="cadre" aria-labelledby="cadre-title" className={styles.section}>
        <Container>
          <SectionHead id="cadre-title" {...framework} />
          <ul role="list" className={styles.markers}>
            {framework.markers.map((marker) => (
              <li key={marker}>{marker}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- 2. The way of teaching: four steps on one line ----------------------------- */}
      <section id="methode" aria-labelledby="methode-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <SectionHead id="methode-title" {...method} />
          <ol className={styles.steps}>
            {method.steps.map((step, index) => (
              <li key={step.name} className={styles.step} style={{ '--i': index } as CSSProperties}>
                <span aria-hidden="true" className={styles.stepNumber}>
                  {step.number}
                </span>
                <span className={styles.stepName}>{step.name}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- 3. The school path: four stages as tabs ------------------------------------- */}
      <section id="parcours" aria-labelledby="parcours-title" className={styles.section}>
        <Container>
          <SectionHead id="parcours-title" {...path} paragraphs={parcoursOverview} />
          <div className={styles.stagesWrap}>
            <LevelTabs levels={parcoursStages.map(({ id, name }) => ({ id, label: tabLabel(name) }))}>
              {parcoursStages.map((stage) => (
                <div key={stage.id} className={styles.stage}>
                  <div className={styles.stageCopy}>
                    <p className={styles.ages}>
                      {stage.name} ({stage.ages})
                    </p>
                    <h3>{stage.title}</h3>
                    {stage.paragraphs.map((paragraph) => (
                      <p key={paragraph} className={styles.stageText}>
                        {paragraph}
                      </p>
                    ))}
                    <p className={styles.listIntro}>{stage.listIntro}</p>
                    <ul role="list" className={styles.points}>
                      {stage.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <p className={styles.closing}>{stage.closing}</p>
                  </div>
                  <figure className={styles.stagePhoto}>
                    <Image
                      src={stage.photo.src}
                      alt={stage.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover"
                      style={{ objectPosition: stage.photo.position }}
                    />
                  </figure>
                </div>
              ))}
            </LevelTabs>
          </div>
        </Container>
      </section>

      {/* ---- 4. The languages: a timeline across the levels, on olive ------------------- */}
      <section id="langues" aria-labelledby="langues-title" className={`${styles.section} ${styles.olive}`}>
        <Container>
          <SectionHead id="langues-title" {...languages} />
          <ol className={styles.timeline}>
            {languages.timeline.map((step, index) => (
              <li key={step.level} className={styles.timelineStep} style={{ '--i': index } as CSSProperties}>
                <span aria-hidden="true" className={styles.timelineDot} />
                <p className={styles.timelineLevel}>{step.level}</p>
                <p className={styles.timelineText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- 5. The diplomas, a staircase ------------------------------------------------ */}
      <section id="diplomes" aria-labelledby="diplomes-title" className={styles.section}>
        <Container>
          <SectionHead id="diplomes-title" {...diplomas} />
          {/* Three steps that climb to the right, each taller than the last: the diploma lands on
              top, the years that lead to it stand at the foot. */}
          <ol className={styles.stairs}>
            {diplomas.items.map((diploma, index) => (
              <li key={diploma.code} className={styles.stair} style={{ '--i': index } as CSSProperties}>
                <div className={styles.stairTop}>
                  <p className={styles.stairCode}>
                    <abbr title={diploma.name}>{diploma.code}</abbr>
                  </p>
                  <p className={styles.stairName}>{diploma.name}</p>
                </div>
                <div className={styles.stairFoot}>
                  <p className={styles.stairWhen}>{diploma.when}</p>
                  <ul role="list" className={styles.stairYears} aria-label={`Les années jusqu’au ${diploma.code}`}>
                    {diploma.years.map((year) => (
                      <li key={year} data-final={year === diploma.after ? '' : undefined}>
                        {year}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- 6. Autonomy: the three "savoirs", on Fired Clay ------------------------------ */}
      <section id="autonomie" aria-labelledby="autonomie-title" className={`${styles.section} ${styles.clay}`}>
        <Container>
          <SectionHead id="autonomie-title" {...autonomy} />
          <ul role="list" className={styles.savoirs}>
            {autonomy.savoirs.map((savoir, index) => (
              <li key={savoir.name} className={styles.savoir} style={{ '--i': index } as CSSProperties}>
                <h3>{savoir.name}</h3>
                <p>{savoir.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PageActions title="Trouver le bon cadre pour votre enfant" text={visitQualification} {...admissionsActions} />
    </>
  )
}
