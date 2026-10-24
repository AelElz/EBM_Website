import Image from 'next/image'
import Link from 'next/link'

import { home } from '@/content/home'
import { Container } from '@/components/ui/container'

import { Emphasis } from './emphasis'
import styles from './stages.module.css'

/*
 * Home section 3 (docs/HOME-SPEC.md): "Un seul parcours, de 2 à 18 ans", the three school
 * stages, after Korowa's "From first steps to future leaders" (Ayoub's screenshot, 24 Oct 2026).
 * Each panel is one link: its accessible name is the stage and the ages, so the photo stays decorative
 * (alt=""). Layout and the hover reveal: stages.module.css. Server Component, no client JS.
 *
 * The block is wider than the page column (90rem with gutters), as on Korowa.
 */
export function Stages() {
  const { title, stages } = home.stages

  return (
    <section aria-labelledby="stages-title" className="pt-section">
      <Container className="text-center">
        <h2
          id="stages-title"
          className="mx-auto max-w-[11em] font-sans text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02] font-semibold tracking-[-0.025em]"
        >
          <Emphasis text={title} accentClassName="text-terracotta" />
        </h2>
      </Container>

      <Container size="wide" className="mt-10 lg:mt-12">
        <ul role="list" className={styles.list}>
          {stages.map((stage) => (
            <li key={stage.title} className={styles.item}>
              <Link href={stage.href} aria-label={`${stage.title}, ${stage.ages}`} className={styles.panel}>
                <span className={styles.band}>
                  <span className={styles.bandTitle}>{stage.title}</span>{' '}
                  <span className={styles.bandAges}>{stage.ages}</span>
                </span>
                <span className={styles.photo}>
                  <Image
                    src={stage.image.src}
                    alt={stage.image.alt}
                    fill
                    sizes="(min-width: 1440px) 460px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    style={stage.image.position ? { objectPosition: stage.image.position } : undefined}
                  />
                </span>
                <span aria-hidden="true" className={styles.name}>
                  {stage.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
