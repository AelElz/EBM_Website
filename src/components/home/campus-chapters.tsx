import Image from 'next/image'
import Link from 'next/link'

import { campusChapters } from '@/content/home-details'

import styles from './campus-chapters.module.css'

/*
 * Home section "Nos deux campus" (taste skill, "Portrait on its own ground"): one chapter per
 * campus, each a full-bleed field in the darkest large tone of its photo (Olive Grove for the
 * Casablanca courtyard, Charcoal for Rabat), with a 3:4 portrait of the campus in the middle and
 * the type in the four corners: name top left, facts top right, one sentence bottom left, the
 * link to the campus page bottom right. As a chapter arrives, its field grows from an inset panel
 * to the full width and the portrait settles from 0.92 to 1 (campus-chapters.module.css, scroll-
 * driven CSS only). Text never sits on the photo. Server Component, no client JS.
 */
export function CampusChapters() {
  return (
    <section aria-labelledby="campus-title">
      <h2 id="campus-title" className="sr-only">
        Nos deux campus
      </h2>
      {campusChapters.map((chapter) => (
        <article
          key={chapter.key}
          aria-labelledby={`campus-${chapter.key}`}
          className={styles.chapter}
          data-field={chapter.field}
        >
          <div className={styles.inner}>
            <h3 id={`campus-${chapter.key}`} className={styles.title}>
              {chapter.title}
            </h3>
            <ul role="list" className={styles.facts}>
              {chapter.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className={styles.portrait}>
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                sizes="(min-width: 1024px) 1140px, 160vw"
                className="object-cover"
                style={{ objectPosition: chapter.image.position }}
              />
            </div>
            <p className={styles.text}>{chapter.text}</p>
            <Link href={chapter.link.href} className={styles.link}>
              {chapter.link.label}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
