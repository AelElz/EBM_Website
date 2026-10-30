import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SectionHeading } from '@/components/home/emphasis'
import { PageActions, SectionNav } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { campusRequestHref, migratedCampuses, type MigratedCampus } from '@/content/migration/campuses'
import { routes } from '@/lib/routes'

import styles from './campus.module.css'

/*
 * Nos campus (/nos-campus) and each campus (/nos-campus/casablanca, /nos-campus/rabat), the
 * 25 Oct 2026 pass. Ayoub: "the most important pages … better and clean, without too much text or
 * slop". Made with the design-taste skill, in the home page's branding: the home's SectionHeading
 * voice, photographs with the stages' rounded top corners, Riad Paper and olive grounds. Each
 * section answers one question a family has (which campus, what is it like, what is there every
 * day, how to reach it); placeholders with nothing to show (no events yet, the team's word, social
 * links) are left out, and each fact still to confirm is one short line. Same data as the migration
 * pass (src/content/migration/campuses.ts). Server Components, no client JS.
 */

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
      <ol>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Address, phones, e-mails and the map link of one campus, compact. */
function Contacts({ campus, heading = true }: { campus: MigratedCampus; heading?: boolean }) {
  return (
    <div className={styles.contact}>
      {heading ? (
        <h3>
          {campus.city}, <em>{campus.district}</em>
        </h3>
      ) : null}
      <a href={campus.directionsUrl} target="_blank" rel="noopener noreferrer" className={styles.address}>
        <MapPin aria-hidden="true" strokeWidth={1.75} className="size-5 shrink-0" />
        <span>
          {campus.address.join(', ')}
          <span className={styles.mapLink}>
            Voir sur Google Maps <ArrowUpRight aria-hidden="true" className="inline size-4" />
          </span>
          <span className="sr-only"> (nouvel onglet)</span>
        </span>
      </a>
      {campus.contacts.map((service) => (
        <div key={service.email} className={styles.service}>
          <p className={styles.serviceName}>{service.label}</p>
          {service.phones.map((number) => (
            <a key={number.href} href={number.href} className={styles.line}>
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
              {number.display}
              {number.label === 'Mobile' ? <span className={styles.muted}>mobile</span> : null}
            </a>
          ))}
          <a href={`mailto:${service.email}`} className={styles.line}>
            <Mail aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
            {service.email}
          </a>
        </div>
      ))}
    </div>
  )
}

/** The three facts of a campus, short: used on the overview cards and on the campus page. */
function keyFacts(campus: MigratedCampus) {
  return campus.facts.map((fact) => ({ value: fact.value, label: fact.label }))
}

/* ================================================================================================ */
/* Nos campus                                                                                         */
/* ================================================================================================ */

