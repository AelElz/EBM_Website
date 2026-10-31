import { admissionExtras } from '@/cms/admission-extras'

import { CmsAnchor } from '@/cms/link'
import { pageCopyDefaults } from '@/cms/page-defaults'
import { getAdmissions } from '@/cms/admissions'
import { getCmsContent } from '@/cms/server'
import Link from '@/cms/link'

import { InnerHero, PageSection, ReviewNote, TextBlock, SectionNav, DisclosureList, LinkList } from '@/components/inner/blocks'
import { AdmissionsContacts } from '@/components/inner/admissions/shared'
import { FaqBrowser } from '@/components/inner/admissions/faq-browser'
import { admissionsFaqs as defaultFaqs, faqCategories as defaultCategories } from '@/content/migration/admissions-faq'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import { site as defaultSite } from '@/content/site'
import styles from '@/components/inner/admissions/admissions.module.css'

/*
 * /admissions, 30 Oct 2026 (Ayoub: remove the pages that repeat each other, "make a good user
 * experience specially on understanding which page need to go"). This page now holds what
 * /admissions/comprendre held (the seven steps, the levels, the special cases, the questions),
 * with the same section ids, so the old addresses and their anchors redirect here
 * (next.config.ts). It opens with "Par où commencer ?": the four moments of a candidature in
 * order. Visits moved to /calendrier#visite; the former /admissions/candidater is the
 * #candidater section (its other parts repeated Documents & frais and this page).
 */

export const metadata = pageMetadata({ title: 'Admissions', description: 'Candidater aux Écoles Belges au Maroc : les sept étapes, les conditions selon le niveau, les réponses aux questions des familles et les contacts à Casablanca et Rabat.', path: '/admissions', index: false })



export default async function AdmissionsPage() {
  const { pageCopy: copy } = await getCmsContent('admissions', { pageCopy: pageCopyDefaults.pageCopy })
  const { journey } = await getCmsContent('admissions', { journey: admissionExtras.journey })
  const [{ admissionSteps, admissionLevelRequirements, admissionCategories, admissionsCampaign }, { items: admissionsFaqs, categories: faqCategories }, site] = await Promise.all([getAdmissions(), getCmsContent('admissionsFaq', { items: defaultFaqs, categories: defaultCategories }), getCmsContent('site', defaultSite)])
  return <>
    <InnerHero title={copy.titre01} intro={copy.intro02} breadcrumb={[{ label: 'Admissions' }]} image={{ src: '/images/hero-rabat-entree.jpg', alt: 'L’entrée de l’École belge de Rabat, à Hay Riad.', width: 1448, height: 1086, position: '50% 50%' }} />
    <SectionNav items={[{ label: 'Par où commencer', href: '#commencer' }, { label: 'Les sept étapes', href: '#parcours' }, { label: 'Selon le niveau', href: '#niveaux' }, { label: 'Conditions', href: '#conditions' }, { label: 'Candidater', href: '#candidater' }, { label: 'Questions fréquentes', href: '#faq' }, { label: 'Contacts', href: '#contacts' }]} />

    <PageSection id="commencer" title={copy.titre03} intro={copy.intro04}>
      <ol className={styles.overview}>
        {journey.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link href={item.link.href} className={styles.journeyLink}>{item.link.label}</Link></li>)}
      </ol>
    </PageSection>

    <PageSection title={copy.titre05} tone="paper">
      <TextBlock paragraphs={[copy.paragraphe06, copy.paragraphe07]} />
    </PageSection>

    <PageSection id="parcours" title={copy.titre08}>
      <ol className={styles.steps}>{admissionSteps.map(step => <li key={step.title} className={styles.step}><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </PageSection>

    <PageSection id="niveaux" title={copy.titre09} intro={copy.intro10} tone="paper">
      <div className={styles.levels}>{admissionLevelRequirements.map(item => <article key={item.level} className={styles.level}><span className={styles.levelLabel}>{item.level}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      <TextBlock paragraphs={[copy.paragraphe11]} />
    </PageSection>

    <PageSection id="conditions" title={copy.titre12} intro={copy.intro13}>
      <DisclosureList items={admissionCategories} />
      <ReviewNote title={copy.titre14}>{copy.texte15}</ReviewNote>
    </PageSection>

    <PageSection id="dates" title={admissionsCampaign.title} tone="cream">
      <TextBlock paragraphs={[admissionsCampaign.text]} />
      <ReviewNote title={copy.titre16}>{copy.texte17}</ReviewNote>
      <LinkList items={[{ label: 'Calendrier & visites', href: routes.calendrier, description: 'Les dates de l’année scolaire et la demande de visite.' }]} />
    </PageSection>

    <PageSection id="candidater" title={copy.titre18} intro={copy.intro19} tone="paper">
      <div className={styles.summary}>
        <article><h3>{copy.texte20}</h3><p>{copy.texte21}</p></article>
        <article><h3>{copy.texte22}</h3><p>{copy.texte23}</p></article>
        <article><h3>{copy.texte24}</h3><p>{copy.texte25}<Link href={routes.documentsEtFrais}>{copy.texte26}</Link>{copy.texte27}</p></article>
      </div>
      <div className={styles.applyPanel}><h2>{copy.texte28}</h2><p>{copy.texte29}<strong>{site.eduka.host}</strong></p><CmsAnchor href={site.eduka.applicationUrl}>{copy.texte30}</CmsAnchor></div>
      <p className={styles.help}>{copy.texte31}<Link href={routes.espaceEduka}>{copy.texte32}</Link>{copy.texte33}</p>
    </PageSection>

    <PageSection id="faq" title={copy.titre34} intro={copy.intro35} >
      <FaqBrowser items={admissionsFaqs} categories={faqCategories} />
    </PageSection>

    <PageSection id="contacts" title={copy.titre36} intro={copy.intro37}>
      <AdmissionsContacts />
    </PageSection>

  </>
}
