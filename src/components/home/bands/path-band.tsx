import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { homeBands } from '@/content/home-bands'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { BandHeading } from './band-heading'
import styles from './path-band.module.css'

/*
 * Band 5, replacing the school stages and the age-group chooser: "De 2 à 18 ans", drawn to
 * Ayoub's two mock-ups of 29 Oct 2026. His own exceptions for this band: a clay uppercase label,
 * a plain Playfair title (no accent words), uppercase tabs on grey shields, a pill button.
 *
 * The tabs are native radio inputs + CSS (:has): they work before hydration and without JS,
 * with arrow keys. The panels share one grid cell, so the band keeps the height of the longest
 * one and never jumps when the tab changes. Server Component, no client JS.
 *
 * The right side answers the tab: the four children for the overview; for a stage, three Fired
 * Clay circles that fan out from behind the stage's photo (path-band.module.css). Below 1024px
 * that picture sits between the title and the tabs, so it stays on screen while the thumb picks
 * a tab.
 */
function Rich({ text }: { text: string }) {
  return text.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))
}

export function PathBand() {
  const { label, title, link, image, stages } = homeBands.path

  return (
    <section aria-labelledby="path-title" className={styles.section}>
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <BandHeading id="path-title" label={label} title={title} className={`${styles.head} reveal`} />

          <fieldset className={`${styles.tabs} reveal-2`}>
            <legend className="sr-only">Choisissez une étape du parcours</legend>
            {stages.map((stage, index) => (
              <label key={stage.id} className={styles.tab}>
                <input
                  type="radio"
                  name="home-path-stage"
                  value={stage.id}
                  defaultChecked={index === 0}
                  aria-controls={`path-${stage.id}`}
                  className={styles.radio}
                />
                <svg viewBox="0 0 76 80" aria-hidden="true" className={styles.shield}>
                  <path d="M38 1.5c13 0 26 2.6 35.5 6.6V38c0 19-14.6 33.4-35.5 40.5C17.1 71.4 2.5 57 2.5 38V8.1C12 4.1 25 1.5 38 1.5Z" />
                </svg>
                <span className={styles.tabName}>
                  {stage.tab.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </label>
            ))}
          </fieldset>

          <div className={`${styles.panels} reveal-3`}>
            {stages.map((stage) => (
              <div key={stage.id} id={`path-${stage.id}`} data-stage={stage.id} className={styles.panel}>
                {stage.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <Rich text={paragraph} />
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <ButtonLink href={link.href} size="lg" className={styles.action}>
              {link.label}
              <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
            </ButtonLink>
          </div>
        </div>

        <div className={styles.visual}>
          <div data-visual="ensemble" className={styles.kids}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 460px, 60vw"
            />
          </div>

          {stages.map((stage) =>
            stage.photo ? (
              <div key={stage.id} data-visual={stage.id} className={styles.circles}>
                <span aria-hidden="true" className={styles.ringBack} />
                <span aria-hidden="true" className={styles.ringMid} />
                <div className={styles.disc}>
                  <Image
                    src={stage.photo.src}
                    alt={stage.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 440px, 64vw"
                    className="object-cover"
                    style={{ objectPosition: stage.photo.position }}
                  />
                </div>
              </div>
            ) : null,
          )}
        </div>
      </Container>
    </section>
  )
}
