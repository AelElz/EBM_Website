'use client'

import { useEffect } from 'react'

/**
 * Scroll state for the frosted main bar (docs/HOME-SPEC.md, Header 2). Renders nothing: it sets
 * data-scrolled="true" on the <header> once the top bar has scrolled out of view, and the main
 * bar's classes (group-data-[scrolled=true]/header:…) do the rest. One IntersectionObserver,
 * no scroll listener, no re-render. Without JavaScript the bar simply stays solid white.
 */
export function HeaderScrollState({ headerId, sentinelId }: { headerId: string; sentinelId: string }) {
  useEffect(() => {
    const header = document.getElementById(headerId)
    const sentinel = document.getElementById(sentinelId)
    if (!header || !sentinel || typeof IntersectionObserver === 'undefined') return

    // -1px: once stuck, the top bar sits exactly above the viewport (edge-adjacent), which
    // IntersectionObserver would still report as intersecting.
    const observer = new IntersectionObserver(
      ([entry]) => header.setAttribute('data-scrolled', String(!entry.isIntersecting)),
      { rootMargin: '-1px 0px 0px 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [headerId, sentinelId])

  return null
}
