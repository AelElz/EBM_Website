import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

/*
 * /robots.txt: crawl everything except the Payload admin and API.
 *
 * robots.txt rules are path *prefixes*: a bare "Disallow: /admin" would also block /admissions
 * and every page under it. So the admin is matched exactly ("/admin$", Google/Bing syntax; other
 * crawlers read it as a literal path that does not exist) plus everything below "/admin/".
 * Media files served by Payload stay crawlable for image search.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin$', '/admin/', '/api/'],
    },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  }
}
