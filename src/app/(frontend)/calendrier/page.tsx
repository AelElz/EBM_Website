import { CalendarPlus, FileDown } from 'lucide-react'
import Link from 'next/link'

import { CalendarDashboard } from '@/components/inner/calendar/calendar-dashboard'
import styles from '@/components/inner/calendar/calendar.module.css'
import { PageActions } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { visitPolicy } from '@/content/migration/admissions'
import { calendarPdfHref } from '@/content/migration/admissions-calendar'
import { getCalendar, todayInCasablanca } from '@/lib/calendar'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import { ContactComposer } from '@/components/inner/campuses/contact-composer'
import { campusContactRecipients, migratedCampuses } from '@/content/migration/campuses'

/*
 * /calendrier (30 Oct 2026, Ayoub: "a dashboard that could be working with the CMS", Apple design
 * skill). The school calendar as a family dashboard: cards at a glance, the year view, the agenda
 * with filters (calendar-dashboard.tsx), then the visit request (#visite), merged here from
 * /reserver-une-visite on 30 Oct 2026 (that address redirects here, keeping ?campus=). The dates come from the Payload collection
 * `calendar-events` once a database is connected, the signed 2026–2027 document until then
 * (src/lib/calendar.ts). Rendered per request (the visit form reads ?campus=).
 */

export const revalidate = 3600

export const metadata = pageMetadata({
  title: 'Calendrier & visites',
  description: 'Le calendrier scolaire des Écoles Belges au Maroc (vacances, reprises, jours fériés) et la demande de visite auprès de votre campus.',
  path: '/calendrier',
  index: false,
})

export default async function CalendrierPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [calendar, params] = await Promise.all([getCalendar(), searchParams])
  const campus = params.campus === 'rabat' ? 'rabat' : params.campus === 'casablanca' ? 'casablanca' : undefined
  const year = calendar.schoolYear.replace('-', '–')

  return (
    <>
      <section aria-labelledby="page-title" className={styles.head}>
        <Container>
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <span aria-current="page">Calendrier</span>
              </li>
            </ol>
          </nav>
          <div className={styles.headGrid}>
            <div>
              <p className={styles.label}>Calendrier scolaire</p>
              <h1 id="page-title" className={styles.title}>
                L’année {year}.
              </h1>
            </div>
            <div>
              <p className={styles.intro}>
                Les vacances, les reprises et les jours fériés des deux campus, en un coup d’œil, et la demande de visite juste en dessous.
              </p>
              <div className={styles.headActions}>
                <ButtonLink href="/calendrier/ebm.ics" size="lg">
                  <CalendarPlus aria-hidden="true" size={18} strokeWidth={1.75} />
                  Ajouter à mon agenda
                </ButtonLink>
                {calendar.source === 'document' ? (
                  <ButtonLink href={calendarPdfHref} variant="outline-dark" size="lg">
                    <FileDown aria-hidden="true" size={18} strokeWidth={1.75} />
                    Le calendrier en PDF
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Le calendrier" className={styles.dashboardBand}>
        <Container>
          <CalendarDashboard entries={calendar.entries} initialToday={todayInCasablanca()} />

          <p className={styles.sourceNote}>
            {calendar.source === 'cms'
              ? 'Dates publiées par les Écoles Belges au Maroc. Les fêtes lunaires restent à confirmer.'
              : `Dates du calendrier scolaire signé ${year}. Les fêtes lunaires restent à confirmer.`}
          </p>
        </Container>
      </section>

      {/* ---- Visits (30 Oct 2026: the former /reserver-une-visite, merged here) ---- */}
      <section id="visite" aria-labelledby="visite-title" className={styles.visitBand}>
        <Container className={styles.visitGrid}>
          <div>
            <p className={styles.label}>Visites</p>
            <h2 id="visite-title" className={styles.visitTitle}>
              Demander une visite.
            </h2>
            <p className={styles.visitText}>{visitPolicy.text}</p>
            <p className={styles.visitText}>
              Votre e-mail est une demande&#8239;: l’équipe du campus vous propose une date et confirme le rendez-vous.
            </p>
            <ul role="list" className={styles.visitDirect} aria-label="Écrire directement au campus">
              {migratedCampuses.flatMap((item) =>
                item.contacts.map((service) => (
                  <li key={service.email}>
                    <span>
                      {item.city} · {service.label}
                    </span>
                    <a href={`mailto:${service.email}?subject=${encodeURIComponent('Demande de visite')}`}>{service.email}</a>
                  </li>
                )),
              )}
            </ul>
          </div>
          <div className={styles.visitForm}>
            <ContactComposer recipients={campusContactRecipients} initialCampus={campus} initialSubject="Demander une visite" context="visit" />
          </div>
        </Container>
      </section>

      <PageActions
        title="Votre projet prend forme ?"
        primary={{ label: 'Préparer ma candidature', href: routes.candidater }}
        secondary={{ label: 'Consulter les questions fréquentes', href: routes.faq }}
      />
    </>
  )
}
