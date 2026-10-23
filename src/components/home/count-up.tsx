'use client'

import { useEffect, useRef, useState } from 'react'

import { NNBSP } from '@/lib/typography'

/*
 * Count-up for the key figures (figures.tsx). The server HTML already holds the final value, so
 * search engines, screen readers, no-JS and reduced-motion visitors get the real figure. Once
 * hydrated (motion allowed), the number drops to `from` and counts to the value the first time
 * it is well inside the screen, over DURATION with an ease-out, after `delay`.
 *
 * - Format follows the content string: "2 000" groups thousands with a narrow no-break space,
 *   "2014" (a year) never does.
 * - No layout shift: an invisible copy of the final value reserves the width (the digits are
 *   tabular), and the counting number is drawn over it.
 * - Screen readers read the final value once (sr-only); the counting copies are aria-hidden.
 */

const DURATION = 1600

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4

const format = (n: number, grouped: boolean) => {
  const digits = String(Math.round(n))
  return grouped ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP) : digits
}

export function CountUp({ value, from, delay = 0 }: { value: string; from: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const element = ref.current
    if (
      !element ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    const to = Number(value.replace(/\D/g, ''))
    const grouped = value.includes(NNBSP)
    let frame = 0
    let timer = 0

    setShown(format(from, grouped))

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        // The last frame writes the content string itself, exactly as authored.
        setShown(t < 1 ? format(from + (to - from) * easeOutQuart(t), grouped) : value)
        if (t < 1) frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(run, delay)
      },
      { threshold: 1, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
    }
  }, [value, from, delay])

  return (
    <span ref={ref} className="inline-grid">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
