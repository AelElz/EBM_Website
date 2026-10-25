import { InnerHero, PageSection, ReviewNote, TextBlock, SectionNav, DisclosureList, PageActions } from '@/components/inner/blocks'
import { AdmissionsContacts } from '@/components/inner/admissions/shared'
import { FaqBrowser } from '@/components/inner/admissions/faq-browser'
import { admissionSteps, admissionLevelRequirements, admissionCategories, admissionsCampaign } from '@/content/migration/admissions'
import { admissionsFaqs, faqCategories } from '@/content/migration/admissions-faq'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Comprendre les admissions', description: 'Les sept étapes de candidature, les conditions par niveau et les réponses aux questions des familles des EBM.', path: '/admissions/comprendre', index: false })

export default function ComprendrePage() {
 return <>
  <InnerHero title="Une candidature, pas à pas." intro="De la première question à l’inscription, le parcours permet à la famille et à l’école de faire connaissance et de préparer une intégration cohérente." breadcrumb={[{ label: 'Admissions', href: '/admissions' }, { label: 'Comprendre' }]} />
  <SectionNav items={[{ label: 'Les sept étapes', href: '#parcours' }, { label: 'Selon le niveau', href: '#niveaux' }, { label: 'Conditions', href: '#conditions' }, { label: 'Questions fréquentes', href: '#faq' }]} />
  <PageSection title="À quel moment rejoindre les EBM ?">
   <TextBlock paragraphs={['L’entrée est possible dès 2 ans révolus en classe d’accueil, puis jusqu’à la première secondaire (S1), sous réserve des places disponibles. Au-delà de S1, les règles publiées prévoient l’accueil d’élèves provenant d’un établissement scolaire belge.', 'Le niveau demandé dépend de l’année de naissance. À partir de P2, la décision du conseil de classe de l’établissement d’origine entre aussi en compte. Le campus examine votre situation et confirme la classe accessible.']} />
  </PageSection>
  <PageSection id="parcours" title="Les sept étapes de votre parcours" tone="paper">
   <ol className={styles.steps}>{admissionSteps.map(step => <li key={step.title} className={styles.step}><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
  </PageSection>
  <PageSection id="niveaux" title="Un échange adapté à l’âge de votre enfant" intro="La forme de l’observation ou de l’analyse dépend du niveau demandé et des places disponibles.">
   <div className={styles.levels}>{admissionLevelRequirements.map(item => <article key={item.level} className={styles.level}><span className={styles.levelLabel}>{item.level}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
   <TextBlock paragraphs={['Pour un enfant venant d’une école officielle à programme de la Fédération Wallonie-Bruxelles, le processus actuel prévoit une analyse sur dossier scolaire, comprenant au minimum les deux dernières années. Le campus confirme les conditions et les documents attendus.']} />
  </PageSection>
  <PageSection id="conditions" title="Les situations particulières" intro="Les catégories ci-dessous reprennent les conditions du site public. Elles ne constituent pas une promesse d’admission." tone="cream">
   <DisclosureList items={admissionCategories} />
   <ReviewNote title="Conditions à valider pour la campagne">Les modalités des fratries, les admissions sur dossier et la condition de deux années en école belge doivent être confirmées avec le service admissions.</ReviewNote>
  </PageSection>
  <PageSection title={admissionsCampaign.title}><TextBlock paragraphs={[admissionsCampaign.text]} /><ReviewNote>Aucune date d’admission actuelle n’est publiée ici tant que la campagne et les disponibilités n’ont pas été confirmées.</ReviewNote></PageSection>
  <PageSection id="faq" title="Vos questions, nos réponses" intro="Cherchez un mot ou choisissez un thème. Les informations pratiques qui diffèrent entre les sources sont signalées dans la réponse." tone="paper"><FaqBrowser items={admissionsFaqs} categories={faqCategories} /></PageSection>
  <PageSection title="Une question qui reste ouverte ?" intro="Votre campus peut préciser les conditions et les modalités propres au dossier de votre enfant."><AdmissionsContacts /></PageSection>
  <PageActions title="Préparer votre dossier" primary={{ label: 'Voir les documents et les frais', href: '/admissions/documents-et-frais' }} secondary={{ label: 'Candidater', href: '/admissions/candidater' }} />
 </>
}
