import { home } from '@/content/home'
import { Container } from '@/components/ui/container'

import { Emphasis } from './emphasis'

/*
 * Home section 2 (docs/HOME-SPEC.md): the statement band, after the one under the hero of
 * korowa.vic.edu.au (Ayoub's screenshot, 24 Oct 2026). A Fired Clay band with a small factual
 * line (who, where, what) and one big mixed sentence: Avenir 500 with Playfair italic accent
 * words. Server Component, no client JS, no motion.
 *
 * Contrast on Fired Clay: the small line is white (4.8:1, it needs 4.5:1); the statement is
 * Riad Paper, softer, at 4.3:1, which large text allows (3:1).
 */
export function Statement() {
  const { intro, text } = home.statement

  return (
    // White room under the highlights panel, then the band.
    <section aria-label="Les EBM en bref" className="pt-[clamp(56px,7vw,104px)]">
      <div className="bg-terracotta py-[clamp(88px,11vw,160px)]">
        <Container>
          <p className="max-w-[62em] text-[13px] leading-[1.5] text-white">{intro}</p>
          <p className="mt-6 max-w-[23em] text-[clamp(1.75rem,3.9vw,3.625rem)] leading-[1.18] font-medium tracking-[-0.02em] text-paper sm:mt-8">
            <Emphasis text={text} />
          </p>
        </Container>
      </div>
    </section>
  )
}
