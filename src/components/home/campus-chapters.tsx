import { getCmsContent } from '@/cms/server'
import Image from '@/cms/image'
import Link from '@/cms/link'
import { Fragment, type CSSProperties } from 'react'

import { campusChapters as defaultValue } from '@/content/home-details'

import { CampusSwitcher } from './campus-switcher'
import styles from './campus-chapters.module.css'

/** Both campuses keep their real photos/copy, displayed in one shared frame. */
export async function CampusChapters() {
  const { campusChapters } = await getCmsContent('homeDetails', { campusChapters: defaultValue })
  return (
    <CampusSwitcher
      campuses={campusChapters.map(chapter => ({
        key: chapter.key,
        label: chapter.key === 'rabat' ? 'Rabat' : 'Casablanca',
        href: chapter.link.href,
      }))}
      previews={campusChapters.map(chapter => (
        <Image
          key={chapter.key}
          src={chapter.image.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 480px, 320px"
          className="object-cover"
          style={{ objectPosition: chapter.image.position }}
        />
      ))}
    >
      {campusChapters.map(chapter => (
        <article key={chapter.key} aria-labelledby={`campus-${chapter.key}`} className={styles.inner}>
          <h3 id={`campus-${chapter.key}`} className={styles.title}>
            <span className="sr-only">{chapter.title}</span>
            <span aria-hidden="true">
              {chapter.title.split(' ').map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span className={styles.wordMask}>
                    <span className={styles.word} style={{ '--word': index } as CSSProperties}>{word}</span>
                  </span>{' '}
                </Fragment>
              ))}
            </span>
          </h3>
          <ul role="list" className={styles.facts}>
            {chapter.facts.map((fact, index) => (
              <li key={fact} style={{ '--fact': index } as CSSProperties}>{fact}</li>
            ))}
          </ul>
          <div className={styles.portrait}>
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="(min-width: 1280px) 1140px, (min-width: 768px) 840px, 110vw"
              className="object-cover"
              style={{ objectPosition: chapter.image.position }}
            />
          </div>
          <p className={styles.text}>{chapter.text}</p>
          <Link href={chapter.link.href} className={styles.link}>{chapter.link.label}</Link>
        </article>
      ))}
    </CampusSwitcher>
  )
}
