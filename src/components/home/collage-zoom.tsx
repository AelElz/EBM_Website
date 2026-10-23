'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { clamp01, easeInOutCubic, easeOutCubic, runScrollScene } from './scroll-scene'

/*
 * Scroll driver of the about scene (about.tsx, about-collage.module.css). The photos, the text,
 * their geometry and every transform formula are server HTML + CSS; this island only writes two
 * numbers on the scene element, each from 0 to 1, from the share of the pinned scroll used:
 *
 *   0    - 0.38  --rise  the photos come in from off screen into the collage (ease out)
 *   0.38 - 0.46  hold    the collage at rest, as in ANIMATION 2
 *   0.46 - 0.88  --zoom  the focus photo opens to full screen (ease in-out)
 *   0.88 - 1     hold    the full-screen photo under the text, as in ANIMATION 3
 *
 * Before the pin (the stage rising into view) --rise is 0: a plain clay screen, ANIMATION 1.
 */

const VARIABLES = ['--rise', '--zoom'] as const

export function CollageZoom({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = ref.current
    const stage = scene?.firstElementChild
    if (!scene || !(stage instanceof HTMLElement)) return

    let stageHeight = 0

    return runScrollScene(scene, {
      measure() {
        stageHeight = stage.offsetHeight
      },
      frame() {
        const { top, height } = scene.getBoundingClientRect()
        const pinned = clamp01(-top / Math.max(1, height - stageHeight))

        scene.style.setProperty('--rise', easeOutCubic(clamp01(pinned / 0.38)).toFixed(4))
        scene.style.setProperty('--zoom', easeInOutCubic(clamp01((pinned - 0.46) / 0.42)).toFixed(4))
      },
      reset() {
        for (const name of VARIABLES) scene.style.removeProperty(name)
      },
    })
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
