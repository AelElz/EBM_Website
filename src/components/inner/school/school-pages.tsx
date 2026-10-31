
import { CmsAnchor } from '@/cms/link'
import Image from '@/cms/image'
import Link from '@/cms/link'

import { DisclosureList, DocumentLink, InnerHero, LinkList, PageActions, PageSection, PhotoGallery, ReviewNote, SectionNav, SplitSection, TextBlock } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { migratedCampuses } from '@/content/migration/campuses'
import { alumniDestinations, alumniPage, alumniStudyFields, historicalResults, schoolActivities, schoolImages, schoolLifePage, schoolStories } from '@/content/migration/school'
import { routes } from '@/lib/routes'
import { site } from '@/content/site'

import { ActivityFilter } from './activity-filter'
import styles from './school.module.css'

const admissionsActions = { primary: { label: 'Candidater', href: routes.candidater }, secondary: { label: 'Demander une visite', href: routes.reserverVisite } }
const visitQualification = 'Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles.'

function Principles({ items }: { items: { title: string; text: string }[] }) {
  return <div className={styles.principles}>{items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
}

/* Grandir aux EBM: the hero on green with white text (Ayoub, 30 Oct 2026: that block only). */
export function SchoolLifePage() {
  return <>
    <InnerHero title={schoolLifePage.title} intro={schoolLifePage.intro} image={schoolImages.sport} breadcrumb={[{ label: 'Grandir aux EBM' }]} tone="olive" />
    <SectionNav items={[{ label: 'Les activités', href: '#activites' }, { label: 'Les temps forts', href: '#temps-forts' }, { label: 'La vie pratique', href: '#vie-pratique' }, { label: 'Le bien-être', href: '#bien-etre' }]} />
    <PageSection id="activites" title="Trouver ce qui donne envie" intro={schoolLifePage.activityIntro}>
      <ActivityFilter activities={schoolActivities.map(({ id, type }) => ({ id, type }))}>{schoolActivities.map(activity => <article key={activity.id} className={styles.activity}><figure><Image src={activity.image.src} alt={activity.image.alt} fill sizes="(min-width:1240px) 370px, (min-width:768px) 30vw, 100vw" /></figure><h3>{activity.title}</h3><p>{activity.text}</p></article>)}</ActivityFilter><ReviewNote title="L’offre détaillée reste à compléter">{schoolLifePage.activitiesGap}</ReviewNote>
    </PageSection>
    <PageSection id="temps-forts" title="Des expériences qui restent" intro={schoolLifePage.storiesIntro} tone="paper"><div className={styles.stories}>{schoolStories.map(story => <article className={styles.story} id={story.id} key={story.id}><figure><Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width:1240px) 550px, (min-width:768px) 45vw, 100vw" /></figure><div><p className={styles.storyMeta}>{story.campus} · <time dateTime={story.datetime}>{story.date}</time></p><h3>{story.title}</h3><p>{story.text}</p><CmsAnchor href={story.sourceUrl} className={styles.textLink} target="_blank" rel="noopener noreferrer">Lire la publication d’origine<span className="sr-only"> (nouvel onglet)</span></CmsAnchor></div></article>)}</div></PageSection>
    <PageSection id="galerie" title="Au fil de la vie d’école"><PhotoGallery images={[{ ...schoolImages.primary, caption: 'Une activité en classe aux EBM.' }, { ...schoolImages.tripCampus, caption: 'Une visite d’établissement supérieur lors du voyage de rhéto présenté en novembre 2024.' }, { ...schoolImages.sport, caption: 'Le sport, une des facettes de la vie d’école.' }]} /></PageSection>
    <PageSection id="vie-pratique" title="S’organiser au quotidien" intro="Chaque campus a son organisation. Retrouvez ici les services publiés, puis les détails et les contacts sur la page de votre école." tone="paper"><div className={styles.twoColumns}>{migratedCampuses.map(campus => <div key={campus.slug}><h3 className={styles.archiveHeading}>{campus.title}</h3><DisclosureList items={campus.services.map(service => ({ id: campus.slug === 'casablanca' ? (service.title === 'Cantine' ? 'cantine' : service.title === 'Transport scolaire' ? 'transport' : undefined) : undefined, question: service.title, answer: service.text }))} /><Link href={`${campus.route}#vie-pratique`} className={styles.textLink}>Horaires et informations de {campus.city}</Link></div>)}</div><ReviewNote title="À préciser avec votre campus">Les sources ne donnent pas toutes les mêmes heures de début des cours et de garderie. Les horaires détaillés sont signalés sur les pages campus. Les menus et tarifs de services de cette année restent à obtenir auprès de l’école ou du prestataire.</ReviewNote></PageSection>
    <SplitSection id="bien-etre" title={schoolLifePage.wellbeingTitle} paragraphs={schoolLifePage.wellbeing} image={schoolImages.nursery} reverse />
    <PageSection id="agenda" title="Les prochaines dates" tone="paper"><TextBlock paragraphs={[schoolLifePage.eventEmpty]} /><Link href={routes.calendrier} className={styles.textLink}>Ouvrir le calendrier 2026–2027</Link></PageSection>
    <PageSection title="Les familles racontent"><ReviewNote title="Un témoignage à recueillir">{schoolLifePage.quoteGap}</ReviewNote></PageSection>
    <PageActions title="Découvrir la vie de votre futur campus" text={visitQualification} {...admissionsActions} />
  </>
}

function Percentages({ data }: { data: { label: string; value: number }[] }) {
  return <dl className={styles.percentages}>{data.map(item => <div key={item.label}><div className={styles.percentageLabel}><dt>{item.label}</dt><dd>{item.value.toLocaleString('fr-FR')} %</dd></div><div className={styles.barTrack} aria-hidden="true"><div className={styles.bar} style={{ width: `${item.value}%` }} /></div></div>)}</dl>
}

export function AfterEbmPage() {
  const trip = schoolStories[0]
  return <>
    <InnerHero title={alumniPage.title} intro={alumniPage.intro} image={schoolImages.ceremony} breadcrumb={[{ label: 'Après les EBM' }]} />
    <SectionNav items={[{ label: 'L’orientation', href: '#orientation' }, { label: 'Les promotions', href: '#promotions' }, { label: 'Les parcours passés', href: '#parcours' }, { label: 'Garder le lien', href: '#reseau-anciens' }]} />
    <PageSection id="portraits" title="Des parcours à partager"><ReviewNote title="Les portraits des anciens arrivent avec vous">{alumniPage.portraitsGap}</ReviewNote></PageSection>
    <SplitSection id="promotions" title={alumniPage.ceremonyTitle} paragraphs={[alumniPage.ceremonyText]} image={{ ...schoolImages.ceremony, caption: 'Archive des EBM : année et promotion à confirmer.' }} tone="paper" />
    <SplitSection title="Le voyage de rhéto : penser la suite" paragraphs={[trip.text, 'Publication du 12 novembre 2024, promotion 2024–2025 de Casablanca. Les établissements visités ne sont pas présentés comme les universités d’inscription des élèves.']} image={trip.image} reverse><Link href={`${routes.grandir}#rheto`} className={styles.textLink}>Le récit du voyage</Link></SplitSection>
    <PageSection id="orientation" title={alumniPage.orientationTitle} tone="paper"><TextBlock paragraphs={alumniPage.orientationText} /><Link href={`${routes.pedagogie}#secondaire`} className={styles.textLink}>Le parcours du secondaire</Link></PageSection>
    <PageSection id="parcours" title={alumniPage.historyTitle} intro={alumniPage.historyIntro}>
      <div className={styles.twoColumns}><div><h3 className={styles.archiveHeading}>Où poursuivaient-ils leurs études ?</h3><p className={styles.archiveNote}>{alumniPage.destinationNote}</p><Percentages data={alumniDestinations} /></div><div><h3 className={styles.archiveHeading}>Quels domaines choisissaient-ils ?</h3><p className={styles.archiveNote}>{alumniPage.fieldNote}</p><Percentages data={alumniStudyFields} /></div></div>
      <details className={styles.resultDetails}><summary>Consulter les résultats historiques de 2018 à 2023</summary><p className={styles.archiveNote}>{alumniPage.resultsNote}</p><div className={styles.tables}>{(['primary', 'cess'] as const).map(level => <table key={level}><caption>{level === 'primary' ? 'Fin du primaire' : 'CESS'} — données de la brochure</caption><thead><tr><th scope="col">Année</th><th scope="col">EBM</th><th scope="col">FWB</th></tr></thead><tbody>{historicalResults.map(row => <tr key={row.year}><th scope="row">{row.year}</th><td>{(level === 'primary' ? row.primaryEbm : row.cessEbm).toLocaleString('fr-FR')} %</td><td>{(level === 'primary' ? row.primaryFwb : row.cessFwb).toLocaleString('fr-FR')} %</td></tr>)}</tbody></table>)}</div></details>
      <DocumentLink href={alumniPage.brochureHref} label="Télécharger la brochure d’archive (PDF)" note="Document historique, avec résultats jusqu’en 2023 et annonces d’évolution. Ce n’est pas une brochure actualisée pour l’année 2026–2027." />
    </PageSection>
    <PageSection id="questions" title="Le CESS, concrètement" tone="paper"><DisclosureList items={alumniPage.questions} /><Link href={routes.faq} className={styles.textLink}>Toutes les questions des familles</Link></PageSection>
    <PageSection id="reseau-anciens" title={alumniPage.joinTitle}><TextBlock paragraphs={[alumniPage.joinText]} /><LinkList items={[{ label: 'Contacter les EBM pour partager mon parcours', href: alumniPage.joinHref }, { label: 'Suivre les EBM sur Instagram', href: site.instagram.url, external: true }]} /></PageSection>
    <PageActions title="Préparer le parcours qui vous ressemble" text={visitQualification} primary={{ label: 'Découvrir les campus', href: routes.campus }} secondary={{ label: 'Demander une visite', href: routes.reserverVisite }} />
  </>
}
