import Image from 'next/image'
import Link from 'next/link'

import { SectionHeading } from '@/components/home/emphasis'
import { PageActions, ReviewNote } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { campuses } from '@/content/campuses'
import { outdoorsPage, schoolImages } from '@/content/migration/school'
import { routes } from '@/lib/routes'

import styles from './outdoor.module.css'

/*
 * L'école du dehors (/ecole-du-dehors), 25 Oct 2026. The title follows Ayoub's mock-up of 30 Oct
 * 2026 ("L'école" beside a clay pill holding "du dehors"); the rest of the 25 Oct direction stands.
 * Originally: Ayoub: simple and clean, in the home page's
 * branding, made with the design-taste skill. Direction dealt: "The sentence is the layout"
 * (brand palette and type kept). The idea: the children in the garden sit inside the title, where
 * a word would be ("L'école [photo] du dehors"), then the same photograph opens wide below. Every
 * later section repeats one grammar: a short statement on the left, its evidence on the right.
 * The heavy parts of the dealt sheet (pinned scenes, full-screen verbs) are left out on purpose.
 * Each section takes its own arrangement (statement and list; title over a row of figures; photo
 * leading the story; title and text over the open points; text beside a large photo), so no two
 * neighbours share a layout. Headings use the home's SectionHeading voice. Same content as the migration pass. Server
 * Component, no client JS.
 */

const [introduction, launch] = outdoorsPage.introduction

export function OutdoorsPage() {
  const page = outdoorsPage
  const campusPhoto = campuses.casablanca.image

  return (
    <>
      {/* ---- The sentence, with the garden inside it ------------------------------------------ */}
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
          {/* Ayoub's mock-up of 30 Oct 2026: "du dehors" inside a Fired Clay pill, two lighter
              pills fanning out behind it (the home band 5's circles), the buttons right under. */}
          <h1 id="page-title" className={styles.sentence}>
            L’école{' '}
            <span className={styles.pill}>
              <span aria-hidden="true" className={styles.pillBack} />
              <span aria-hidden="true" className={styles.pillMid} />
              <em className={styles.pillFront}>du dehors</em>
            </span>
          </h1>
          <div className={styles.actions}>
            <ButtonLink href={`${routes.reserverVisite}?campus=casablanca`} size="lg">
              Demander une visite
            </ButtonLink>
            <ButtonLink href={`${routes.contact}?campus=casablanca`} variant="outline-dark" size="lg">
              Contacter le campus
            </ButtonLink>
          </div>
        </Container>
        {/* The window opens: the same photograph, wide. */}
        <Container size="wide" className={styles.wideWrap}>
          <figure className={styles.wide}>
            <Image
              src={schoolImages.outdoor.src}
              alt={schoolImages.outdoor.alt}
              fill
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="object-cover"
              style={{ objectPosition: '50% 66%' }}
            />
          </figure>
        </Container>
      </section>

      {/* ---- The approach ------------------------------------------------------------------- */}
      <section id="approche" aria-labelledby="approche-title" className={styles.section}>
        <Container className={styles.pair}>
          <div>
            <SectionHeading id="approche-title" text="La nature prolonge *la classe*" className="reveal" />
            <p className={`${styles.text} reveal-2`}>{introduction}</p>
          </div>
          <ul role="list" className={styles.list}>
            {page.principles.map((item) => (
              <li key={item.title} className="reveal-2">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- The figures: the title on top, three figures across the width ------------------ */}
      <section id="terrain" aria-labelledby="terrain-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <SectionHeading id="terrain-title" text="Un espace *à part entière*" className="reveal" />
          <dl className={styles.figures}>
            {[
              { value: '1,5', unit: 'hectare', label: 'd’école du dehors, dans l’enceinte du campus' },
              { value: '7,5', unit: 'hectares', label: 'de campus à Dar Bouazza : l’école du dehors en occupe un cinquième' },
              { value: '2 à 7', unit: 'ans', label: 'l’âge des enfants du premier déploiement, annoncé en 2024' },
            ].map((row) => (
              <div key={row.value} className="reveal-2">
                <dt className="sr-only">
                  {row.value} {row.unit}
                </dt>
                <dd>
                  <span className={styles.value} aria-hidden="true">
                    {row.value}
                  </span>
                  <span className={styles.unit} aria-hidden="true">
                    {row.unit}
                  </span>
                  <span className={styles.caption}>{row.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---- The launch: the photograph leads, the story beside it ------------------------------ */}
      <section aria-labelledby="lancement-title" className={styles.section}>
        <Container className={styles.launch}>
          <figure className={`${styles.photo} reveal`}>
            <span className={styles.photoFrame}>
              <Image
                src={schoolImages.outdoorLaunch.src}
                alt={schoolImages.outdoorLaunch.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </span>
            <figcaption>Le lancement du projet, relaté dans un article publié le 12 janvier 2024.</figcaption>
          </figure>
          <div className={styles.launchCopy}>
            <SectionHeading id="lancement-title" text="Un projet qui *a pris racine*" className="reveal" />
            <p className={`${styles.text} reveal-2`}>{launch}</p>
          </div>
        </Container>
      </section>

      {/* ---- The sessions: title and text side by side, the open points below -------------------- */}
      <section id="seances" aria-labelledby="seances-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <div className={styles.split}>
            <SectionHeading id="seances-title" text="Comment se déroule *une séance*" className="reveal" />
            <p className={`${styles.text} reveal-2`}>{page.session.text}</p>
          </div>
          <div className={styles.notes}>
            <ReviewNote title="Le programme de cette année">{page.session.gap}</ReviewNote>
            <ReviewNote title="Témoignages et vidéos à recueillir">{page.voicesGap}</ReviewNote>
          </div>
        </Container>
      </section>

      {/* ---- The place ---------------------------------------------------------------------- */}
      <section id="lieu" aria-labelledby="lieu-title" className={styles.section}>
        <Container className={styles.place}>
          <div>
            <SectionHeading id="lieu-title" text="À Dar Bouazza, *au sein du campus*" className="reveal" />
            <p className={`${styles.text} reveal-2`}>{page.location.text}</p>
            <Link href={`${routes.campusCasablanca}#acces`} className={styles.textLink}>
              Le campus et ses accès
            </Link>
            <p className={styles.small}>{page.events}</p>
          </div>
          <figure className={`${styles.photo} reveal-2`}>
            <span className={styles.photoFrame}>
              <Image
                src={campusPhoto.src}
                alt={campusPhoto.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={campusPhoto.position ? { objectPosition: campusPhoto.position } : undefined}
              />
            </span>
          </figure>
        </Container>
      </section>

      <PageActions
        title="Échanger avec l’équipe de Casablanca"
        text="Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles."
        primary={{ label: 'Contacter le campus', href: `${routes.contact}?campus=casablanca` }}
        secondary={{ label: 'Demander une visite', href: `${routes.reserverVisite}?campus=casablanca` }}
      />
    </>
  )
}
