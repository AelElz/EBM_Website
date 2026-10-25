import Image from 'next/image'

import { home } from '@/content/home'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { NNBSP } from '@/lib/typography'

import styles from './alumni.module.css'
import { SectionHeading, SectionLabel } from './emphasis'
import { StoryDeck } from './story-deck'

/*
 * Home section 5 (docs/HOME-SPEC.md): "Ils ont grandi aux EBM", alumni stories and careers.
 *
 * Follows the scroll scene, whose last frame is the diploma ceremony at full screen. A card deck
 * after the "News from Korowa" deck (korowa.vic.edu.au): the current story in front, the next
 * ones stacked behind it; arrows, dots, a click on a stacked card or a swipe move through them.
 * Layout and card places: alumni.module.css; deck logic: story-deck.tsx. The cards themselves
 * are rendered here, on the server.
 *
 * The stories are placeholders (`source: 'placeholder'` in src/content/home.ts): real EBM
 * photos, invented quotes, bracketed names and a visible notice, until EBM collects real ones.
 */
export function Alumni() {
  const { label, title, text, note, source, stories, link } = home.alumni

  return (
    <section aria-labelledby="alumni-title" data-source={source} className="overflow-x-clip py-section">
      <Container className="flex flex-col items-center text-center">
        <SectionLabel tone="dark">{label}</SectionLabel>
        <SectionHeading id="alumni-title" text={title} className="mt-4" />
        <p className="mt-5 max-w-[36em] text-lead text-ink-soft">{text}</p>
        <p className="mt-3 max-w-[36em] text-sm leading-[1.5] text-ink-soft">{note}</p>
      </Container>

      <div className="mt-12 lg:mt-14">
        <StoryDeck label="Témoignages d’anciens élèves">
          {stories.map((story) => (
            <figure key={story.image.src} className={styles.card}>
              <div className={styles.cardPhoto}>
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 639px) 80vw, 420px"
                  className="object-cover"
                  style={story.image.position ? { objectPosition: story.image.position } : undefined}
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-[13px] leading-none">
                <span className="rounded-full bg-cream px-2.5 py-1.5 font-semibold text-terracotta-ink">
                  {story.kind}
                </span>
                <span className="text-ink-soft">{story.promotion}</span>
              </div>
              <blockquote className="mt-4 text-[clamp(1.1875rem,1.6vw,1.4375rem)] leading-[1.3] font-semibold tracking-[-0.01em] text-charcoal">
                <p>{`«${NNBSP}${story.quote}${NNBSP}»`}</p>
              </blockquote>
              <figcaption className="mt-4 text-[15px] leading-[1.45] text-ink-soft">
                <span className="font-bold text-charcoal">{story.name}</span>
                {` · ${story.path}`}
              </figcaption>
            </figure>
          ))}
        </StoryDeck>
      </div>

      <Container className="mt-10 flex justify-center">
        <ButtonLink href={link.href} variant="outline-dark" size="lg">
          {link.label}
        </ButtonLink>
      </Container>
    </section>
  )
}
