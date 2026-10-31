import { Check } from 'lucide-react'
import Image from '@/cms/image'
import Link from '@/cms/link'

import { PageActions, ReviewNote, SectionNav } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { migratedCampuses } from '@/content/migration/campuses'
import { networkPage, schoolImages } from '@/content/migration/school'
import { routes } from '@/lib/routes'

import { EditorialHero } from './editorial-hero'
import styles from './editorial.module.css'

/*
 * Le réseau EBM (/le-reseau), the 25 Oct 2026 design pass (Ayoub: "enhance"). Same content as the
 * migration pass; the page now speaks the home page's language instead of a stack of generic
 * blocks: a hero with a large photo and four key figures, the director's motto set
 * large beside his portrait, the values on a Fired Clay band, the Belgian framework as a
 * checklist, the history as a timeline on an olive band, the two campuses as photo cards, the
 * partners on a charcoal band. Server Component, no client JS; entrances use the global `reveal`
 * classes (scroll-driven CSS, nothing hidden without support or with reduced motion).
 */

const admissionsActions = {
  primary: { label: 'Candidater', href: routes.candidater },
  secondary: { label: 'Demander une visite', href: routes.reserverVisite },
}
const visitQualification =
  'Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles.'

export function NetworkPage() {
  const { director, mission, values, framework, history, keyFacts } = networkPage

  return (
    <>
      <EditorialHero
        title={networkPage.title}
        intro={networkPage.intro}
        trail={[{ label: networkPage.title }]}
        image={schoolImages.network}
        facts={keyFacts}
        actions={
          <>
            <ButtonLink href={routes.campus} size="lg">
              Découvrir les deux campus
            </ButtonLink>
            <ButtonLink href={routes.pedagogie} variant="outline-dark" size="lg">
              Notre pédagogie
            </ButtonLink>
          </>
        }
      />

      <SectionNav
        items={[
          { label: 'Notre projet', href: '#projet' },
          { label: 'Le cadre belge', href: '#cadre-belge' },
          { label: 'Notre histoire', href: '#histoire' },
          { label: 'Les campus', href: '#equipes' },
        ]}
      />

      {/* ---- The director's word ------------------------------------------------------- */}
      <section id="direction" aria-labelledby="direction-title" className={styles.director}>
        <Container className={styles.directorGrid}>
          <figure className={`${styles.portrait} reveal`}>
            <Image
              src={schoolImages.director.src}
              alt={schoolImages.director.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
              style={{ objectPosition: schoolImages.director.position }}
            />
          </figure>
          <div className={styles.directorCopy}>
            <h2 id="direction-title" className={`${styles.title} reveal`}>
              {director.title}
            </h2>
            <blockquote className={`${styles.motto} reveal-2`}>
              <p>{director.quote}</p>
            </blockquote>
            <div className={`${styles.prose} reveal-2`}>
              {director.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className={styles.signature}>
              <span>{director.name}</span>
              {director.role}
            </p>
          </div>
        </Container>
      </section>

      {/* ---- Project and values, on Fired Clay ----------------------------------------- */}
      <section id="projet" aria-labelledby="projet-title" className={styles.values}>
        <Container>
          <div className={styles.valuesIntro}>
            <h2 id="projet-title" className={`${styles.title} reveal`}>
              {mission.title}
            </h2>
            <div className={`${styles.prose} reveal-2`}>
              {mission.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <ul role="list" className={styles.valueList}>
            {values.map((value, index) => (
              <li key={value.title} className={index % 2 ? 'reveal-3' : 'reveal-2'}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- The Belgian framework ----------------------------------------------------- */}
      <section id="cadre-belge" aria-labelledby="cadre-title" className={styles.framework}>
        <Container className={styles.frameworkGrid}>
          <figure className={`${styles.frameworkPhoto} reveal`}>
            <Image
              src={schoolImages.sciences.src}
              alt={schoolImages.sciences.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div>
            <h2 id="cadre-title" className={`${styles.title} reveal`}>
              {framework.title}
            </h2>
            <div className={`${styles.prose} reveal-2`}>
              {framework.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul role="list" className={`${styles.checklist} reveal-3`}>
              {framework.facts.map((fact) => (
                <li key={fact}>
                  <span aria-hidden="true">
                    <Check strokeWidth={2.5} className="size-3.5" />
                  </span>
                  {fact.replace(/\.$/, '')}
                </li>
              ))}
            </ul>
            <Link href={routes.pedagogie} className={styles.textLink}>
              Comprendre notre pédagogie
            </Link>
          </div>
        </Container>
      </section>

      {/* ---- History, as a timeline on olive -------------------------------------------- */}
      <section id="histoire" aria-labelledby="histoire-title" className={styles.history}>
        <Container>
          <h2 id="histoire-title" className={`${styles.title} reveal`}>
            Les étapes du réseau
          </h2>
          <ol className={styles.timeline}>
            {history.map((event) => (
              <li key={event.date} className="reveal-2">
                <span aria-hidden="true" className={styles.dot} />
                <p className={styles.year}>{event.date.slice(-4)}</p>
                <time className={styles.date}>{event.date}</time>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- The two campuses ----------------------------------------------------------- */}
      <section id="equipes" aria-labelledby="equipes-title" className={styles.campuses}>
        <Container>
          <h2 id="equipes-title" className={`${styles.title} reveal`}>
            Des équipes, deux campus
          </h2>
          <ul role="list" className={styles.campusList}>
            {migratedCampuses.map((campus) => (
              <li key={campus.slug} className="reveal-2">
                <Link href={`${campus.route}#acces`} className={styles.campusCard}>
                  <span className={styles.campusPhoto}>
                    <Image
                      src={campus.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      style={campus.image.position ? { objectPosition: campus.image.position } : undefined}
                    />
                  </span>
                  <span className={styles.campusText}>
                    <span className={styles.campusName}>{campus.title}</span>
                    <span>Échanger avec l’équipe de {campus.city}, à {campus.district}.</span>
                    <span className={styles.campusLink}>Rencontrer l’équipe</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.note}>
            <ReviewNote title="Le réseau en version de travail">
              {networkPage.teamGap} La fonction actuelle du directeur du réseau et la republication du message restent à valider.
            </ReviewNote>
          </div>
        </Container>
      </section>

      {/* ---- Partners, on charcoal ------------------------------------------------------ */}
      <section id="partenaires" aria-labelledby="partenaires-title" className={styles.partners}>
        <Container className={styles.partnersGrid}>
          <div>
            <h2 id="partenaires-title" className={styles.title}>
              Un réseau ancré dans la coopération
            </h2>
            <p>{networkPage.partnersIntro}</p>
          </div>
          <Image
            src="/brand/partners-white.png"
            width={856}
            height={170}
            className={styles.partnerLogos}
            alt="Fédération Wallonie-Bruxelles, Wallonie-Bruxelles International et AEBE : les logos partenaires fournis par EBM."
          />
        </Container>
      </section>

      <PageActions title="Faire connaissance avec les EBM" text={visitQualification} {...admissionsActions} />

      <section aria-label="Recrutement" className={styles.recruitment}>
        <Container>
          <p>
            Envie de rejoindre nos équipes{' '}?{' '}
            <Link href={routes.recrutement} className={styles.textLink}>
              Prendre contact pour un recrutement
            </Link>
          </p>
          <p className={styles.small}>Aucune offre non vérifiée n’est présentée comme un poste actuellement ouvert.</p>
        </Container>
      </section>
    </>
  )
}
