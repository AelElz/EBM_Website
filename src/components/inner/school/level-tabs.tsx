'use client'

import { Children, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import styles from './school.module.css'

export function LevelTabs({ levels, children }: { levels: { id: string; label: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(levels[0].id)
  const [enhanced, setEnhanced] = useState(false)
  const links = useRef<Array<HTMLAnchorElement | null>>([])
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1)
      if (levels.some(level => level.id === id)) setActive(id)
    }
    sync()
    setEnhanced(true)
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [levels])
  const move = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? levels.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + levels.length) % levels.length
    setActive(levels[next].id)
    window.history.replaceState(null, '', `#${levels[next].id}`)
    links.current[next]?.focus()
  }
  return <div className={styles.levels} data-enhanced={enhanced ? '' : undefined}>
    <nav aria-label="Les niveaux d’enseignement" className={styles.tabs} role={enhanced ? 'tablist' : undefined}>
      {levels.map((level, index) => <a key={level.id} id={`tab-${level.id}`} href={`#${level.id}`} ref={node => { links.current[index] = node }} role={enhanced ? 'tab' : undefined} aria-selected={enhanced ? active === level.id : undefined} aria-controls={enhanced ? level.id : undefined} tabIndex={enhanced && active !== level.id ? -1 : 0} onClick={() => setActive(level.id)} onKeyDown={event => move(event, index)}>{level.label}</a>)}
    </nav>
    {Children.map(children, (child, index) => <div id={levels[index].id} className={styles.levelPanel} data-active={active === levels[index].id ? '' : undefined} role={enhanced ? 'tabpanel' : undefined} aria-labelledby={enhanced ? `tab-${levels[index].id}` : undefined} tabIndex={enhanced ? 0 : undefined}>{child}</div>)}
  </div>
}
