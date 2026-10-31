import { pageCopyDefaults } from '@/cms/page-defaults'
import { getCampuses, contactRecipients } from '@/cms/campuses'
import { getCmsContent } from '@/cms/server'
import { InnerHero, PageSection, SectionNav, LinkList, TextBlock } from '@/components/inner/blocks'
import { site as defaultSite } from '@/content/site'
import { routes } from '@/lib/routes'

import { CampusContact } from './campus-contact'
import { ContactComposer } from './contact-composer'
import styles from './campuses.module.css'

export async function ContactPage({ initialCampus, initialSubject }: { initialCampus?: 'casablanca' | 'rabat'; initialSubject?: string }) {
  const { contactCopy: copy } = await getCmsContent('admissions', { contactCopy: pageCopyDefaults.contactCopy })
  const [migratedCampuses, site] = await Promise.all([getCampuses(), getCmsContent('site', defaultSite)])
  const campusContactRecipients = contactRecipients(migratedCampuses)
  return (
    <>
      <InnerHero title={copy.titre01} intro={copy.intro02} breadcrumb={[{ label: 'Contact' }]} />
      <SectionNav items={[{ label: 'Casablanca', href: '#casablanca' }, { label: 'Rabat', href: '#rabat' }, { label: 'Préparer un e-mail', href: '#ecrire' }, { label: 'Liens utiles', href: '#liens-utiles' }]} />
      <PageSection title={copy.titre03}>
        <div className={styles.contactGrid}>{migratedCampuses.map((campus) => <section key={campus.slug} id={campus.slug} className="scroll-mt-28"><CampusContact campus={campus} /></section>)}</div>
      </PageSection>
      <PageSection id="ecrire" title={copy.titre04} tone="paper"><ContactComposer key={`${initialCampus ?? 'all'}-${initialSubject ?? 'general'}`} recipients={campusContactRecipients} initialCampus={initialCampus} initialSubject={initialSubject} /></PageSection>
      <PageSection title={copy.titre05}>
        <TextBlock paragraphs={[copy.paragraphe06, copy.paragraphe07]} />
        <LinkList items={migratedCampuses.map((campus) => ({ label: `Découvrir le campus de ${campus.city}`, href: campus.route }))} />
      </PageSection>
      <PageSection id="liens-utiles" title={copy.titre08} tone="paper">
        <LinkList items={[{ label: 'Les questions fréquentes', href: routes.faq, description: 'Admissions, parcours et vie scolaire.' }, { label: 'Demander une visite', href: routes.reserverVisite, description: 'Conditions et prise de contact, après candidature.' }, { label: 'Candidater en ligne', href: routes.candidater, description: 'Préparer et déposer votre demande.' }, { label: 'L’école du dehors', href: routes.ecoleDuDehors, description: 'Découvrir l’apprentissage dehors à Casablanca.' }, { label: 'Suivre les EBM sur Instagram', href: site.instagram.url, external: true }]} />
      </PageSection>
    </>
  )
}
