import { InnerHero, PageSection, ReviewNote, TextBlock, SectionNav, PageActions, DisclosureList } from '@/components/inner/blocks'
import { DocumentChecklist } from '@/components/inner/admissions/shared'
import { FeeFinder } from '@/components/inner/admissions/fee-finder'
import { annualTuition, feeCategories, feeLevels, firstRegistration, reEnrolment, formatMad } from '@/content/migration/admissions'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Documents & frais', description: 'Les pièces utiles à une candidature et les barèmes publics de scolarité EBM, dont l’année et les conditions restent à confirmer.', path: '/admissions/documents-et-frais', index: false })

export default function DocumentsPage() {
 return <>
  <InnerHero title="Documents et frais" intro="Retrouvez les pièces à réunir, les catégories du barème public et les points à confirmer avec votre campus avant tout engagement." breadcrumb={[{ label: 'Admissions', href: '/admissions' }, { label: 'Documents & frais' }]} />
  <SectionNav items={[{ label: 'Les frais', href: '#frais' }, { label: 'Conditions', href: '#conditions' }, { label: 'Paiement', href: '#paiement' }, { label: 'Documents', href: '#documents' }]} />
  <PageSection id="frais" title="Consulter le barème retrouvé">
   <ReviewNote title="Année scolaire et tarifs à confirmer par EBM">Le site public ne précise aucune année scolaire pour ce barème. Ces montants servent à la consultation de cette version de travail et ne sont pas présentés comme des tarifs officiels actuels. Leur application au campus et l’éligibilité à chaque catégorie doivent être validées.</ReviewNote>
   <FeeFinder />
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tableau comparatif des frais annuels, défilement horizontal si nécessaire"><table className={styles.table}><caption>Scolarité annuelle publiée · MAD</caption><thead><tr><th scope="col">Niveau</th>{feeCategories.map(cat => <th key={cat.value} scope="col">{cat.label}</th>)}</tr></thead><tbody>{feeLevels.map(level => <tr key={level.value}><th scope="row">{level.label}</th>{feeCategories.map(cat => <td key={cat.value}>{annualTuition[level.value][cat.value] === null ? 'Non précisé' : formatMad(annualTuition[level.value][cat.value]!)}</td>)}</tr>)}</tbody></table></div>
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Droits de première inscription"><table className={styles.table}><caption>Droit de première inscription · une seule fois, non remboursable</caption><thead><tr><th scope="col">Catégorie</th><th scope="col">Classe d’accueil</th><th scope="col">Autres niveaux</th></tr></thead><tbody>{feeCategories.map(category => <tr key={category.value}><th scope="row">{category.label}</th><td>{formatMad(firstRegistration[category.value].accueil)}</td><td>{formatMad(firstRegistration[category.value].other)}</td></tr>)}</tbody></table></div>
   <p className={styles.help}>Dans la rubrique du tarif réduit, le barème précise que les enfants belges restent soumis au droit de première inscription « enfants belges » : 7 000 MAD en accueil et 10 000 MAD aux autres niveaux.</p>
  </PageSection>
  <PageSection id="conditions" title="Ce qui dépend de votre situation" tone="paper">
   <DisclosureList items={[
    { question: 'Le tarif réduit', answer: 'Il est accordé dans la limite d’un quota. La famille le demande dans la candidature, puis transmet un dossier justificatif de sa capacité financière ; les pièces sont indiquées par les services EBM. Aucune éligibilité automatique n’est calculée sur ce site.' },
    { question: 'Les fratries', answer: 'La rubrique standard prévoit une réduction du droit de première inscription de 20 % pour le deuxième enfant et de 50 % au-delà. Cette condition n’est pas étendue aux autres catégories ni aux frais annuels de scolarité sans confirmation de l’école.' },
    { question: 'La catégorie enfants belges', answer: 'Le droit annuel de réinscription est exigible lorsqu’il est pris en charge par l’employeur d’un parent ou du tuteur légal. Une avance équivalente à ce droit est demandée pour valider l’inscription ; en l’absence de prise en charge par l’employeur, cette somme est déduite des frais de scolarité du premier trimestre. L’école confirme le montant et l’application à votre situation.' },
   ]} />
  </PageSection>
  <PageSection id="paiement" title="Paiements et réinscription">
   <TextBlock paragraphs={['Le barème décrit un règlement de la scolarité annuelle en trois versements trimestriels. Les dates exactes, les moyens de paiement et les coordonnées de règlement doivent être communiqués par EBM.', 'À partir de la deuxième année de scolarité, les rubriques standard et réduit prévoient un droit annuel de réinscription payable en avril, non remboursable. L’année et la politique applicables doivent être confirmées.']} />
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Droits annuels de réinscription"><table className={styles.table}><caption>Réinscription annuelle publiée · MAD</caption><thead><tr><th scope="col">Catégorie</th><th scope="col">Maternelle</th><th scope="col">Primaire</th><th scope="col">Secondaire</th></tr></thead><tbody>{(['standard', 'reduced'] as const).map(category => <tr key={category}><th scope="row">{category === 'standard' ? 'Standard' : 'Réduit'}</th><td>{formatMad(reEnrolment[category].maternelle)}</td><td>{formatMad(reEnrolment[category].primaire)}</td><td>{formatMad(reEnrolment[category].secondaire)}</td></tr>)}</tbody></table></div>
   <p className={styles.help}>La classe d’accueil ne dispose pas d’un montant annuel de scolarité séparé dans la source. L’ancien montant mensuel de 4 440 MAD n’est ni annualisé ni combiné à ce barème.</p>
  </PageSection>
  <PageSection title="Les services facultatifs" tone="cream"><TextBlock paragraphs={['Cantine, transport et activités extrascolaires relèvent de modalités distinctes de la scolarité. Leurs coûts ne sont pas ajoutés ici : aucun barème de service actuel n’a été fourni.', 'Le campus ou le prestataire concerné vous communique les disponibilités, le contrat et le tarif applicables.']} /></PageSection>
  <PageSection id="documents" title="Les pièces à préparer" intro="Cette liste commune vous aide à anticiper le dossier. Eduka et le service admissions confirment les pièces attendues pour votre situation.">
   <DocumentChecklist />
   <ReviewNote title="Vérifier les consignes de téléversement">Les anciennes pages demandent des documents scannés en PDF A4, hors photo de l’élève, et refusent les captures d’écran. Les formats et les limites actuels d’Eduka restent à vérifier. Aucun téléversement n’est collecté sur ce site.</ReviewNote>
   <p className={styles.help}>Aucun PDF officiel dédié aux tarifs, au paiement ou à cette liste de pièces n’a été trouvé. Aucun document de substitution n’est présenté comme officiel.</p>
  </PageSection>
  <PageActions title="Tout est plus clair ?" text="Confirmez les montants et les modalités auprès du campus, puis poursuivez votre candidature sur Eduka." primary={{ label: 'Préparer ma candidature', href: '/admissions#candidater' }} secondary={{ label: 'Contacter le campus', href: '/contact' }} />
 </>
}
