import { InnerHero, PageSection, ReviewNote, TextBlock, DocumentLink, SectionNav, PageActions, LinkList } from '@/components/inner/blocks'
import { CalendarBrowser } from '@/components/inner/admissions/calendar-browser'
import { AdmissionsContacts } from '@/components/inner/admissions/shared'
import { calendarPdfHref, schoolCalendarEvents, schoolCalendarIcs } from '@/content/migration/admissions-calendar'
import { visitPolicy } from '@/content/migration/admissions'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Calendrier & visites', description: 'Le calendrier scolaire EBM 2026–2027 et les informations pour demander une visite dans le cadre de votre candidature.', path: '/calendrier', index: false })

export default function CalendrierPage() {
 const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(schoolCalendarIcs())}`
 return <>
  <InnerHero title="Les dates pour vous organiser." intro="Consultez le calendrier scolaire 2026–2027 et découvrez comment échanger avec l’école au sujet d’une visite." breadcrumb={[{ label: 'Calendrier & visites' }]} />
  <SectionNav items={[{ label: 'Calendrier scolaire', href: '#calendrier-scolaire' }, { label: 'Demander une visite', href: '#visites' }, { label: 'Aide par campus', href: '#aide' }]} />
  <PageSection id="calendrier-scolaire" title="L’année scolaire 2026–2027" intro="Dates du document scolaire signé. Les jours de congé et de vacances sont inclus dans les périodes indiquées ; les dates lunaires restent à confirmer.">
   <DocumentLink href={calendarPdfHref} label="Télécharger le calendrier scolaire 2026–2027 (PDF)" note="Document scolaire source, une page. L’organisation de la rentrée relève de chaque école." />
   <p className={styles.help}><a href={icsHref} download="EBM-calendrier-scolaire-2026-2027.ics">Ajouter ces dates à mon agenda (.ics)</a> · Export ponctuel, sans abonnement ni mise à jour automatique. Les dates estimées sont signalées dans l’agenda.</p>
   <CalendarBrowser events={schoolCalendarEvents} />
   <ReviewNote title="Deux précisions du document signé">Aïd Al Mawlid est indiqué vers le 25 août 2026 et son lendemain. Les vacances de printemps se terminent le 9 mai 2027 inclus ; les cours reprennent le 10 mai. Ces dates reprennent le PDF plutôt que les indications contradictoires de l’ancienne page HTML.</ReviewNote>
  </PageSection>
  <PageSection id="visites" title={visitPolicy.title} tone="paper">
   <TextBlock paragraphs={[visitPolicy.text, 'Aucun créneau public ni journée portes ouvertes n’est annoncé ici. Une demande ne vaut pas réservation : l’équipe confirme directement le rendez-vous et les informations pratiques.']} />
   <LinkList items={[{ label: 'Préparer une demande de visite', href: '/reserver-une-visite' }, { label: 'Comprendre la candidature', href: '/admissions/comprendre' }]} />
  </PageSection>
  <PageSection id="aide" title="Une date ou un rendez-vous à préciser ?" intro="Indiquez le campus, l’âge de votre enfant et le niveau souhaité dans votre échange avec l’équipe."><AdmissionsContacts /></PageSection>
  <PageActions title="Votre projet prend forme ?" primary={{ label: 'Préparer ma candidature', href: '/admissions/candidater' }} secondary={{ label: 'Consulter les questions fréquentes', href: '/admissions/comprendre#faq' }} />
 </>
}
