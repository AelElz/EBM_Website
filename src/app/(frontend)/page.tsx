import type { Metadata } from 'next'

import { home } from '@/content/home'
import { baseOpenGraph, ogImage } from '@/lib/metadata'
import { homeJsonLd, serializeJsonLd } from '@/lib/structured-data'
import { About } from '@/components/home/about'
import { AdmissionsPath } from '@/components/home/admissions-path'
import { Alumni } from '@/components/home/alumni'
import { CampusChapters } from '@/components/home/campus-chapters'
import { DirectorLetter } from '@/components/home/director-letter'
import { Faq } from '@/components/home/faq'
import { Figures } from '@/components/home/figures'
import { Guarantee } from '@/components/home/guarantee'
import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { Instagram } from '@/components/home/instagram'
import { Journey } from '@/components/home/journey'
import { Stages } from '@/components/home/stages'
import { Statement } from '@/components/home/statement'
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
 * Home page (docs/HOME-SPEC.md, "Home page sections"): 1 hero + highlights panel, 2 statement
 * band, 3 school stages, 4 "À chaque âge, son parcours" (direct age groups),
 * 5 the Belgian certificate path, 6 the "experience" scroll scene,
 * 7 alumni card deck, 8 key figures, 9 the two campus chapters, 10 the network director's
 * letter, 11 the admission path, 12 large video then expandable FAQ, 13 actualités, 14 CTA band, then the footer
 * (from the layout, with the header). The scene ends on the diploma ceremony at full screen,
 * which leads into the alumni stories: keep <About /> and <Alumni /> next to each other.
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
      <Statement />
      <Stages />
      <Journey />
      <Guarantee />
      <About />
      <Alumni />
      <Figures />
      <CampusChapters />
      <DirectorLetter />
      <AdmissionsPath />
      <Faq />
      <Instagram />
      <CtaBand />
    </>
  )
}
