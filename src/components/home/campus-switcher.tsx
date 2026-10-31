'use client'
import { CmsAnchor } from '@/cms/link'


import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Children, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

import styles from './campus-chapters.module.css'

interface CampusChoice { key: string; label: string; href: string }

/** The two server-rendered campuses share one frame; only selection is client-side. */
export function CampusSwitcher({ campuses, previews, children }: {
  campuses: CampusChoice[]
  previews: ReactNode[]
  children: ReactNode
}) {
  const [active, setActive] = useState(0)
  const [enhanced, setEnhanced] = useState(false)
  const touchStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const next = (active + 1) % campuses.length
  const DirectionArrow = next < active ? ArrowLeft : ArrowRight

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch' || !event.isPrimary) return
    if (event.target instanceof Element && event.target.closest('a, button, input, select, textarea, [role="button"]')) return
    touchStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = touchStart.current
    touchStart.current = null
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.3) return
    setActive(index => Math.max(0, Math.min(campuses.length - 1, index + (dx < 0 ? 1 : -1))))
  }

  useEffect(() => {
    setEnhanced(true)
    const syncHash = () => {
      const index = campuses.findIndex(campus => window.location.hash === `#campus-${campus.key}`)
      if (index >= 0) setActive(index)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [campuses])

  return (
    <section
      aria-labelledby="campus-title"
      className={styles.frame}
      data-campus={campuses[active].key}
      data-enhanced={enhanced ? '' : undefined}
    >
      <h2 id="campus-title" className="sr-only">Nos deux campus</h2>
      <div aria-hidden="true" className={styles.blackField} />
      <div
        className={styles.panels}
        onPointerDown={startSwipe}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { touchStart.current = null }}
      >
        {Children.map(children, (child, index) => (
          <div
            id={`campus-panel-${campuses[index].key}`}
            className={styles.panel}
            data-active={active === index ? '' : undefined}
            aria-hidden={active !== index}
            inert={active !== index}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.peek}
        aria-label={`Afficher le campus de ${campuses[next].label}`}
        aria-controls={`campus-panel-${campuses[next].key}`}
        onClick={() => setActive(index => (index + 1) % campuses.length)}
      >
        <span className={styles.peekPhoto}>
          {previews.map((preview, index) => (
            <span key={campuses[index].key} className={styles.peekImage} data-visible={next === index ? '' : undefined}>
              {preview}
            </span>
          ))}
        </span>
        <span className={styles.peekLabel}>
          <span>{campuses[next].label}</span>
          <DirectionArrow aria-hidden="true" size={21} strokeWidth={1.5} />
        </span>
      </button>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Campus de {campuses[active].label} affiché
      </p>
      <noscript>
        <div className={styles.fallback}>
          {campuses.map(campus => <CmsAnchor key={campus.key} href={campus.href}>Le campus de {campus.label}</CmsAnchor>)}
        </div>
      </noscript>
    </section>
  )
}
