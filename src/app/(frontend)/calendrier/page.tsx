import { ArrowRight, CalendarPlus, FileDown } from 'lucide-react'
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

/*
 * /calendrier (30 Oct 2026, Ayoub: "a dashboard that could be working with the CMS", Apple design
 * skill). The school calendar as a family dashboard: cards at a glance, the year view, the agenda
 * with filters (calendar-dashboard.tsx). The dates come from the Payload collection
 * `calendar-events` once a database is connected, the signed 2026–2027 document until then
 * (src/lib/calendar.ts). The page is rebuilt hourly and on every change in the CMS.
 */

export const revalidate = 3600

export const metadata = pageMetadata({
  title: 'Calendrier scolaire',
  description: 'Le calendrier scolaire des Écoles Belges au Maroc : vacances, reprises et jours fériés, à ajouter à votre agenda.',
  path: '/calendrier',
  index: false,
})

export default async function CalendrierPage() {
  const calendar = await getCalendar()
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
                Les vacances, les reprises et les jours fériés des deux campus, en un coup d’œil. Ajoutez-les à votre agenda en un geste.
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

          <div className={styles.more}>
            <section aria-labelledby="visites-title" className={styles.moreCard}>
              <h2 id="visites-title">{visitPolicy.title}</h2>
              <p>{visitPolicy.text}</p>
              <div className={styles.moreLinks}>
                <Link href="/reserver-une-visite">
                  Préparer une demande de visite
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </Link>
                <Link href="/admissions/comprendre">
                  Comprendre la candidature
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </Link>
              </div>
            </section>
            <section aria-labelledby="aide-title" className={styles.moreCard}>
              <h2 id="aide-title">Une date à préciser&#8239;?</h2>
              <p>
                L’organisation de la rentrée peut varier selon l’école. Écrivez au campus en indiquant l’âge de votre enfant et le niveau souhaité.
              </p>
              <div className={styles.moreLinks}>
                <Link href="/contact#casablanca">
                  Campus de Casablanca
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </Link>
                <Link href="/contact#rabat">
                  Campus de Rabat
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </Link>
              </div>
            </section>
          </div>

          <p className={styles.sourceNote}>
            {calendar.source === 'cms'
              ? 'Dates publiées par les Écoles Belges au Maroc. Les fêtes lunaires restent à confirmer.'
              : `Dates du calendrier scolaire signé ${year}. Les fêtes lunaires restent à confirmer.`}
          </p>
        </Container>
      </section>

      <PageActions
        title="Votre projet prend forme ?"
        primary={{ label: 'Préparer ma candidature', href: '/admissions/candidater' }}
        secondary={{ label: 'Consulter les questions fréquentes', href: '/admissions/comprendre#faq' }}
      />
    </>
  )
}
