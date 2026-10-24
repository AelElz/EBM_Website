import Image from 'next/image'
import Link from 'next/link'

import { campusChapters } from '@/content/home-details'

import { CampusSwitcher } from './campus-switcher'
import styles from './campus-chapters.module.css'

/** Both campuses keep their real photos/copy, displayed in one shared frame. */
export function CampusChapters() {
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
          sizes="(min-width: 1280px) 220px, 160px"
          className="object-cover"
          style={{ objectPosition: chapter.image.position }}
        />
      ))}
    >
      {campusChapters.map(chapter => (
        <article key={chapter.key} aria-labelledby={`campus-${chapter.key}`} className={styles.inner}>
          <h3 id={`campus-${chapter.key}`} className={styles.title}>{chapter.title}</h3>
          <ul role="list" className={styles.facts}>
            {chapter.facts.map(fact => <li key={fact}>{fact}</li>)}
          </ul>
          <div className={styles.portrait}>
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="(min-width: 1280px) 42vw, (min-width: 768px) 420px, 70vw"
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
