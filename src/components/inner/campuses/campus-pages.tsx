import Image from 'next/image'
import Link from 'next/link'

import { InnerHero, PageActions, PageSection, PhotoGallery, ReviewNote, SectionNav, SplitSection, FactList, LinkList, TextBlock } from '@/components/inner/blocks'
import { ButtonLink } from '@/components/ui/button'
import { campusContactRecipients, campusRequestHref, migratedCampuses, type MigratedCampus } from '@/content/migration/campuses'
import { site } from '@/content/site'
import { routes } from '@/lib/routes'

import { CampusContact } from './campus-contact'
import { ContactComposer } from './contact-composer'
import styles from './campuses.module.css'

export function CampusHub() {
  return (
    <>
      <InnerHero title="Deux campus, une même exigence." intro="À Casablanca et à Rabat, le même programme belge francophone. Deux cadres de vie à découvrir pour choisir celui de votre famille." breadcrumb={[{ label: 'Nos campus' }]} />
      <SectionNav items={[{ label: 'Découvrir les campus', href: '#decouvrir' }, { label: 'Comparer', href: '#comparer' }, { label: 'Accès et contacts', href: '#acces' }]} />
      <PageSection id="decouvrir">
        <div className={styles.campusGrid}>
          {migratedCampuses.map((campus) => (
            <article key={campus.slug}>
              <Link href={campus.route} className={`${styles.cardPhoto} block`} aria-label={`Découvrir le campus de ${campus.city}`}><Image src={campus.image.src} alt={campus.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: campus.image.position }} /></Link>
              <div className={styles.cardTitle}><Image src={campus.picto.src} alt="" width={64} height={64} /><div><h2>{campus.city}</h2><p>{campus.district}</p></div></div>
              <div className={styles.cardBody}><p>{campus.intro}</p></div>
              <div className={styles.actions}><ButtonLink href={campus.route} size="lg">Découvrir {campus.city}</ButtonLink><Link href={`${campus.route}#acces`} className={styles.textLink}>Accès et contacts</Link></div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection id="comparer" title="Choisir votre cadre de vie." intro="Les informations utiles, campus par campus.">
        <table className={styles.comparison}>
          <caption className="sr-only">Comparer les campus de Casablanca et Rabat</caption>
          <thead><tr><th scope="col">Votre campus</th>{migratedCampuses.map((campus) => <th key={campus.slug} scope="col">{campus.city}</th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">Le lieu</th>{migratedCampuses.map((campus) => <td key={campus.slug} data-campus={campus.city}>{campus.district}<br />{campus.address.join(', ')}</td>)}</tr>
            <tr><th scope="row">Les niveaux</th>{migratedCampuses.map((campus) => <td key={campus.slug} data-campus={campus.city}>{campus.levels.title}<small>{campus.levels.review ? 'Dernière année secondaire ouverte à confirmer auprès du campus.' : 'De 2 à 18 ans, jusqu’à la fin du secondaire.'}</small></td>)}</tr>
            <tr><th scope="row">Au quotidien</th>{migratedCampuses.map((campus) => <td key={campus.slug} data-campus={campus.city}>{campus.services.map((service) => service.summary ?? service.title).join(', ')}.<small><Link href={`${campus.route}#vie-pratique`} className={styles.textLink}>Services et horaires</Link></small></td>)}</tr>
            <tr><th scope="row">Un contact</th>{migratedCampuses.map((campus) => <td key={campus.slug} data-campus={campus.city}><a href={campus.contacts[0].phones[0].href} className={styles.contactLink}>{campus.contacts[0].phones[0].display}</a><Link href={`${campus.route}#acces`} className={styles.textLink}>Tous les services</Link></td>)}</tr>
          </tbody>
        </table>
      </PageSection>
      <PageSection title="Le même projet, dans les deux villes." tone="paper">
        <TextBlock paragraphs={['Les deux campus suivent le programme de la Fédération Wallonie-Bruxelles. Le français est la langue d’enseignement, dans un réseau qui associe exigence, bienveillance et ouverture sur son environnement.', 'Les admissions suivent une procédure commune. Le campus et le niveau demandés restent déterminants pour la disponibilité des places et la suite du dossier.']} />
        <LinkList items={[{ label: 'Le projet pédagogique', href: routes.pedagogie }, { label: 'Comprendre les admissions', href: routes.comprendre }]} />
      </PageSection>
      <SplitSection title="À Casablanca, la classe s’ouvre sur la nature." paragraphs={[migratedCampuses[0].feature.text]} image={migratedCampuses[0].feature.image}>
        <Link href={routes.ecoleDuDehors} className={styles.textLink}>Découvrir l’école du dehors</Link>
      </SplitSection>
      <PageSection id="acces" title="Votre premier contact, au bon endroit." intro="Les adresses et les équipes des deux campus. Les liens cartographiques recherchent l’adresse publiée ; ils ne constituent pas un plan des entrées et du stationnement.">
        <div className={styles.contactGrid}>{migratedCampuses.map((campus) => <CampusContact key={campus.slug} campus={campus} />)}</div>
      </PageSection>
      <PageActions title="Et la prochaine étape ?" text="Découvrez les conditions d’admission et contactez le campus pour une demande de visite. Les visites restent réservées aux familles ayant déposé une candidature." primary={{ label: 'Comprendre les admissions', href: routes.comprendre }} secondary={{ label: 'Contacter un campus', href: routes.contact }} />
    </>
  )
}

export function CampusDetail({ campus }: { campus: MigratedCampus }) {
  return (
    <>
      <InnerHero title={campus.title} intro={campus.intro} image={campus.image} breadcrumb={[{ label: 'Nos campus', href: routes.campus }, { label: campus.city }]}>
        <div className={styles.actions}><Image src={campus.picto.src} alt={`Pictogramme EBM de ${campus.city}`} width={72} height={72} /><ButtonLink size="lg" href="#acces">Contacter le campus</ButtonLink></div>
      </InnerHero>
      <SectionNav items={[{ label: 'Le campus', href: '#campus' }, { label: 'Les espaces', href: '#espaces' }, { label: 'Vie pratique', href: '#vie-pratique' }, { label: 'Accès et contacts', href: '#acces' }]} />
      <PageSection id="campus" title={`Grandir à ${campus.district}.`} intro={campus.description}>
        <FactList items={campus.facts} />
        <TextBlock><h3 className="mt-10 text-title font-bold">{campus.levels.title}</h3><p>{campus.levels.detail}</p></TextBlock>
        {campus.levels.review ? <ReviewNote title="Niveaux à confirmer">{campus.levels.review}</ReviewNote> : null}
      </PageSection>
      <PageSection title="Le mot de l’équipe.">
        <ReviewNote title="À compléter avec le campus">[Message d’accueil, nom et portrait de la direction du campus de {campus.city} à fournir par EBM.]</ReviewNote>
      </PageSection>
      <PageSection id="espaces" title="Des lieux pour apprendre et se retrouver." tone="paper">
        <PhotoGallery images={campus.gallery} />
      </PageSection>
      <SplitSection title={campus.feature.title} paragraphs={[campus.feature.text]} image={campus.feature.image} reverse>
        <Link className={styles.textLink} href={campus.feature.href}>{campus.feature.label}</Link>
      </SplitSection>
      <PageSection title="Les repères du campus.">
        <dl className={styles.history}>{campus.history.map((item) => <div key={item.date}><dt>{item.date}</dt><dd>{item.text}</dd></div>)}</dl>
      </PageSection>
      <PageSection id="vie-pratique" title="La journée, côté pratique." intro="Cantine, activités et accueil autour de la classe. Le campus vous précise les modalités adaptées à votre enfant." tone="paper">
        <div className={styles.services}>{campus.services.map((service) => <div key={service.title}><h3>{service.title}</h3><p>{service.text}</p></div>)}</div>
        <details className={styles.disclosure}>
          <summary>Consulter les horaires publiés, à confirmer</summary>
          <p>{campus.timetableReview}</p>
          <div className={styles.timetables}>{campus.timetable.map((group) => <div key={group.group}><h4>{group.group}</h4><dl className={styles.timetable}>{group.rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></div>)}</div>
        </details>
      </PageSection>
      <PageSection id="agenda" title={`Les rendez-vous de ${campus.city}.`}>
        <div className={styles.empty}><p>Aucun événement public à venir n’est confirmé pour ce campus dans cette version du site. Le calendrier scolaire commun reste disponible.</p><Link href={routes.calendrier} className={styles.textLink}>Consulter le calendrier scolaire</Link></div>
      </PageSection>
      <PageSection title="La vie du réseau en images." tone="paper">
        <TextBlock paragraphs={['Retrouvez les publications des Écoles Belges au Maroc sur leurs comptes officiels. Le fil Instagram n’est pas encore intégré à cette page.']} />
        <LinkList items={[{ label: 'Suivre les EBM sur Instagram', href: site.instagram.url, external: true }, { label: `Le campus de ${campus.city} sur Facebook`, href: campus.facebook, external: true }]} />
      </PageSection>
      <PageSection id="acces" title={`Venir à ${campus.district}.`}>
        <CampusContact campus={campus} showTitle={false} />
        <ReviewNote title="Plan du campus">[Plan public des entrées, de l’accueil, du stationnement et du parcours visiteur à fournir et valider par EBM.] En attendant, le lien Google Maps recherche l’adresse publiée, sans indication d’entrée ou de parking.</ReviewNote>
      </PageSection>
      <PageActions title={`Rencontrons-nous à ${campus.city}.`} text="Les visites sont réservées aux familles ayant déjà déposé une candidature. Contactez le campus pour demander les conditions et un rendez-vous ; aucune réservation n’est confirmée par ce site." primary={{ label: 'Demander une visite par e-mail', href: campusRequestHref(campus, 'Demande de visite après candidature') }} secondary={{ label: 'Candidater', href: `${routes.candidater}?campus=${campus.slug}` }} />
    </>
  )
}

export function ContactPage({ initialCampus, initialSubject }: { initialCampus?: 'casablanca' | 'rabat'; initialSubject?: string }) {
  return (
    <>
      <InnerHero title="Parlons de votre enfant." intro="Une question sur un dossier, la vie scolaire ou une visite ? Retrouvez directement le bon service, à Casablanca ou à Rabat." breadcrumb={[{ label: 'Contact' }]} />
      <SectionNav items={[{ label: 'Casablanca', href: '#casablanca' }, { label: 'Rabat', href: '#rabat' }, { label: 'Préparer un e-mail', href: '#ecrire' }, { label: 'Liens utiles', href: '#liens-utiles' }]} />
      <PageSection title="Choisissez votre campus.">
        <div className={styles.contactGrid}>{migratedCampuses.map((campus) => <section key={campus.slug} id={campus.slug} className="scroll-mt-28"><CampusContact campus={campus} /></section>)}</div>
      </PageSection>
      <PageSection id="ecrire" title="Écrire au bon service." tone="paper"><ContactComposer key={`${initialCampus ?? 'all'}-${initialSubject ?? 'general'}`} recipients={campusContactRecipients} initialCampus={initialCampus} initialSubject={initialSubject} /></PageSection>
      <PageSection title="Avant de vous déplacer.">
        <TextBlock paragraphs={['Les adresses ci-dessus permettent de rechercher chaque campus dans Google Maps. Elles ne remplacent pas des consignes d’accès ou un plan des entrées : l’équipe du campus vous les précise lors de votre rendez-vous.', 'Les visites sont actuellement réservées aux familles qui ont déposé une candidature. Les horaires de classe ne sont pas les horaires d’accueil administratif ; contactez le service avant de venir.']} />
        <LinkList items={migratedCampuses.map((campus) => ({ label: `Découvrir le campus de ${campus.city}`, href: campus.route }))} />
      </PageSection>
      <PageSection id="liens-utiles" title="Trouver votre réponse plus vite." tone="paper">
        <LinkList items={[{ label: 'Les questions fréquentes', href: routes.faq, description: 'Admissions, parcours et vie scolaire.' }, { label: 'Demander une visite', href: routes.reserverVisite, description: 'Conditions et prise de contact, après candidature.' }, { label: 'Candidater en ligne', href: routes.candidater, description: 'Préparer et déposer votre demande.' }, { label: 'L’école du dehors', href: routes.ecoleDuDehors, description: 'Découvrir l’apprentissage dehors à Casablanca.' }, { label: 'Suivre les EBM sur Instagram', href: site.instagram.url, external: true }]} />
      </PageSection>
    </>
  )
}
