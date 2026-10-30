import Link from 'next/link'

import { InnerHero, PageSection, ReviewNote, TextBlock, SectionNav, DisclosureList, PageActions, LinkList } from '@/components/inner/blocks'
import { AdmissionsContacts } from '@/components/inner/admissions/shared'
import { FaqBrowser } from '@/components/inner/admissions/faq-browser'
import { admissionSteps, admissionLevelRequirements, admissionCategories, admissionsCampaign } from '@/content/migration/admissions'
import { admissionsFaqs, faqCategories } from '@/content/migration/admissions-faq'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import styles from '@/components/inner/admissions/admissions.module.css'

/*
 * /admissions, 30 Oct 2026 (Ayoub: remove the pages that repeat each other, "make a good user
 * experience specially on understanding which page need to go"). This page now holds what
 * /admissions/comprendre held (the seven steps, the levels, the special cases, the questions),
 * with the same section ids, so the old addresses and their anchors redirect here
 * (next.config.ts). It opens with "Par où commencer ?": the four moments of a candidature in
 * order, each with the one page that serves it. Visits moved to /calendrier#visite.
 */

export const metadata = pageMetadata({ title: 'Admissions', description: 'Candidater aux Écoles Belges au Maroc : les sept étapes, les conditions selon le niveau, les réponses aux questions des familles et les contacts à Casablanca et Rabat.', path: '/admissions', index: false })

const journey = [
  { title: 'Comprendre', text: 'Les sept étapes, l’âge d’entrée et les conditions selon le niveau. C’est sur cette page.', link: { label: 'Les sept étapes', href: '#parcours' } },
  { title: 'Préparer le dossier', text: 'La liste des pièces à réunir et le barème des frais.', link: { label: 'Documents & frais', href: routes.documentsEtFrais } },
  { title: 'Rencontrer l’école', text: 'Les dates de l’année et la demande de visite auprès de votre campus.', link: { label: 'Calendrier & visites', href: routes.reserverVisite } },
  { title: 'Candidater', text: 'Le dépôt du dossier en ligne, sur Eduka.', link: { label: 'Candidater en ligne', href: routes.candidater } },
]

export default function AdmissionsPage() {
  return <>
    <InnerHero title="Faire le premier pas, ensemble." intro="Choisir une école, c’est choisir un cadre pour grandir. Tout ce qu’il faut savoir pour candidater est ici, étape par étape." breadcrumb={[{ label: 'Admissions' }]} image={{ src: '/images/hero-rabat-entree.jpg', alt: 'L’entrée de l’École belge de Rabat, à Hay Riad.', width: 1448, height: 1086, position: '50% 50%' }} />
    <SectionNav items={[{ label: 'Par où commencer', href: '#commencer' }, { label: 'Les sept étapes', href: '#parcours' }, { label: 'Selon le niveau', href: '#niveaux' }, { label: 'Conditions', href: '#conditions' }, { label: 'Questions fréquentes', href: '#faq' }, { label: 'Contacts', href: '#contacts' }]} />

    <PageSection id="commencer" title="Par où commencer ?" intro="Une candidature se fait en quatre moments. Chacun a sa page.">
      <ol className={styles.overview}>
        {journey.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link href={item.link.href} className={styles.journeyLink}>{item.link.label}</Link></li>)}
      </ol>
    </PageSection>

    <PageSection title="À quel moment rejoindre les EBM ?" tone="paper">
      <TextBlock paragraphs={['L’entrée est possible dès 2 ans révolus en classe d’accueil, puis jusqu’à la première secondaire (S1), sous réserve des places disponibles. Au-delà de S1, les règles publiées prévoient l’accueil d’élèves provenant d’un établissement scolaire belge.', 'Le niveau demandé dépend de l’année de naissance. À partir de P2, la décision du conseil de classe de l’établissement d’origine entre aussi en compte. Le campus examine votre situation et confirme la classe accessible.']} />
    </PageSection>

    <PageSection id="parcours" title="Les sept étapes de votre parcours">
      <ol className={styles.steps}>{admissionSteps.map(step => <li key={step.title} className={styles.step}><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </PageSection>

    <PageSection id="niveaux" title="Un échange adapté à l’âge de votre enfant" intro="La forme de l’observation ou de l’analyse dépend du niveau demandé et des places disponibles." tone="paper">
      <div className={styles.levels}>{admissionLevelRequirements.map(item => <article key={item.level} className={styles.level}><span className={styles.levelLabel}>{item.level}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      <TextBlock paragraphs={['Pour un enfant venant d’une école officielle à programme de la Fédération Wallonie-Bruxelles, le processus actuel prévoit une analyse sur dossier scolaire, comprenant au minimum les deux dernières années. Le campus confirme les conditions et les documents attendus.']} />
    </PageSection>

    <PageSection id="conditions" title="Les situations particulières" intro="Les catégories ci-dessous reprennent les conditions du site public. Elles ne constituent pas une promesse d’admission.">
      <DisclosureList items={admissionCategories} />
      <ReviewNote title="Conditions à valider pour la campagne">Les modalités des fratries, les admissions sur dossier et la condition de deux années en école belge doivent être confirmées avec le service admissions.</ReviewNote>
    </PageSection>

    <PageSection id="dates" title={admissionsCampaign.title} tone="cream">
      <TextBlock paragraphs={[admissionsCampaign.text]} />
      <ReviewNote title="Campagne en cours à préciser">Aucune période actuelle de dépôt n’a été confirmée pour cette version. Les anciennes affiches d’admission de 2024 et 2025 ne sont pas utilisées comme dates à venir.</ReviewNote>
      <LinkList items={[{ label: 'Calendrier & visites', href: routes.calendrier, description: 'Les dates de l’année scolaire et la demande de visite.' }]} />
    </PageSection>

    <PageSection id="faq" title="Vos questions, nos réponses" intro="Cherchez un mot ou choisissez un thème. Les informations pratiques qui diffèrent entre les sources sont signalées dans la réponse." tone="paper">
      <FaqBrowser items={admissionsFaqs} categories={faqCategories} />
    </PageSection>

    <PageSection id="contacts" title="Une question qui reste ouverte ?" intro="Votre campus précise les conditions et les modalités propres au dossier de votre enfant. À Casablanca, choisissez la section concernée.">
      <AdmissionsContacts />
    </PageSection>

    <PageActions title="Prêt à préparer le dossier ?" text="Réunissez les pièces utiles avant de déposer votre candidature sur Eduka. L’école confirme le niveau, les places disponibles et les prochaines étapes." primary={{ label: 'Voir les documents et les frais', href: routes.documentsEtFrais }} secondary={{ label: 'Candidater en ligne', href: routes.candidater }} />
  </>
}
