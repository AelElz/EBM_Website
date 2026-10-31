'use client'

import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import Image from '@/cms/image'
import { useEffect, useId, useState, type FocusEvent, type PointerEvent, type ReactNode } from 'react'

/*
 * Hero slider: the only client part of the home hero (docs/HOME-SPEC.md, section 1).
 *
 * The server (hero.tsx) renders the first photo (preload, LCP) and all the text, and passes them
 * in as `first` and `children`, so nothing visible waits for JavaScript. This island only adds:
 * - slides 2-3, mounted after the window `load` event + an idle moment (never compete with LCP);
 * - a 900ms crossfade (the incoming slide fades in on top, the outgoing one stays opaque below
 *   until it is covered, so the photo never dims mid-fade);
 * - autoplay every 7s, paused on mouse hover, while focus is inside, while the tab is hidden, and
 *   off by default under prefers-reduced-motion; a visible pause/play button (WCAG 2.2.2);
 * - prev/next round buttons and a small indicator;
 * - the page's one authored motion moment: the active photo settles from scale 1.04 to 1
 *   (transform only; none under reduced motion).
 * No carousel library, no tailwind-merge: plain class strings keep this bundle tiny.
 */

const INTERVAL_MS = 7000

export interface HeroSliderSlide {
  src: string
  alt: string
  position?: string
}

export interface HeroSliderProps {
  /** Accessible name of the carousel region. */
  label: string
  /** All slides; slide 1 is drawn by `first`, its data is only used for labels. */
  slides: HeroSliderSlide[]
  /** Server-rendered next/image for slide 1 (preload, sizes="100vw", fill). */
  first: ReactNode
  /** Server-rendered hero content (h1, text, #primary-actions). */
  children: ReactNode
}

const roundButton =
  'inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-charcoal/30 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-charcoal focus-visible:outline-white'

export function HeroSlider({ label, slides, first, children }: HeroSliderProps) {
  const count = slides.length
  const slidesId = useId()
  const [index, setIndex] = useState(0)
  /** Slides 2-3 exist in the DOM only after first paint + idle (or a first click). */
  const [mounted, setMounted] = useState(false)
  /** Bit i set = slide i has its image ready. Slide 1 is server-rendered. */
  const [loaded, setLoaded] = useState(1)
  /** User intent: the pause/play button (off by default under reduced motion). */
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(false)
  /** False in the server HTML: slide 1 paints at 1.04, then settles once hydrated. */
  const [settled, setSettled] = useState(false)

  const multiple = count > 1
  const running = multiple && playing && !hovered && !focused && !hidden
  const nextIndex = (index + 1) % count
  const nextReady = ((loaded >> nextIndex) & 1) === 1

  // Reduced motion, tab visibility, and the first slide's settle.
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => {
      if (media.matches) setPlaying(false)
    }
    const syncVisibility = () => setHidden(document.visibilityState === 'hidden')

    syncMotion()
    syncVisibility()
    setSettled(true)

    media.addEventListener('change', syncMotion)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      media.removeEventListener('change', syncMotion)
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  // Mount slides 2-3 once the page has loaded (LCP image done) and the main thread is idle.
  useEffect(() => {
    if (!multiple) return
    let idleId = 0
    let timeoutId = 0
    const mount = () => setMounted(true)
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(mount, { timeout: 2000 })
      } else {
        timeoutId = window.setTimeout(mount, 300)
      }
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      window.removeEventListener('load', schedule)
      if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
      window.clearTimeout(timeoutId)
    }
  }, [multiple])

  // Autoplay. Restarts after every change (manual or automatic); waits for the next photo.
  useEffect(() => {
    if (!running || !nextReady) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [running, nextReady, index, count])

  const go = (target: number) => {
    setMounted(true)
    setIndex((target + count) % count)
  }

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHovered(true)
  }
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHovered(false)
  }
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
  }

  return (
    <section
      aria-roledescription="carrousel"
      aria-label={label}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      // Height min(86svh, 760px), never under 560px; min-height (not height) so long text or
      // zoomed text grows the hero instead of being clipped. Bottom padding = panel overlap
      // (48px phones / 96px md+, see highlights.tsx) + breathing room above it.
      className="relative isolate flex min-h-[max(560px,min(86svh,760px))] flex-col overflow-hidden bg-charcoal pb-18 text-white md:pb-32"
    >
      {/* Slides. Polite live region only while autoplay is stopped (WAI-ARIA carousel). */}
      <div id={slidesId} aria-live={running ? 'off' : 'polite'} className="absolute inset-0 -z-20">
        {slides.map((slide, i) => {
          if (i > 0 && !mounted) return null
          const active = i === index
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
              aria-hidden={active ? undefined : true}
              className={
                active
                  ? 'absolute inset-0 z-[1] opacity-100 transition-opacity duration-[900ms] ease-in-out'
                  : 'absolute inset-0 z-0 opacity-0 transition-opacity delay-[900ms] duration-0'
              }
            >
              <div
                className={
                  active && settled
                    ? 'absolute inset-0 scale-100 transition-transform duration-[7000ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none'
                    : 'absolute inset-0 scale-[1.04] transition-transform delay-[900ms] duration-0 motion-reduce:scale-100'
                }
              >
                {i === 0 ? (
                  first
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: slide.position }}
                    onLoad={() => setLoaded((mask) => mask | (1 << i))}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Charcoal overlay: 50% everywhere, deepened where the text sits (towards the bottom on
          phones, where the text spans the width; towards the left from 768px). Measured on the
          three photos at 375, 768, 1024, 1440 and 1920px: the paragraph keeps >= 4.5:1 and the
          h1 >= 3:1 on their brightest pixels. Re-measure when a slide photo changes. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-charcoal/50 bg-linear-to-t from-charcoal/45 via-charcoal/32 via-65% to-charcoal/15 md:bg-linear-to-r md:from-charcoal/45 md:via-charcoal/30 md:via-60% md:to-charcoal/10"
      />

      {children}

      {multiple ? (
        <div className="mx-auto flex w-full max-w-site items-center justify-end gap-5 px-gutter">
          <div aria-hidden="true" className="flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <span
                key={slide.src}
                className={`h-0.5 w-6 transition-colors duration-300 ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={roundButton}
              aria-label={playing ? 'Mettre en pause le défilement des photos' : 'Relancer le défilement des photos'}
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? (
                <Pause aria-hidden="true" className="size-[18px]" strokeWidth={1.5} absoluteStrokeWidth />
              ) : (
                <Play aria-hidden="true" className="size-[18px]" strokeWidth={1.5} absoluteStrokeWidth />
              )}
            </button>
            {/* Below 1360px the arrows sit in this row; from 1360px there is room beside the
                text, so they move to mid-height on the left and right edges (version 2). */}
            <button
              type="button"
              className={`${roundButton} min-[1360px]:absolute min-[1360px]:top-[calc(50%-72px)] min-[1360px]:left-7`}
              aria-label="Photo précédente"
              aria-controls={slidesId}
              onClick={() => go(index - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.5} absoluteStrokeWidth />
            </button>
            <button
              type="button"
              className={`${roundButton} min-[1360px]:absolute min-[1360px]:top-[calc(50%-72px)] min-[1360px]:right-7`}
              aria-label="Photo suivante"
              aria-controls={slidesId}
              onClick={() => go(index + 1)}
            >
              <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.5} absoluteStrokeWidth />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
