'use client'
import { CmsAnchor } from '@/cms/link'


import { useEffect, useMemo, useRef, useState } from 'react'
import type { AdmissionsFaq } from '@/content/migration/admissions-faq'
import styles from './admissions.module.css'

/* 31 Oct 2026 (Ayoub): 8 questions first, then 8 more per "Afficher plus", and "Afficher moins"
   once all are shown. The same steps apply to search results and to a theme. */
const STEP = 8

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').replaceAll('’', "'")
export function FaqBrowser({ items, categories }: { items: AdmissionsFaq[]; categories: readonly string[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Toutes les questions')
  const [shown, setShown] = useState(STEP)
  const list = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const revealHash = () => {
      let id = window.location.hash.slice(1)
      try { id = decodeURIComponent(id) } catch { return }
      if (!id.startsWith('faq-')) return
      setQuery('')
      setCategory('Toutes les questions')
      // A link to one question opens enough of the list to show it.
      const index = items.findIndex(item => `faq-${item.id}` === id)
      if (index >= 0) setShown(current => Math.max(current, Math.ceil((index + 1) / STEP) * STEP))
      frame = requestAnimationFrame(() => {
        const item = document.getElementById(id)
        if (item instanceof HTMLDetailsElement) { item.open = true; item.scrollIntoView({ block: 'start', behavior: 'instant' }) }
      })
    }
    revealHash()
    window.addEventListener('hashchange', revealHash)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', revealHash) }
  }, [items])
  const matches = useMemo(() => items.filter(item => (category === 'Toutes les questions' || item.category === category) && normalize(`${item.question} ${item.answer}`).includes(normalize(query.trim()))).map(item => item.id), [items, category, query])
  const visibleIds = useMemo(() => new Set(matches.slice(0, shown)), [matches, shown])
  const remaining = matches.length - visibleIds.size

  function showMore() {
    const firstNew = matches[visibleIds.size]
    setShown(current => current + STEP)
    // Keyboard and screen-reader users land on the first new question.
    requestAnimationFrame(() => document.getElementById(`faq-${firstNew}`)?.querySelector('summary')?.focus({ preventScroll: true }))
  }

  function showLess() {
    setShown(STEP)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => list.current?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }))
  }
  return <div>
    <div className={styles.faqFilters}>
      <label className={styles.field}>Chercher une réponse<input name="faq-query" type="search" value={query} onChange={event => { setQuery(event.target.value); setShown(STEP) }} placeholder="Visite, dossier, cantine…" autoComplete="off" /></label>
      <label className={styles.field}>Thème<select name="faq-category" autoComplete="off" value={category} onChange={event => { setCategory(event.target.value); setShown(STEP) }}><option>Toutes les questions</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p role="status" aria-live="polite" className={styles.count}>{matches.length > visibleIds.size ? `${visibleIds.size} sur ${matches.length} réponses` : `${matches.length} ${matches.length === 1 ? 'réponse' : 'réponses'}`}</p>
    <div ref={list} className={styles.faqList}>{items.map(item => <details id={`faq-${item.id}`} key={item.id} name="admissions-faq" className={styles.faq} hidden={!visibleIds.has(item.id)}><summary>{item.question}</summary><div className={styles.faqAnswer}><p>{item.answer}</p>{item.href && <CmsAnchor href={item.href}>En savoir plus</CmsAnchor>}</div></details>)}</div>
    {matches.length > STEP && (
      <div className={styles.faqMore}>
        {remaining > 0
          ? <button type="button" onClick={showMore}>{remaining > STEP ? `Afficher ${STEP} questions de plus` : remaining === 1 ? 'Afficher la dernière question' : `Afficher les ${remaining} dernières questions`}</button>
          : <button type="button" onClick={showLess}>Afficher moins</button>}
      </div>
    )}
    {visibleIds.size === 0 && <p className={styles.empty}>Aucune réponse ne correspond à votre recherche. Essayez un autre mot ou <CmsAnchor href="/contact">contactez votre campus</CmsAnchor>.</p>}
  </div>
}
