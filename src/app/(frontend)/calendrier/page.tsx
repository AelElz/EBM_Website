
import { CmsAnchor } from '@/cms/link'
import { getCmsContent } from '@/cms/server'
import { pageCopyDefaults } from '@/cms/page-defaults'
import { getAdmissions } from '@/cms/admissions'
import { getCampuses, contactRecipients } from '@/cms/campuses'
import { CalendarPlus, FileDown } from 'lucide-react'
import Link from '@/cms/link'

import { CalendarDashboard } from '@/components/inner/calendar/calendar-dashboard'
import styles from '@/components/inner/calendar/calendar.module.css'
import { PageActions } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { calendarPdfHref } from '@/content/migration/admissions-calendar'
import { getCalendar, todayInCasablanca } from '@/lib/calendar'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import { ContactComposer } from '@/components/inner/campuses/contact-composer'

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
  const { calendarCopy: copy } = await getCmsContent('admissions', { calendarCopy: pageCopyDefaults.calendarCopy })
  const [calendar, params, { visitPolicy }, migratedCampuses] = await Promise.all([getCalendar(), searchParams, getAdmissions(), getCampuses()])
  const campusContactRecipients = contactRecipients(migratedCampuses)
  const campus = params.campus === 'rabat' ? 'rabat' : params.campus === 'casablanca' ? 'casablanca' : undefined
  const year = calendar.schoolYear.replace('-', '–')

  return (
    <>
      <section aria-labelledby="page-title" className={styles.head}>
        <Container>
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">{copy.texte01}</Link>
              </li>
              <li>
                <span aria-current="page">{copy.texte02}</span>
              </li>
            </ol>
          </nav>
          <div className={styles.headGrid}>
            <div>
              <p className={styles.label}>{copy.texte03}</p>
              <h1 id="page-title" className={styles.title}>
                {copy.texte04}{year}{copy.texte05}</h1>
            </div>
            <div>
              <p className={styles.intro}>
                {copy.texte06}</p>
              <div className={styles.headActions}>
                <ButtonLink href="/calendrier/ebm.ics" size="lg">
                  <CalendarPlus aria-hidden="true" size={18} strokeWidth={1.75} />
                  {copy.texte07}</ButtonLink>
                {calendar.source === 'document' ? (
                  <ButtonLink href={calendarPdfHref} variant="outline-dark" size="lg">
                    <FileDown aria-hidden="true" size={18} strokeWidth={1.75} />
                    {copy.texte08}</ButtonLink>
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
            <p className={styles.label}>{copy.texte09}</p>
            <h2 id="visite-title" className={styles.visitTitle}>
              {copy.texte10}</h2>
            <p className={styles.visitText}>{visitPolicy.text}</p>
            <p className={styles.visitText}>
              {copy.texte11}</p>
            <ul role="list" className={styles.visitDirect} aria-label="Écrire directement au campus">
              {migratedCampuses.flatMap((item) =>
                item.contacts.map((service) => (
                  <li key={service.email}>
                    <span>
                      {item.city} {copy.texte12}{service.label}
                    </span>
                    <CmsAnchor href={`mailto:${service.email}?subject=${encodeURIComponent('Demande de visite')}`}>{service.email}</CmsAnchor>
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
        title={copy.titre13}
        primary={{ label: 'Préparer ma candidature', href: routes.candidater }}
        secondary={{ label: 'Consulter les questions fréquentes', href: routes.faq }}
      />
    </>
  )
}
