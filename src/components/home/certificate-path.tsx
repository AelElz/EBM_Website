'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** One viewport-triggered sequence. Server HTML is already the completed, readable path. */
export function CertificatePath({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    let played = false

    const sync = () => {
      observer?.disconnect()
      if (preference.matches || played) {
        delete element.dataset.motion
        return
      }
      element.dataset.motion = 'waiting'
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        played = true
        element.dataset.motion = 'playing'
        observer?.disconnect()
      }, { threshold: 0.45 })
      observer.observe(element)
    }

    sync()
    preference.addEventListener('change', sync)
    return () => { observer?.disconnect(); preference.removeEventListener('change', sync) }
  }, [])

  return (
    <ol ref={ref} className={className} aria-label="Les trois étapes de certification belge">
      {children}
    </ol>
  )
}
