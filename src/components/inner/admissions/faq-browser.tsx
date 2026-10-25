'use client'

import { useEffect, useMemo, useState } from 'react'
import type { AdmissionsFaq } from '@/content/migration/admissions-faq'
import styles from './admissions.module.css'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').replaceAll('’', "'")
export function FaqBrowser({ items, categories }: { items: AdmissionsFaq[]; categories: readonly string[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Toutes les questions')
  useEffect(() => {
    let frame = 0
    const revealHash = () => {
      let id = window.location.hash.slice(1)
      try { id = decodeURIComponent(id) } catch { return }
      if (!id.startsWith('faq-')) return
      setQuery('')
      setCategory('Toutes les questions')
      frame = requestAnimationFrame(() => {
        const item = document.getElementById(id)
        if (item instanceof HTMLDetailsElement) { item.open = true; item.scrollIntoView({ block: 'start', behavior: 'instant' }) }
      })
    }
    revealHash()
    window.addEventListener('hashchange', revealHash)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', revealHash) }
  }, [])
  const visibleIds = useMemo(() => new Set(items.filter(item => (category === 'Toutes les questions' || item.category === category) && normalize(`${item.question} ${item.answer}`).includes(normalize(query.trim()))).map(item => item.id)), [items, category, query])
  return <div>
    <div className={styles.faqFilters}>
      <label className={styles.field}>Chercher une réponse<input name="faq-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Visite, dossier, cantine…" autoComplete="off" /></label>
      <label className={styles.field}>Thème<select name="faq-category" autoComplete="off" value={category} onChange={event => setCategory(event.target.value)}><option>Toutes les questions</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p role="status" aria-live="polite" className={styles.count}>{visibleIds.size} {visibleIds.size === 1 ? 'réponse' : 'réponses'}</p>
    <div className={styles.faqList}>{items.map(item => <details id={`faq-${item.id}`} key={item.id} name="admissions-faq" className={styles.faq} hidden={!visibleIds.has(item.id)}><summary>{item.question}</summary><div className={styles.faqAnswer}><p>{item.answer}</p>{item.href && <a href={item.href}>En savoir plus</a>}</div></details>)}</div>
    {visibleIds.size === 0 && <p className={styles.empty}>Aucune réponse ne correspond à votre recherche. Essayez un autre mot ou <a href="/contact">contactez votre campus</a>.</p>}
  </div>
}
