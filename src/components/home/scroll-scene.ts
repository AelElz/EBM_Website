/*
 * Scroll driver for the home page's experience scene (collage-zoom.tsx), kept generic so another
 * pinned scene can reuse it. No animation library: one passive scroll listener, at most one
 * update per animation frame, and the updates only write CSS variables.
 *
 * The server HTML is a static layout (the still collage). runScrollScene() sets `data-ready` on
 * the scene element when motion is allowed, and the CSS module switches to the pinned layout
 * only under that attribute. So without JavaScript, or under prefers-reduced-motion (also when
 * it is switched on later), the static layout stays.
 */

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

export interface ScrollScene {
  /** Reads sizes after `data-ready` is set, then after every resize. Cache them here. */
  measure?: () => void
  /** Draws one frame from the current scroll position. */
  frame: () => void
  /** Removes every inline style the scene wrote, back to the static layout. */
  reset: () => void
}

/** Starts a scene on `element`; returns the cleanup for useEffect. */
export function runScrollScene(element: HTMLElement, scene: ScrollScene): () => void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frameId = 0
  let running = false

  const draw = () => {
    frameId = 0
    scene.frame()
  }
  const onScroll = () => {
    if (!frameId) frameId = window.requestAnimationFrame(draw)
  }
  const onResize = () => {
    scene.measure?.()
    onScroll()
  }

  const start = () => {
    if (running) return
    running = true
    element.dataset.ready = ''
    scene.measure?.()
    scene.frame()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
  }

  const stop = () => {
    if (!running) return
    running = false
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (frameId) window.cancelAnimationFrame(frameId)
    frameId = 0
    delete element.dataset.ready
    scene.reset()
  }

  const sync = () => (reducedMotion.matches ? stop() : start())

  sync()
  reducedMotion.addEventListener('change', sync)
  return () => {
    reducedMotion.removeEventListener('change', sync)
    stop()
  }
}
