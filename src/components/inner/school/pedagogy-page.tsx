import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PageActions, ReviewNote, SectionNav } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { pedagogyPage, schoolImages, schoolLevels } from '@/content/migration/school'
import { routes } from '@/lib/routes'

import { EditorialHero } from './editorial-hero'
import shared from './editorial.module.css'
import { LevelTabs } from './level-tabs'
import styles from './pedagogy.module.css'

/*
 * Pédagogie (/pedagogie), the 25 Oct 2026 design pass (Ayoub: "enhance pedagogie"), in the same
 * language as Le réseau: the shared editorial hero and key figures, the four principles under
 * clay rules, the three levels as tabs with a tall photo, the outdoor school on an olive band,
 * the languages as a path through the school years, the teachers' voice as a short note, and the
 * follow-up questions as cards that open. Same content as the migration pass. Server Component;
 * the level tabs are the only client island (level-tabs.tsx).
 */

const admissionsActions = {
  primary: { label: 'Candidater', href: routes.candidater },
  secondary: { label: 'Demander une visite', href: routes.reserverVisite },
}
const visitQualification =
  'Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles.'

export function PedagogyPage() {
  const page = pedagogyPage

  return (
    <>
      <EditorialHero
        title={page.title}
        intro={page.intro}
        trail={[{ label: 'Pédagogie' }]}
        image={schoolImages.sciences}
        facts={page.keyFacts}
        actions={
          <>
            <ButtonLink href="#niveaux" size="lg">
              Les trois niveaux
            </ButtonLink>
            <ButtonLink href={routes.ecoleDuDehors} variant="outline-dark" size="lg">
              L’école du dehors
            </ButtonLink>
          </>
        }
      />

      <SectionNav
        items={[
          { label: 'Notre approche', href: '#approche' },
          { label: 'Les trois niveaux', href: '#niveaux' },
          { label: 'Les langues', href: '#langues' },
          { label: 'L’accompagnement', href: '#accompagnement' },
        ]}
      />

      {/* ---- The approach: four principles under clay rules ----------------------------- */}
      <section id="approche" aria-labelledby="approche-title" className={styles.approach}>
        <Container className={styles.approachGrid}>
          <h2 id="approche-title" className={`${shared.title} reveal`}>
            L’élève agit, comprend et progresse
          </h2>
          <ul role="list" className={styles.principles}>
            {page.principles.map((item, index) => (
              <li key={item.title} className={index % 2 ? 'reveal-3' : 'reveal-2'}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- The three levels ------------------------------------------------------------ */}
      <section id="niveaux" aria-labelledby="niveaux-title" className={styles.levels}>
        <Container>
          <h2 id="niveaux-title" className={`${shared.title} reveal`}>
            À chaque étape, des objectifs clairs
          </h2>
          <div className={styles.tabsWrap}>
            <LevelTabs levels={schoolLevels.map(({ id, label }) => ({ id, label }))}>
              {schoolLevels.map((level) => (
                <div key={level.id} className={styles.level}>
                  <div className={styles.levelCopy}>
                    <p className={styles.ages}>{level.ages}</p>
                    <h3>{level.title}</h3>
                    <p className={styles.levelText}>{level.text}</p>
                    <dl className={styles.levelFacts}>
                      <div>
                        <dt>Ce que l’enfant développe</dt>
                        <dd>
                          <ul role="list">
                            {level.objectives.map((objective) => (
                              <li key={objective}>{objective.replace(/\.$/, '')}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt>Les apprentissages</dt>
                        <dd>{level.subjects}</dd>
                      </div>
                      <div>
                        <dt>Les repères du parcours</dt>
                        <dd>{level.milestone}</dd>
                      </div>
                    </dl>
                  </div>
                  <figure className={styles.levelPhoto}>
                    <Image
                      src={level.image.src}
                      alt={level.image.alt}
                      fill
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-cover"
                    />
                  </figure>
                </div>
              ))}
            </LevelTabs>
          </div>
          <div className={styles.note}>
            <ReviewNote title="Certificats et programme : points à valider">
              {page.diplomaGap} Le détail des niveaux ouverts à Rabat, des options actuelles et des journées types par niveau reste à confirmer avec EBM.
            </ReviewNote>
          </div>
        </Container>
      </section>

      {/* ---- The outdoor school, on olive ------------------------------------------------ */}
      <section aria-labelledby="dehors-title" className={styles.outdoor}>
        <Container className={styles.outdoorGrid}>
          <figure className={`${styles.outdoorPhoto} reveal`}>
            <Image
              src={schoolImages.outdoor.src}
              alt={schoolImages.outdoor.alt}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              style={{ objectPosition: schoolImages.outdoor.position }}
            />
          </figure>
          <div>
            <h2 id="dehors-title" className={`${shared.title} reveal`}>
              {page.outdoorTitle}
            </h2>
            <p className={`${styles.outdoorText} reveal-2`}>{page.outdoorText}</p>
            <ButtonLink href={routes.ecoleDuDehors} variant="light" size="lg" className="mt-8">
              Découvrir l’école du dehors
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ---- Languages, as a path through the years -------------------------------------- */}
      <section id="langues" aria-labelledby="langues-title" className={styles.languages}>
        <Container>
          <div className={styles.languagesIntro}>
            <h2 id="langues-title" className={`${shared.title} reveal`}>
              Des langues pour rencontrer le monde
            </h2>
            <p className="reveal-2">{page.languageIntro}</p>
          </div>
          <ol className={styles.languagePath}>
            <li className="reveal-2">
              <p className={styles.when}>Dès 2 ans</p>
              <h3>Français</h3>
              <p>La langue d’enseignement, de la classe d’accueil au CESS.</p>
            </li>
            {page.languages.map((language) => (
              <li key={language.title} className="reveal-2">
                <p className={styles.when}>{language.title}</p>
                <p>{language.text}</p>
              </li>
            ))}
          </ol>
          <Link href={`${routes.grandir}#temps-forts`} className={shared.textLink}>
            Un exemple d’ouverture à Rabat, en octobre 2024
          </Link>
        </Container>
      </section>

      {/* ---- The teachers' voice: still to come ------------------------------------------ */}
      <section id="parole-enseignant" aria-labelledby="parole-title" className={styles.voices}>
        <Container className={styles.voicesGrid}>
          <h2 id="parole-title" className={shared.title}>
            La parole aux enseignants
          </h2>
          <ReviewNote title="Des médias à compléter">{page.videoGap}</ReviewNote>
        </Container>
      </section>

      {/* ---- Follow-up questions, as cards that open ------------------------------------- */}
      <section id="accompagnement" aria-labelledby="accompagnement-title" className={styles.support}>
        <Container className={styles.supportGrid}>
          <div>
            <h2 id="accompagnement-title" className={`${shared.title} reveal`}>
              Accompagner la progression
            </h2>
            <Link href={routes.faq} className={shared.textLink}>
              Toutes les questions des familles
            </Link>
          </div>
          <div className={styles.questions}>
            {page.supports.map((item) => (
              <details key={item.question} className={styles.question}>
                <summary>
                  {item.question}
                  <Plus aria-hidden="true" strokeWidth={2} className={styles.plus} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <PageActions title="Trouver le bon cadre pour votre enfant" text={visitQualification} {...admissionsActions} />
    </>
  )
}