export function CampusHub() {
  return (
    <>
      <section aria-labelledby="page-title" className={styles.hubHero}>
        <Container>
          <Breadcrumb items={[{ label: 'Nos campus' }]} />
          <div className={styles.hubHead}>
            <h1 id="page-title" className={styles.pageTitle}>
              Deux campus, <em>un même projet</em>
            </h1>
            <p>Le même programme belge à Casablanca et à Rabat. Choisissez le cadre de vie de votre famille.</p>
          </div>

          <ul role="list" className={styles.cards}>
            {migratedCampuses.map((campus) => (
              <li key={campus.slug}>
                <Link href={campus.route} className={styles.card}>
                  <span className={styles.cardPhoto}>
                    <Image
                      src={campus.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: campus.image.position }}
                    />
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardName}>
                      <Image src={campus.picto.src} alt="" width={56} height={56} className={styles.picto} />
                      <span>
                        <span className={styles.city}>{campus.city}</span>
                        <span className={styles.district}>{campus.district}</span>
                      </span>
                    </span>
                    <span className={styles.cardIntro}>{campus.intro}</span>
                    <span className={styles.cardFacts}>
                      {keyFacts(campus).map((fact) => (
                        <span key={fact.label}>
                          <strong>{fact.value}</strong>
                          {fact.label}
                        </span>
                      ))}
                    </span>
                    <span className={styles.cardLink}>Découvrir le campus</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- A look inside: two places of each campus ------------------------------------------------- */}
      <section aria-labelledby="interieur-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <SectionHeading id="interieur-title" text="De *l’intérieur*" className="reveal" />
          <ul role="list" className={styles.strip}>
            {migratedCampuses
              .flatMap((campus) =>
                campus.gallery
                  .filter((photo) => photo.src !== campus.feature.image.src)
                  .slice(0, 2)
                  .map((photo) => ({ ...photo, city: campus.city })),
              )
              .map((photo) => (
                <li key={photo.src} className="reveal-2">
                  <span className={styles.stripFrame}>
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </span>
                  <p>
                    <strong>{photo.city}</strong> · {photo.caption.replace(/\.$/, '')}
                  </p>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      {/* ---- At a glance: four rows, no more --------------------------------------------------------- */}
      <section id="comparer" aria-labelledby="comparer-title" className={styles.section}>
        <Container className={styles.glance}>
          <SectionHeading id="comparer-title" text={['En un coup', '*d’œil*']} className="reveal" />
          <table className={`${styles.table} reveal-2`}>
            <caption className="sr-only">Comparer les campus de Casablanca et de Rabat</caption>
            <thead>
              <tr>
                <td />
                {migratedCampuses.map((campus) => (
                  <th key={campus.slug} scope="col">
                    {campus.city}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Quartier</th>
                {migratedCampuses.map((campus) => (
                  <td key={campus.slug}>{campus.district}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Niveaux</th>
                {migratedCampuses.map((campus) => (
                  <td key={campus.slug}>
                    {campus.levels.title}
                    {campus.levels.review ? <span className={styles.muted}> · dernière année à confirmer</span> : null}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Sur place</th>
                {migratedCampuses.map((campus) => (
                  <td key={campus.slug}>
                    {campus.services
                      .filter((service) => !service.summary)
                      .map((service) => service.title)
                      .join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Téléphone</th>
                {migratedCampuses.map((campus) => (
                  <td key={campus.slug}>
                    <a href={campus.contacts[0].phones[0].href} className={styles.tableLink}>
                      {campus.contacts[0].phones[0].display}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Container>
      </section>

      {/* ---- Contacts, side by side ------------------------------------------------------------------- */}
      <section id="acces" aria-labelledby="acces-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <SectionHeading id="acces-title" text="Nous *joindre*" className="reveal" />
          <div className={styles.contactGrid}>
            {migratedCampuses.map((campus) => (
              <Contacts key={campus.slug} campus={campus} />
            ))}
          </div>
        </Container>
      </section>

      <PageActions
        title="Et la prochaine étape ?"
        text="Les visites sont réservées aux familles ayant déposé une candidature."
        primary={{ label: 'Les étapes de l’admission', href: `${routes.admissions}#parcours` }}
        secondary={{ label: 'Candidater', href: routes.candidater }}
      />
    </>
  )
}

/* ================================================================================================ */
/* One campus                                                                                         */
/* ================================================================================================ */

export function CampusDetail({ campus }: { campus: MigratedCampus }) {
  // A photograph already shown beside the campus's story is not repeated in the mosaic.
  const places = campus.gallery.filter((photo) => photo.src !== campus.feature.image.src)

  return (
    <>
      <section aria-labelledby="page-title" className={styles.campusHero}>
        <Container>
          <Breadcrumb items={[{ label: 'Nos campus', href: routes.campus }, { label: campus.city }]} />
          <div className={styles.campusHead}>
            <div className={styles.titleRow}>
              <Image src={campus.picto.src} alt="" width={72} height={72} className={styles.picto} />
              <h1 id="page-title" className={styles.pageTitle}>
                {campus.city}, <em>{campus.district}</em>
              </h1>
            </div>
            <div className={styles.campusLead}>
              <p>{campus.intro}</p>
              <div className={styles.actions}>
                <ButtonLink href={routes.candidater} size="lg">
                  Candidater
                </ButtonLink>
                <ButtonLink href="#acces" variant="outline-dark" size="lg">
                  Contacter le campus
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
        <Container size="wide" className={styles.heroPhotoWrap}>
          <figure className={styles.heroPhoto}>
            <Image
              src={campus.image.src}
              alt={campus.image.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="object-cover"
              style={{ objectPosition: campus.image.position }}
            />
          </figure>
        </Container>
      </section>

      <SectionNav
        items={[
          { label: 'Le campus', href: '#campus' },
          { label: 'Les lieux', href: '#espaces' },
          { label: 'Au quotidien', href: '#vie-pratique' },
          { label: 'Accès et contacts', href: '#acces' },
        ]}
      />

      {/* ---- The campus in a few figures --------------------------------------------------------------- */}
      <section id="campus" aria-labelledby="campus-title" className={styles.section}>
        <Container>
          <div className={styles.split}>
            <SectionHeading id="campus-title" text={`Grandir à *${campus.district}*`} className="reveal" />
            <p className={`${styles.text} reveal-2`}>{campus.description}</p>
          </div>
          <dl className={styles.figures}>
            {keyFacts(campus).map((fact) => (
              <div key={fact.label} className="reveal-2">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
            <div className="reveal-2">
              <dt>Les niveaux</dt>
              <dd className={styles.smallValue}>{campus.levels.title}</dd>
            </div>
          </dl>
          {campus.levels.review ? <p className={styles.note}>{campus.levels.review}</p> : null}
        </Container>
      </section>

      {/* ---- The places: one large photograph, two beside it ---------------------------------------------- */}
      <section id="espaces" aria-labelledby="espaces-title" className={`${styles.section} ${styles.paper}`}>
        <Container>
          <SectionHeading id="espaces-title" text="Les *lieux*" className="reveal" />
          <div className={styles.mosaic} data-count={places.length}>
            {places.map((photo, index) => (
              <figure key={photo.src} className={index === 0 ? styles.mosaicLarge : undefined}>
                <span className={styles.mosaicFrame}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={index === 0 ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
                    className="object-cover"
                  />
                </span>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- The campus's own story ------------------------------------------------------------------------ */}
      <section aria-labelledby="feature-title" className={styles.section}>
        <Container className={styles.feature}>
          <figure className={`${styles.featurePhoto} reveal`}>
            <Image
              src={campus.feature.image.src}
              alt={campus.feature.image.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              style={campus.feature.image.position ? { objectPosition: campus.feature.image.position } : undefined}
            />
          </figure>
          <div>
            <SectionHeading id="feature-title" text={campus.feature.title} className="reveal" />
            <p className={`${styles.text} reveal-2`}>{campus.feature.text}</p>
            <Link href={campus.feature.href} className={styles.textLink}>
              {campus.feature.label}
            </Link>
            {campus.history.length > 1 ? (
              <ol className={styles.milestones}>
                {campus.history.map((item) => (
                  <li key={item.date}>
                    <time>{item.date}</time>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ---- Every day: services and hours ------------------------------------------------------------------ */}
      <section id="vie-pratique" aria-labelledby="quotidien-title" className={`${styles.section} ${styles.olive}`}>
        <Container>
          <SectionHeading id="quotidien-title" text="Au *quotidien*" accentClassName="text-sand" className="reveal" />
          <ul role="list" className={styles.services}>
            {campus.services.map((service) => (
              <li key={service.title} className="reveal-2">
                <h3>{service.title}</h3>
                <p>{service.short}</p>
              </li>
            ))}
          </ul>
          <div className={styles.hours}>
            {campus.timetable.map((group) => (
              <div key={group.group} className={styles.hoursCard}>
                <h3>{group.group}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className={styles.oliveNote}>Horaires publiés sur la page du campus, à faire confirmer pour la classe de votre enfant.</p>
        </Container>
      </section>

      {/* ---- Getting there ------------------------------------------------------------------------------------ */}
      <section id="acces" aria-labelledby="acces-title" className={styles.section}>
        <Container className={styles.access}>
          <SectionHeading id="acces-title" text={`Venir à *${campus.district}*`} className="reveal" />
          <Contacts campus={campus} heading={false} />
        </Container>
      </section>

      <PageActions
        title={`Rencontrons-nous à ${campus.city}`}
        text="Les visites sont réservées aux familles ayant déjà déposé une candidature."
        primary={{ label: 'Demander une visite par e-mail', href: campusRequestHref(campus, 'Demande de visite après candidature') }}
        secondary={{ label: 'Candidater', href: routes.candidater }}
      />
    </>
  )
}
