import type { Metadata } from 'next'

import { home } from '@/content/home'
import { baseOpenGraph, ogImage } from '@/lib/metadata'
import { homeJsonLd, serializeJsonLd } from '@/lib/structured-data'
import { About } from '@/components/home/about'
import { Alumni } from '@/components/home/alumni'
import { Figures } from '@/components/home/figures'
import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { Instagram } from '@/components/home/instagram'
import { CtaBand } from '@/components/site/cta-band'

const { title, description } = home.seo

export const metadata: Metadata = {
  // Absolute: the layout's "%s · Écoles Belges au Maroc" template would repeat the name.
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: { ...baseOpenGraph, title, description, url: '/', images: [ogImage] },
}

/*
 * Home page (docs/HOME-SPEC.md, "Home page sections"): 1 hero + highlights panel, 2 about
 * scroll scene, 3 alumni card deck, 4 key figures, 5 actualités, 6 CTA band, 7 footer (from
 * the layout, with the header). The scene ends on the diploma ceremony at full screen, which
 * leads into the alumni stories: keep <About /> and <Alumni /> next to each other.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd()) }}
      />
      <Hero />
      <Highlights />
      <About />
      <Alumni />
      <Figures />
      <Instagram />
      <CtaBand />
    </>
  )
}
