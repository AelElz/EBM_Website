
import { CmsAnchor } from '@/cms/link'
import { getCmsContent } from '@/cms/server'
import { ArrowUpRight } from 'lucide-react'
import Image from '@/cms/image'

import { home as defaultHome } from '@/content/home'
import { Container } from '@/components/ui/container'
import { SectionHeading } from './emphasis'

/*
 * "Actualités & projets" (docs/HOME-SPEC.md, home section 7).
 * Static preview of the Instagram account: six EBM photos, each linking to the account (not to
 * a post: there is no feed yet). The data is flagged `source: 'placeholder'` in
 * src/content/home.ts until the feed is connected, so no captions, dates or like counts.
 * Server Component: the only motion is a CSS zoom on hover (pointer devices, motion-safe).
 */
export async function Instagram() {
  const home = await getCmsContent('home', defaultHome)
  const { title, handle, url, linkLabel, source, tiles } = home.instagram

  return (
    <section aria-labelledby="instagram-title" data-source={source} className="py-section">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <SectionHeading id="instagram-title" text={title} />
          <CmsAnchor
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[15px] font-bold text-terracotta-ink underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            {linkLabel}
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.5} />
            <span className="sr-only"> sur Instagram (nouvel onglet)</span>
          </CmsAnchor>
        </div>

        <ul className="mt-6 grid grid-cols-3 gap-3 lg:mt-8 lg:grid-cols-6">
          {tiles.map((tile) => (
            <li key={tile.src}>
              {/* The photo is described in the link's name; the image itself stays silent. */}
              <CmsAnchor
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tile.alt} Voir ${handle} sur Instagram (nouvel onglet)`}
                className="group relative block aspect-square overflow-hidden bg-paper"
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 200px, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.03]"
                  style={tile.position ? { objectPosition: tile.position } : undefined}
                />
              </CmsAnchor>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
