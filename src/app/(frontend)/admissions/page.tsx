import { InnerHero, PageSection, ReviewNote, LinkList, PageActions, TextBlock } from '@/components/inner/blocks'
import { AdmissionsContacts } from '@/components/inner/admissions/shared'
import { admissionsCampaign, visitPolicy } from '@/content/migration/admissions'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Admissions', description: 'Préparer une candidature aux Écoles Belges au Maroc : parcours, documents, frais, calendrier et contacts à Casablanca et Rabat.', path: '/admissions', index: false })

export default function AdmissionsPage() {
  return <>
    <InnerHero title="Faire le premier pas, ensemble." intro="Choisir une école, c’est choisir un cadre pour grandir. Découvrez le projet EBM, préparez votre dossier et échangez avec le campus qui accueillera votre enfant." breadcrumb={[{ label: 'Admissions' }]} image={{ src: '/images/hero-rabat-entree.jpg', alt: 'L’entrée de l’École belge de Rabat, à Hay Riad.', width: 1448, height: 1086, position: '50% 50%' }} />
    <PageSection title="De quoi avez-vous besoin ?">
      <LinkList items={[
        { label: 'Comprendre les admissions', href: '/admissions/comprendre', description: 'Les étapes et les conditions selon le niveau.' },
        { label: 'Calendrier & visites', href: '/calendrier', description: 'Les dates scolaires et les demandes de visite.' },
        { label: 'Candidater', href: '/admissions/candidater', description: 'Préparer le dossier, puis rejoindre Eduka.' },
        { label: 'Documents & frais', href: '/admissions/documents-et-frais', description: 'Les pièces à préparer et le barème à confirmer.' },
        { label: 'Questions fréquentes', href: '/admissions/comprendre#faq', description: 'Chercher une réponse par thème.' },
        { label: 'Contact', href: '/contact', description: 'Échanger avec Casablanca ou Rabat.' },
      ]} />
    </PageSection>
    <PageSection title="Votre candidature en quatre temps" intro="Un aperçu du parcours. L’explication détaillée conserve les sept étapes publiées par les EBM." tone="paper">
      <ol className={styles.overview}>
        <li><h3>Découvrir et échanger</h3><p>Comprenez le projet éducatif et posez vos premières questions au campus.</p></li>
        <li><h3>Déposer le dossier</h3><p>Introduisez votre candidature et les pièces demandées sur Eduka.</p></li>
        <li><h3>Faire connaissance</h3><p>Entretien familial, puis observation ou analyse pédagogique selon le niveau.</p></li>
        <li><h3>Décider et confirmer</h3><p>Décision de la commission, échange pour les familles admises, puis confirmation et formalités.</p></li>
      </ol>
      <LinkList items={[{ label: 'Voir les sept étapes', href: '/admissions/comprendre#parcours' }]} />
    </PageSection>
    <PageSection id="visites" title={visitPolicy.title}>
      <TextBlock paragraphs={[visitPolicy.text, 'La visite ne constitue pas une étape à réserver avant de candidater. Votre campus vous indique la suite et confirme tout rendez-vous.']} />
      <LinkList items={[{ label: 'Préparer une demande de visite', href: '/reserver-une-visite', description: 'Une demande d’échange avec l’équipe, sans créneau inventé.' }]} />
    </PageSection>
    <PageSection id="dates" title={admissionsCampaign.title} tone="cream">
      <TextBlock paragraphs={[admissionsCampaign.text]} />
      <ReviewNote title="Campagne en cours à préciser">Aucune période actuelle de dépôt n’a été confirmée pour cette version. Les anciennes affiches d’admission de 2024 et 2025 ne sont pas utilisées comme dates à venir.</ReviewNote>
      <LinkList items={[{ label: 'Consulter le calendrier scolaire 2026–2027', href: '/calendrier' }]} />
    </PageSection>
    <PageSection title="Notre équipe vous accompagne" intro="Choisissez le campus et, à Casablanca, la section concernée par votre demande."><AdmissionsContacts /></PageSection>
    <PageActions title="Vous souhaitez poursuivre ?" text="Préparez les pièces utiles avant de déposer votre dossier sur Eduka. L’école confirme le niveau, les places disponibles et les prochaines étapes." primary={{ label: 'Préparer ma candidature', href: '/admissions/candidater' }} secondary={{ label: 'Poser une question', href: '/contact' }} />
  </>
}
