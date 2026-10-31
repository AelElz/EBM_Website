import { admissionExtras } from '@/cms/admission-extras'
import { getCmsContent } from '@/cms/server'
import { pageCopyDefaults } from '@/cms/page-defaults'
import { getAdmissions } from '@/cms/admissions'
import { InnerHero, PageSection, ReviewNote, TextBlock, SectionNav, PageActions, DisclosureList } from '@/components/inner/blocks'
import { DocumentChecklist } from '@/components/inner/admissions/shared'
import { FeeFinder } from '@/components/inner/admissions/fee-finder'
import { formatMad } from '@/content/migration/admissions'
import { pageMetadata } from '@/lib/metadata'
import styles from '@/components/inner/admissions/admissions.module.css'

export const metadata = pageMetadata({ title: 'Documents & frais', description: 'Les pièces utiles à une candidature et les barèmes publics de scolarité EBM, dont l’année et les conditions restent à confirmer.', path: '/admissions/documents-et-frais', index: false })

export default async function DocumentsPage() {
  const { documentsCopy: copy } = await getCmsContent('admissions', { documentsCopy: pageCopyDefaults.documentsCopy })
 const { documentsConditions } = await getCmsContent('admissions', { documentsConditions: admissionExtras.documentsConditions })
 const { annualTuition, feeCategories, feeLevels, firstRegistration, reEnrolment } = await getAdmissions()
 return <>
  <InnerHero title={copy.titre01} intro={copy.intro02} breadcrumb={[{ label: 'Admissions', href: '/admissions' }, { label: 'Documents & frais' }]} />
  <SectionNav items={[{ label: 'Les frais', href: '#frais' }, { label: 'Conditions', href: '#conditions' }, { label: 'Paiement', href: '#paiement' }, { label: 'Documents', href: '#documents' }]} />
  <PageSection id="frais" title={copy.titre03}>
   <ReviewNote title={copy.titre04}>{copy.texte05}</ReviewNote>
   <FeeFinder data={{ annualTuition, feeCategories, feeLevels, firstRegistration }} />
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Tableau comparatif des frais annuels, défilement horizontal si nécessaire"><table className={styles.table}><caption>{copy.texte06}</caption><thead><tr><th scope="col">{copy.texte07}</th>{feeCategories.map(cat => <th key={cat.value} scope="col">{cat.label}</th>)}</tr></thead><tbody>{feeLevels.map(level => <tr key={level.value}><th scope="row">{level.label}</th>{feeCategories.map(cat => <td key={cat.value}>{annualTuition[level.value][cat.value] === null ? 'Non précisé' : formatMad(annualTuition[level.value][cat.value]!)}</td>)}</tr>)}</tbody></table></div>
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Droits de première inscription"><table className={styles.table}><caption>{copy.texte08}</caption><thead><tr><th scope="col">{copy.texte09}</th><th scope="col">{copy.texte10}</th><th scope="col">{copy.texte11}</th></tr></thead><tbody>{feeCategories.map(category => <tr key={category.value}><th scope="row">{category.label}</th><td>{formatMad(firstRegistration[category.value].accueil)}</td><td>{formatMad(firstRegistration[category.value].other)}</td></tr>)}</tbody></table></div>
   <p className={styles.help}>{copy.texte12}</p>
  </PageSection>
  <PageSection id="conditions" title={copy.titre13} tone="paper">
   <DisclosureList items={documentsConditions} />
  </PageSection>
  <PageSection id="paiement" title={copy.titre14}>
   <TextBlock paragraphs={[copy.paragraphe15, copy.paragraphe16]} />
   <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Droits annuels de réinscription"><table className={styles.table}><caption>{copy.texte17}</caption><thead><tr><th scope="col">{copy.texte18}</th><th scope="col">{copy.texte19}</th><th scope="col">{copy.texte20}</th><th scope="col">{copy.texte21}</th></tr></thead><tbody>{(['standard', 'reduced'] as const).map(category => <tr key={category}><th scope="row">{category === 'standard' ? 'Standard' : 'Réduit'}</th><td>{formatMad(reEnrolment[category].maternelle)}</td><td>{formatMad(reEnrolment[category].primaire)}</td><td>{formatMad(reEnrolment[category].secondaire)}</td></tr>)}</tbody></table></div>
   <p className={styles.help}>{copy.texte22}</p>
  </PageSection>
  <PageSection title={copy.titre23} tone="cream"><TextBlock paragraphs={[copy.paragraphe24, copy.paragraphe25]} /></PageSection>
  <PageSection id="documents" title={copy.titre26} intro={copy.intro27}>
   <DocumentChecklist />
   <ReviewNote title={copy.titre28}>{copy.texte29}</ReviewNote>
   <p className={styles.help}>{copy.texte30}</p>
  </PageSection>
  <PageActions title={copy.titre31} text="Confirmez les montants et les modalités auprès du campus, puis poursuivez votre candidature sur Eduka." primary={{ label: 'Préparer ma candidature', href: '/admissions#candidater' }} secondary={{ label: 'Contacter le campus', href: '/contact' }} />
 </>
}
