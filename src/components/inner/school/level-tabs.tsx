'use client'
import { CmsAnchor } from '@/cms/link'


import { Children, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import styles from './school.module.css'

/*
 * A link elsewhere on the page to a level (#primaire from the languages or the diplomas, or a
 * shared URL) opens that tab and brings the tab row into view: the browser cannot scroll to a
 * panel that is still hidden. A click on a tab only switches the panel and records it in the URL
 * (no jump, and no focus ring on the panel for mouse users).
 */
export function LevelTabs({ levels, children }: { levels: { id: string; label: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(levels[0].id)
  const [enhanced, setEnhanced] = useState(false)
  const [scrollRequest, setScrollRequest] = useState(0)
  const links = useRef<Array<HTMLAnchorElement | null>>([])
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1)
      if (levels.some(level => level.id === id)) {
        setActive(id)
        setScrollRequest(request => request + 1)
      }
    }
    sync()
    setEnhanced(true)
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [levels])
  useEffect(() => {
    if (!scrollRequest) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.current?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' })
  }, [scrollRequest])
  const move = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? levels.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + levels.length) % levels.length
    setActive(levels[next].id)
    window.history.replaceState(null, '', `#${levels[next].id}`)
    links.current[next]?.focus()
  }
  return <div ref={root} className={styles.levels} data-enhanced={enhanced ? '' : undefined}>
    <nav aria-label="Les niveaux d’enseignement" className={styles.tabs} role={enhanced ? 'tablist' : undefined}>
      {levels.map((level, index) => <CmsAnchor key={level.id} id={`tab-${level.id}`} href={`#${level.id}`} ref={node => { links.current[index] = node }} role={enhanced ? 'tab' : undefined} aria-selected={enhanced ? active === level.id : undefined} aria-controls={enhanced ? level.id : undefined} tabIndex={enhanced && active !== level.id ? -1 : 0} onClick={event => { event.preventDefault(); setActive(level.id); window.history.replaceState(null, '', `#${level.id}`) }} onKeyDown={event => move(event, index)}>{level.label}</CmsAnchor>)}
    </nav>
    {Children.map(children, (child, index) => <div id={levels[index].id} className={styles.levelPanel} data-active={active === levels[index].id ? '' : undefined} role={enhanced ? 'tabpanel' : undefined} aria-labelledby={enhanced ? `tab-${levels[index].id}` : undefined} tabIndex={enhanced ? 0 : undefined}>{child}</div>)}
  </div>
}
