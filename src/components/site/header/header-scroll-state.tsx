'use client'

import { useEffect } from 'react'

/**
 * Scroll state for the frosted bar (docs/HOME-SPEC.md, Header). Renders nothing: it sets
 * data-scrolled="true" on the <header> once the sentinel (an 8px strip at the top of the page,
 * header.tsx) has scrolled out of view, and the bar's classes
 * (group-data-[scrolled=true]/header:…) do the rest. One IntersectionObserver, no scroll
 * listener, no re-render. Without JavaScript the bar simply stays solid white.
 */
export function HeaderScrollState({ headerId, sentinelId }: { headerId: string; sentinelId: string }) {
  useEffect(() => {
    const header = document.getElementById(headerId)
    const sentinel = document.getElementById(sentinelId)
    if (!header || !sentinel || typeof IntersectionObserver === 'undefined') return

    // -1px: a sentinel sitting exactly above the viewport (edge-adjacent) would still be
    // reported as intersecting.
    const observer = new IntersectionObserver(
      ([entry]) => header.setAttribute('data-scrolled', String(!entry.isIntersecting)),
      { rootMargin: '-1px 0px 0px 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [headerId, sentinelId])

  return null
}
