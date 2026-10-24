import Image from 'next/image'

import { home } from '@/content/home'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

/*
 * Shared closing band (docs/HOME-SPEC.md, home section 8): full-bleed photo of the Casablanca
 * secondary courtyard under a charcoal overlay, h2, one sentence, the two priority actions.
 * Rendered on the home page and on every placeholder page. Server Component, no props.
 *
 * Overlay: 66% charcoal rather than 62%. Measured on this photo, the brightest 1% of pixels
 * under 62% leave white text at 4.3:1; at 66% the paragraph stays >= 4.8:1 at every crop.
 */
export function CtaBand() {
  const { title, text, image, primary, secondary } = home.ctaBand

  return (
    <section
      aria-labelledby="cta-band-title"
      className="relative isolate overflow-hidden bg-charcoal text-white"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/66" />

      <Container className="flex flex-col gap-8 py-[clamp(80px,9vw,120px)] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="min-w-0 lg:max-w-[40rem]">
          <h2 id="cta-band-title" className="font-display text-h2 font-semibold">
            {title}
          </h2>
          <p className="mt-4 max-w-[34em] text-lead text-white">{text}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
          <ButtonLink
            href={primary.href}
            size="lg"
            className="w-full focus-visible:outline-white sm:w-auto"
          >
            {primary.label}
          </ButtonLink>
          <ButtonLink
            href={secondary.href}
            size="lg"
            variant="outline-light"
            className="w-full sm:w-auto"
          >
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
