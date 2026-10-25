import type { MetadataRoute } from 'next'

import { site } from '@/content/site'
import { routes } from '@/lib/routes'

/*
 * /sitemap.xml (docs/HOME-SPEC.md, SEO). Lives at the app root, outside both route groups, so it
 * belongs to neither root layout and cannot collide with Payload's /admin and /api routes.
 *
 * Real, indexable pages only. The 14 migrated main pages and support drafts remain noindex during EBM review.
 * Content is populated; add a page here only after its publication readiness is approved
 * and its `pageMetadata` call stops passing `index: false`.
 */
const indexable = [
  { path: routes.home, priority: 1 },
  { path: routes.planDuSite, priority: 0.3 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: 'monthly',
    priority,
  }))
}
