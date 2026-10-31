'use client'

import { useState } from 'react'
import { annualTuition as defaultAnnualTuition, feeCategories as defaultFeeCategories, feeLevels as defaultFeeLevels, firstRegistration as defaultFirstRegistration, formatMad, type FeeCategory, type FeeLevel } from '@/content/migration/admissions'
import styles from './admissions.module.css'

const defaultData = { annualTuition: defaultAnnualTuition, feeCategories: defaultFeeCategories, feeLevels: defaultFeeLevels, firstRegistration: defaultFirstRegistration }
export function FeeFinder({ data = defaultData }: { data?: typeof defaultData }) {
  const { annualTuition, feeCategories, feeLevels, firstRegistration } = data
  const [campus, setCampus] = useState('casablanca')
  const [level, setLevel] = useState<FeeLevel>('maternelle')
  const [category, setCategory] = useState<FeeCategory>('standard')
  const annual = annualTuition[level][category]
  const registration = firstRegistration[category][level === 'accueil' ? 'accueil' : 'other']
  return <div className={styles.finder}>
    <div className={styles.filters}>
      <label className={styles.field}>Campus<select name="fee-campus" autoComplete="off" value={campus} onChange={event => setCampus(event.target.value)}><option value="casablanca">Casablanca</option><option value="rabat">Rabat</option></select></label>
      <label className={styles.field}>Niveau demandé<select name="fee-level" autoComplete="off" value={level} onChange={event => setLevel(event.target.value as FeeLevel)}>{feeLevels.map(row => <option key={row.value} value={row.value}>{row.label}</option>)}</select></label>
      <label className={styles.field}>Catégorie tarifaire<select name="fee-category" autoComplete="off" value={category} onChange={event => setCategory(event.target.value as FeeCategory)}>{feeCategories.map(row => <option key={row.value} value={row.value}>{row.label}</option>)}</select></label>
    </div>
    <p className={styles.help}>Barème public sans année scolaire indiquée. La source ne distingue pas les campus : ces montants ne constituent pas un tarif confirmé pour {campus === 'casablanca' ? 'Casablanca' : 'Rabat'}.</p>
    <dl className={styles.results} aria-live="polite" aria-atomic="true">
      <div className={styles.result}><dt>Scolarité annuelle publiée</dt><dd>{annual === null ? <small>Non précisée pour la classe d’accueil</small> : formatMad(annual)}</dd></div>
      <div className={styles.result}><dt>Première inscription, une seule fois</dt><dd>{formatMad(registration)}</dd></div>
    </dl>
    <p className={styles.help}>Montants de consultation, à confirmer par EBM. Les frais annuels de réinscription et les services facultatifs sont présentés séparément ci-dessous. Le droit de première inscription est décrit comme non remboursable.</p>
    {category === 'reduced' && <p className={styles.help}>Le tarif réduit dépend d’un quota et de justificatifs financiers. Dans cette catégorie, la source prévoit pour les enfants belges un droit de première inscription de {formatMad(firstRegistration.belgian[level === 'accueil' ? 'accueil' : 'other'])}. L’école confirme votre situation.</p>}
    <noscript><p className={styles.help}>Le choix interactif nécessite JavaScript. Tous les montants figurent aussi dans les tableaux ci-dessous.</p></noscript>
  </div>
}
