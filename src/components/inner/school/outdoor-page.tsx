import { ArrowRight } from 'lucide-react'
import Image from '@/cms/image'
import Link from '@/cms/link'
import type { CSSProperties } from 'react'

import { BandHeading } from '@/components/home/bands/band-heading'
import { PageActions } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { campuses } from '@/content/campuses'
import { outdoorsPage, schoolImages } from '@/content/migration/school'
import { routes, visitFor } from '@/lib/routes'

import styles from './outdoor.module.css'

/*
 * L'école du dehors (/ecole-du-dehors), 30 Oct 2026 (Ayoub: "easy, smooth and good", with the
 * Apple design skill). Light grounds, the clay as the one accent, type and space doing the work.
 * As a presentation page it carries its motion in two scroll scenes:
 *   1. the garden opens: the photo starts as a rounded window under the title and widens to the
 *      whole screen while it stays pinned, then the page's sentence rises over it;
 *   2. the statement lights up word by word as it crosses the screen.
 * Then the three principles under three photos of the garden, the area as one fifth of the
 * campus, the first levels, the launch and the place. The title follows Ayoub's mock-up of
 * 30 Oct ("L'école" beside a clay pill holding "du dehors"). Server Component, no client JS:
 * every scene is scroll-driven CSS, complete and still without support or with reduced motion.
 */

function LitWords({ text }: { text: string }) {
  return text.split(/(\s+)/).map((token, index) =>
    /^\s*$/.test(token) ? (
      token
    ) : (
      <span key={index} className={styles.word}>
        {token}
      </span>
    ),
  )
}

export function OutdoorsPage() {
  const page = outdoorsPage
  const campusPhoto = campuses.casablanca.image
  const principlePhotos = [schoolImages.outdoorGroup, schoolImages.outdoorMeadow, schoolImages.outdoorCircle]

  return (
    <>
      {/* ---- The title ------------------------------------------------------------------------ */}
      <section aria-labelledby="page-title" className={styles.hero}>
        <Container>
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href={routes.pedagogie}>Pédagogie</Link>
              </li>
              <li>
                <span aria-current="page">L’école du dehors</span>
              </li>
            </ol>
          </nav>
          <h1 id="page-title" className={styles.sentence}>
            L’école{' '}
            <span className={styles.pill}>
              <span aria-hidden="true" className={styles.pillBack} />
              <span aria-hidden="true" className={styles.pillMid} />
              <em className={styles.pillFront}>du dehors</em>
            </span>
          </h1>
          <div className={styles.actions}>
            <ButtonLink href={visitFor('casablanca')} size="lg">
              Demander une visite
            </ButtonLink>
            <ButtonLink href={`${routes.contact}?campus=casablanca`} variant="outline-dark" size="lg">
              Contacter le campus
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ---- Scene 1: the garden opens to the whole screen ------------------------------------- */}
      <section aria-label="Le jardin de l’école du dehors" className={styles.scene}>
        <div className={styles.sceneStage}>
          <figure className={styles.sceneFrame}>
            <Image
              src={schoolImages.outdoor.src}
              alt={schoolImages.outdoor.alt}
              fill
              sizes="100vw"
              className={`${styles.sceneImage} object-cover`}
              style={{ objectPosition: '50% 66%' }}
            />
            <figcaption className={styles.sceneCaption}>
              <p>{page.intro}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---- Scene 2: the statement lights up ------------------------------------------------- */}
      <section aria-label="Le principe" className={styles.statementBand}>
        <Container>
          <p className={styles.statement}>
            <LitWords text={page.statement} />
          </p>
        </Container>
      </section>

      {/* ---- Three principles under three photos of the garden ------------------------------- */}
      <section aria-labelledby="principes-title" className={styles.section}>
        <Container>
          <BandHeading id="principes-title" label="Apprendre dehors" title="La nature prolonge la classe." className="reveal" />
          <ul role="list" className={styles.principles}>
            {page.principles.map((item, index) => {
              const photo = principlePhotos[index]
              return (
                <li key={item.title} className={styles.principle} style={{ '--i': index } as CSSProperties}>
                  <div className={styles.principlePhoto}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* ---- The ground: one fifth of the campus, the first levels ---------------------------- */}
      <section aria-labelledby="terrain-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <BandHeading id="terrain-title" label="Le terrain" title="Un espace à part entière." className="reveal" />

          <div className={styles.area}>
            <p className={styles.bigFigure}>
              {page.area.outdoor}
              <span className={styles.bigUnit}> ha</span>
            </p>
            <div>
              <p className={styles.areaText}>{page.area.text}</p>
              {/* The campus as five equal plots of 1,5 ha; the first is the garden. */}
              <div className={styles.plots} role="img" aria-label={`${page.area.outdoor} hectare sur ${page.area.campus} : un cinquième du campus`}>
                {[0, 1, 2, 3, 4].map((plot) => (
                  <span key={plot} className={styles.plot} data-garden={plot === 0 ? '' : undefined} />
                ))}
              </div>
              <div className={styles.plotLegend} aria-hidden="true">
                <span>École du dehors · {page.area.outdoor} ha</span>
                <span>Campus · {page.area.campus} ha</span>
              </div>
            </div>
          </div>

          <div className={styles.area}>
            <p className={styles.bigFigure}>
              2–7<span className={styles.bigUnit}> ans</span>
            </p>
            <div>
              <p className={styles.areaText}>{page.firstScope}</p>
              <ol className={styles.levels} aria-label="Les niveaux du premier déploiement">
                {page.firstLevels.map((level, index) => (
                  <li key={level} style={{ '--i': index } as CSSProperties}>
                    {level}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- The launch ---------------------------------------------------------------------- */}
      <section aria-labelledby="lancement-title" className={styles.section}>
        <Container className={styles.split}>
          <figure className={`${styles.photo} reveal`}>
            <Image
              src={schoolImages.outdoorLaunch.src}
              alt={schoolImages.outdoorLaunch.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div>
            <BandHeading id="lancement-title" label="Janvier 2024" title="Un projet qui a pris racine." className="reveal" />
            <p className={`${styles.text} reveal-2`}>{page.launch}</p>
          </div>
        </Container>
      </section>

      {/* ---- The place ------------------------------------------------------------------------ */}
      <section aria-labelledby="lieu-title" className={styles.section}>
        <Container className={styles.split}>
          <div>
            <BandHeading id="lieu-title" label="Le lieu" title="À Dar Bouazza, au sein du campus." className="reveal" />
            <p className={`${styles.text} reveal-2`}>{page.location}</p>
            <Link href={`${routes.campusCasablanca}#acces`} className={styles.textLink}>
              Le campus et ses accès
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </Link>
          </div>
          <figure className={`${styles.photo} reveal-2`}>
            <Image
              src={campusPhoto.src}
              alt={campusPhoto.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={campusPhoto.position ? { objectPosition: campusPhoto.position } : undefined}
            />
          </figure>
        </Container>
      </section>

      <PageActions
        title="Échanger avec l’équipe de Casablanca"
        text="Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles."
        primary={{ label: 'Contacter le campus', href: `${routes.contact}?campus=casablanca` }}
        secondary={{ label: 'Demander une visite', href: visitFor('casablanca') }}
      />
    </>
  )
}
