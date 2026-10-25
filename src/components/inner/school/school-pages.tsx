import Image from 'next/image'
import Link from 'next/link'

import { DisclosureList, DocumentLink, InnerHero, LinkList, PageActions, PageSection, PhotoGallery, ReviewNote, SectionNav, SplitSection, TextBlock } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { migratedCampuses } from '@/content/migration/campuses'
import { alumniDestinations, alumniPage, alumniStudyFields, historicalResults, networkPage, outdoorsPage, pedagogyPage, schoolActivities, schoolImages, schoolLevels, schoolLifePage, schoolStories } from '@/content/migration/school'
import { routes } from '@/lib/routes'
import { site } from '@/content/site'

import { ActivityFilter } from './activity-filter'
import { LevelTabs } from './level-tabs'
import styles from './school.module.css'

const admissionsActions = { primary: { label: 'Candidater', href: routes.candidater }, secondary: { label: 'Demander une visite', href: routes.reserverVisite } }
const visitQualification = 'Les visites s’organisent avec l’équipe dans le cadre d’une candidature. Les admissions dépendent des conditions d’entrée et des places disponibles.'

function Principles({ items }: { items: { title: string; text: string }[] }) {
  return <div className={styles.principles}>{items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
}

export function NetworkPage() {
  return <>
    <InnerHero title={networkPage.title} intro={networkPage.intro} image={schoolImages.network} breadcrumb={[{ label: 'Le réseau EBM' }]}><div className={styles.actions}><ButtonLink href={routes.campus} variant="outline-dark" size="lg">Découvrir les deux campus</ButtonLink></div></InnerHero>
    <SectionNav items={[{ label: 'Notre projet', href: '#projet' }, { label: 'Le cadre belge', href: '#cadre-belge' }, { label: 'Notre histoire', href: '#histoire' }, { label: 'Les équipes', href: '#equipes' }]} />
    <SplitSection id="direction" title={networkPage.director.title} paragraphs={networkPage.director.paragraphs} image={schoolImages.director} reverse>
      <blockquote className={styles.quote}>« {networkPage.director.quote} »</blockquote><p className={styles.signature}>{networkPage.director.name}<span>{networkPage.director.role}</span></p>
    </SplitSection>
    <PageSection id="projet" title={networkPage.mission.title} tone="paper">
      <div className={styles.twoColumns}><TextBlock paragraphs={networkPage.mission.paragraphs} /><div className={styles.values}>{networkPage.values.map(value => <article key={value.title} className={styles.value}><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div>
    </PageSection>
    <SplitSection id="cadre-belge" title={networkPage.framework.title} paragraphs={networkPage.framework.paragraphs} image={schoolImages.sciences}>
      <ul className={styles.factsList}>{networkPage.framework.facts.map(fact => <li key={fact}>{fact}</li>)}</ul><Link href={routes.pedagogie} className={styles.textLink}>Comprendre notre pédagogie</Link>
    </SplitSection>
    <PageSection id="histoire" title="Les étapes du réseau" tone="paper"><ol className={styles.timeline}>{networkPage.history.map(event => <li key={event.date}><time>{event.date}</time><div><h3>{event.title}</h3><p>{event.text}</p></div></li>)}</ol></PageSection>
    <PageSection id="equipes" title="Des équipes, deux campus"><LinkList items={migratedCampuses.map(campus => ({ label: campus.title, href: `${campus.route}#acces`, description: `Échanger avec l’équipe de ${campus.city}, à ${campus.district}.` }))} /><ReviewNote title="Le réseau en version de travail">{networkPage.teamGap} La fonction actuelle du directeur du réseau et la republication du message restent à valider.</ReviewNote></PageSection>
    <PageSection id="partenaires" title="Un réseau ancré dans la coopération" intro={networkPage.partnersIntro} tone="paper"><div className={styles.partners}><Image src="/brand/partners-white.png" width={856} height={170} alt="Fédération Wallonie-Bruxelles, Wallonie-Bruxelles International et AEBE : les logos partenaires fournis par EBM." /></div></PageSection>
    <PageActions title="Faire connaissance avec les EBM" text={visitQualification} {...admissionsActions} />
    <PageSection title="Envie de rejoindre nos équipes ?"><LinkList items={[{ label: 'Prendre contact pour un recrutement', href: routes.recrutement, description: 'Aucune offre non vérifiée n’est présentée comme un poste actuellement ouvert.' }]} /></PageSection>
  </>
}

export function PedagogyPage() {
  return <>
    <InnerHero title={pedagogyPage.title} intro={pedagogyPage.intro} image={schoolImages.sciences} breadcrumb={[{ label: 'Pédagogie' }]} />
    <SectionNav items={[{ label: 'Notre approche', href: '#approche' }, { label: 'Les trois niveaux', href: '#niveaux' }, { label: 'Les langues', href: '#langues' }, { label: 'L’accompagnement', href: '#accompagnement' }]} />
    <PageSection id="approche" title="L’élève agit, comprend et progresse"><Principles items={pedagogyPage.principles} /></PageSection>
    <PageSection id="niveaux" title="À chaque étape, des objectifs clairs" tone="paper">
      <LevelTabs levels={schoolLevels.map(({ id, label }) => ({ id, label }))}>{schoolLevels.map(level => <div key={level.id} className={styles.levelContent}><div className={styles.levelCopy}><p className={styles.age}>{level.ages}</p><h3>{level.title}</h3><p>{level.text}</p><h4>Ce que l’enfant développe</h4><ul>{level.objectives.map(objective => <li key={objective}>{objective}</li>)}</ul><h4>Les apprentissages</h4><p>{level.subjects}</p><h4>Les repères du parcours</h4><p>{level.milestone}</p></div><figure className={styles.levelPhoto}><Image src={level.image.src} alt={level.image.alt} fill sizes="(min-width:1240px) 500px, (min-width:768px) 42vw, 100vw" /></figure></div>)}</LevelTabs>
      <ReviewNote title="Certificats et programme : points à valider">{pedagogyPage.diplomaGap} Le détail des niveaux ouverts à Rabat, des options actuelles et des journées types par niveau reste à confirmer avec EBM.</ReviewNote>
    </PageSection>
    <SplitSection title={pedagogyPage.outdoorTitle} paragraphs={[pedagogyPage.outdoorText]} image={schoolImages.outdoor}><Link href={routes.ecoleDuDehors} className={styles.textLink}>Découvrir l’école du dehors</Link></SplitSection>
    <PageSection id="langues" title="Des langues pour rencontrer le monde" intro={pedagogyPage.languageIntro} tone="paper"><Principles items={pedagogyPage.languages} /><LinkList items={[{ label: 'Un exemple d’ouverture à Rabat, en octobre 2024', href: `${routes.grandir}#temps-forts`, description: 'Les ateliers germanophones annoncés avec l’Ambassade d’Allemagne et l’Institut Goethe.' }]} /></PageSection>
    <PageSection id="parole-enseignant" title="La parole aux enseignants"><ReviewNote title="Des médias à compléter">{pedagogyPage.videoGap}</ReviewNote></PageSection>
    <PageSection id="accompagnement" title="Accompagner la progression" tone="paper"><DisclosureList items={pedagogyPage.supports} /><Link href={routes.faq} className={styles.textLink}>Toutes les questions des familles</Link></PageSection>
    <PageActions title="Trouver le bon cadre pour votre enfant" text={visitQualification} {...admissionsActions} />
  </>
}

export function OutdoorsPage() {
  return <>
    <InnerHero title={outdoorsPage.title} intro={outdoorsPage.intro} image={schoolImages.outdoor} breadcrumb={[{ label: 'Pédagogie', href: routes.pedagogie }, { label: 'L’école du dehors' }]}><div className={styles.actions}><ButtonLink href={`${routes.reserverVisite}?campus=casablanca`} size="lg">Demander une visite à Casablanca</ButtonLink><ButtonLink href={`${routes.contact}?campus=casablanca`} variant="outline-dark" size="lg">Contacter le campus</ButtonLink></div></InnerHero>
    <SectionNav items={[{ label: 'L’approche', href: '#approche' }, { label: 'En images', href: '#images' }, { label: 'Les séances', href: '#seances' }, { label: 'Le lieu', href: '#lieu' }]} />
    <PageSection id="approche" title="La nature prolonge la classe"><div className={styles.twoColumns}><TextBlock paragraphs={outdoorsPage.introduction} /><Principles items={outdoorsPage.principles} /></div></PageSection>
    <PageSection id="images" title="Le dehors, en images" tone="paper"><PhotoGallery images={[{ ...schoolImages.outdoor, caption: 'Apprendre dans l’espace naturel de Casablanca, photographie du campus.' }, { ...schoolImages.outdoorLaunch, caption: 'Le lancement du projet, relaté dans un article publié le 12 janvier 2024.' }]} /></PageSection>
    <PageSection id="seances" title={outdoorsPage.session.title}><TextBlock paragraphs={[outdoorsPage.session.text]} /><ReviewNote title="Le programme de cette année">{outdoorsPage.session.gap}</ReviewNote></PageSection>
    <PageSection id="voix" title="Ceux qui vivent l’école du dehors" tone="paper"><ReviewNote title="Témoignages et vidéos à recueillir">{outdoorsPage.voicesGap}</ReviewNote></PageSection>
    <SplitSection id="lieu" title={outdoorsPage.location.title} paragraphs={[outdoorsPage.location.text]} image={schoolImages.network} reverse><Link href={`${routes.campusCasablanca}#acces`} className={styles.textLink}>Le campus et ses accès</Link></SplitSection>
    <PageSection id="agenda" title="Découvrir le lieu" tone="paper"><TextBlock paragraphs={[outdoorsPage.events]} /><Link href={routes.calendrier} className={styles.textLink}>Consulter le calendrier scolaire</Link></PageSection>
    <PageActions title="Échanger avec l’équipe de Casablanca" text={visitQualification} primary={{ label: 'Contacter le campus', href: `${routes.contact}?campus=casablanca` }} secondary={{ label: 'Demander une visite', href: `${routes.reserverVisite}?campus=casablanca` }} />
  </>
}

export function SchoolLifePage() {
  return <>
    <InnerHero title={schoolLifePage.title} intro={schoolLifePage.intro} image={schoolImages.sport} breadcrumb={[{ label: 'Grandir aux EBM' }]} />
    <SectionNav items={[{ label: 'Les activités', href: '#activites' }, { label: 'Les temps forts', href: '#temps-forts' }, { label: 'La vie pratique', href: '#vie-pratique' }, { label: 'Le bien-être', href: '#bien-etre' }]} />
    <PageSection id="activites" title="Trouver ce qui donne envie" intro={schoolLifePage.activityIntro}>
      <ActivityFilter activities={schoolActivities.map(({ id, type }) => ({ id, type }))}>{schoolActivities.map(activity => <article key={activity.id} className={styles.activity}><figure><Image src={activity.image.src} alt={activity.image.alt} fill sizes="(min-width:1240px) 370px, (min-width:768px) 30vw, 100vw" /></figure><h3>{activity.title}</h3><p>{activity.text}</p></article>)}</ActivityFilter><ReviewNote title="L’offre détaillée reste à compléter">{schoolLifePage.activitiesGap}</ReviewNote>
    </PageSection>
    <PageSection id="temps-forts" title="Des expériences qui restent" intro={schoolLifePage.storiesIntro} tone="paper"><div className={styles.stories}>{schoolStories.map(story => <article className={styles.story} id={story.id} key={story.id}><figure><Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width:1240px) 550px, (min-width:768px) 45vw, 100vw" /></figure><div><p className={styles.storyMeta}>{story.campus} · <time dateTime={story.datetime}>{story.date}</time></p><h3>{story.title}</h3><p>{story.text}</p><a href={story.sourceUrl} className={styles.textLink} target="_blank" rel="noopener noreferrer">Lire la publication d’origine<span className="sr-only"> (nouvel onglet)</span></a></div></article>)}</div></PageSection>
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
