import Image from 'next/image'
import Link from 'next/link'

import { home } from '@/content/home'

import styles from './about-collage.module.css'
import { CollageZoom } from './collage-zoom'
import { Emphasis, SectionLabel } from './emphasis'

/*
 * Home section 4 (docs/HOME-SPEC.md): the scroll scene, after Ayoub's "ANIMATION 1-3" mock-ups.
 * A full Fired Clay screen with the label, the mixed heading and the button; five EBM photos
 * come in behind the text into a collage; then the focus photo (the diploma ceremony) opens to
 * full screen under the text. Geometry and formulas: about-collage.module.css; the scroll
 * driver (collage-zoom.tsx) only writes two CSS variables. Server Component apart from it.
 *
 * `sizes`: the focus photo ends at full screen, so it loads the 100vw candidate. The corners
 * never rest wider than ~34% of a landscape screen or ~52% of a portrait one.
 */
export function About() {
  const { label, title, cta, collage } = home.about
  const [focus, ...corners] = collage

  return (
    // pt-section: white room between the highlights panel and the clay screen.
    <section aria-labelledby="about-title" className="pt-section">
      <CollageZoom className={styles.scene}>
        <div className={styles.stage}>
          {corners.map((photo, index) => (
            <div key={photo.src} data-slot={index + 1} className={styles.layer}>
              <div className={styles.photo}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-aspect-ratio: 4/5) 52vw, 34vw"
                  className="object-cover"
                  style={photo.position ? { objectPosition: photo.position } : undefined}
                />
              </div>
            </div>
          ))}

          <div className={styles.focus}>
            <div className={styles.focusImage}>
              <Image
                src={focus.src}
                alt={focus.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={focus.position ? { objectPosition: focus.position } : undefined}
              />
            </div>
            <div aria-hidden="true" className={styles.veil} />
          </div>

          <div className={styles.copy}>
            <SectionLabel tone="light">{label}</SectionLabel>
            <h2 id="about-title" className={styles.heading}>
              <Emphasis text={title} />
            </h2>
            <Link href={cta.href} className={styles.button}>
              <span>{cta.label}</span>
            </Link>
          </div>
        </div>
      </CollageZoom>
    </section>
  )
}
