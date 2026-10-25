import { InnerHero, PageSection, SectionNav, LinkList, TextBlock } from '@/components/inner/blocks'
import { campusContactRecipients, migratedCampuses } from '@/content/migration/campuses'
import { site } from '@/content/site'
import { routes } from '@/lib/routes'

import { CampusContact } from './campus-contact'
import { ContactComposer } from './contact-composer'
import styles from './campuses.module.css'

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
