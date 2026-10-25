import { InnerHero, PageSection, TextBlock, ReviewNote, PageActions, LinkList } from '@/components/inner/blocks'
import { DocumentChecklist, AdmissionsContacts } from '@/components/inner/admissions/shared'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Candidater en ligne', description: 'Préparer les informations et les documents utiles, puis déposer votre candidature aux EBM sur le portail Eduka.', path: '/admissions/candidater', index: false })

export default function CandidaterPage() {
 return <>
  <InnerHero title="Votre candidature commence ici." intro="Préparez les informations sur votre famille et votre enfant. Le dossier est ensuite complété sur Eduka, le portail utilisé par les Écoles Belges au Maroc." breadcrumb={[{ label: 'Admissions', href: '/admissions' }, { label: 'Candidater' }]} image={{ src: '/images/hero-casablanca-entree.jpg', alt: 'L’entrée du campus EBM de Casablanca, à Dar Bouazza.', width: 1448, height: 1086, position: '50% 45%' }} />
  <PageSection title="Avant d’ouvrir le dossier">
   <div className={styles.summary}>
    <article><h3>Choisir le campus</h3><p>Casablanca ou Rabat : renseignez l’école souhaitée dans votre démarche et échangez avec l’équipe concernée.</p></article>
    <article><h3>Préciser le niveau</h3><p>Préparez la date de naissance et le parcours scolaire. L’école confirme la classe accessible et les places disponibles.</p></article>
    <article><h3>Réunir les pièces</h3><p>Gardez les documents utiles à portée de main. Les pièces exactes et les formats attendus sont précisés dans Eduka.</p></article>
   </div>
   <LinkList items={[{ label: 'Comprendre les sept étapes', href: '/admissions/comprendre#parcours' }, { label: 'Consulter les frais et leurs conditions', href: '/admissions/documents-et-frais#frais' }]} />
  </PageSection>
  <PageSection title="Poursuivre sur le portail Eduka" tone="paper">
   <div className={styles.applyPanel}><h2>Déposer ma candidature sur Eduka</h2><p>Vous rejoignez le formulaire public de candidature des EBM. Les informations familiales, les pièces et le suivi du dossier restent sur le portail de l’école.</p><p>Vérifiez l’adresse : <strong>{site.eduka.host}</strong></p><a href={site.eduka.applicationUrl}>Ouvrir le formulaire Eduka</a></div>
   <p className={styles.help}>Ce lien ouvre le site Eduka. Le dépôt d’un dossier ne garantit pas l’admission. La décision relève de la commission admissions, après les étapes prévues avec l’école.</p>
  </PageSection>
  <PageSection title="Les pièces à préparer" intro="La même liste est utilisée sur la page Documents & frais pour garder des consignes cohérentes.">
   <DocumentChecklist />
   <ReviewNote title="Les consignes actuelles font foi dans Eduka">L’année de référence des bulletins, le seuil du certificat de scolarité et les règles de téléversement doivent être confirmés avec le service admissions. Ce site ne collecte aucun document familial.</ReviewNote>
  </PageSection>
  <PageSection title="Et après le dépôt ?" tone="cream">
   <TextBlock paragraphs={['Le dossier permet à l’école de préparer l’entretien individuel avec la famille, puis l’observation ou l’analyse pédagogique adaptée au niveau demandé. La commission communique ensuite sa décision par courriel.', 'Les échanges de suivi et toute référence de dossier proviennent d’Eduka ou du service admissions. Si vous avez déjà un accès parent, utilisez le portail pour suivre votre démarche.']} />
   <LinkList items={[{ label: 'Rejoindre mon espace Eduka', href: '/espace-eduka' }, { label: 'Revoir le parcours complet', href: '/admissions/comprendre#parcours' }]} />
  </PageSection>
  <PageSection title="Besoin d’aide avant de continuer ?"><AdmissionsContacts /></PageSection>
  <PageActions title="Une dernière question ?" primary={{ label: 'Consulter les questions fréquentes', href: '/admissions/comprendre#faq' }} secondary={{ label: 'Contacter le campus', href: '/contact' }} />
 </>
}
