import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Container } from '@/components/ui/container'
import type { ImageAsset } from '@/content/types'

import styles from './editorial.module.css'

/*
 * The hero of the editorial inner pages: breadcrumb, a large Playfair title and its sentence on
 * Riad Paper, the actions, the photo beside them from 1024px (inside the page margins, like the
 * figures), then a strip of four key figures taken from the page's own content.
 */
export function EditorialHero({
  title,
  intro,
  trail,
  image,
  actions,
  facts,
}: {
  title: string
  intro: string
  /** The breadcrumb after "Accueil"; the last item is the current page. */
  trail: { label: string; href?: string }[]
  image: ImageAsset
  actions?: ReactNode
  facts: { value: string; label: string }[]
}) {
  return (
    <section aria-labelledby="page-title" className={styles.hero}>
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              {trail.map((item, index) => (
                <li key={item.label}>
                  {item.href && index < trail.length - 1 ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {/* A long title (more than about four words) steps down from the display size. */}
          <h1 id="page-title" className={title.length > 32 ? styles.longTitle : undefined}>
            {title}
          </h1>
          <p>{intro}</p>
          {actions ? <div className={styles.heroActions}>{actions}</div> : null}
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </div>
      </Container>
      <Container>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.value + fact.label}>
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
