import { getCmsContent } from '@/cms/server'
import Image from '@/cms/image'

import { home as defaultHome } from '@/content/home'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { HeroSlider } from './hero-slider'

/*
 * Home section 1 (docs/HOME-SPEC.md): full-bleed hero slider, "version 2" composition.
 *
 * Server Component. The first photo (LCP: preload + fetchPriority high, sizes="100vw") and all
 * the text are rendered here, so the first paint and LCP never wait for JavaScript; the client
 * island (hero-slider.tsx) adds slides 2-3, crossfade, autoplay and controls around them.
 *
 * `#primary-actions` wraps the hero buttons: the mobile action bar shows itself once this
 * element has scrolled out of view.
 */
export async function Hero() {
  const home = await getCmsContent('home', defaultHome)
  const { title, text, slides, primary, secondary } = home.hero
  if (slides.length === 0) return null
  const [first] = slides

  return (
    <HeroSlider
      label="Nos campus en images"
      slides={slides.map(({ src, alt, position }) => ({ src, alt, position }))}
      first={
        <Image
          src={first.src}
          alt={first.alt}
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: first.position }}
        />
      }
    >
      <Container className="flex flex-1 flex-col justify-center pt-12 pb-8 sm:pt-16">
        <h1 className="max-w-[11em] font-display text-display font-semibold">{title}</h1>
        {/* Pure white, not white/90: the paragraph needs 4.5:1 on the brightest photo areas. */}
        <p className="mt-5 max-w-[32em] text-lead text-white sm:mt-6">{text}</p>
        {/* Stacked full-width pair on phones (as in the CTA band), side by side from 640px. */}
        <div id="primary-actions" className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
          <ButtonLink href={primary.href} size="lg" className="w-full sm:w-auto">
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} size="lg" variant="outline-light" className="w-full sm:w-auto">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </HeroSlider>
  )
}
