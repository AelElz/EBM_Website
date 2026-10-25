import Image from 'next/image'
import Link from 'next/link'

import { admissionsPath } from '@/content/home-details'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import styles from './admissions-path.module.css'
import { SectionHeading } from './emphasis'

/** A literal, readable admissions sequence; all content is rendered on the server. */
export function AdmissionsPath() {
  const { title, text, reassurance, image, phases, apply, more } = admissionsPath

  return (
    <section aria-labelledby="admissions-title" className={styles.section}>
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <SectionHeading id="admissions-title" text={title} />
          <p className={styles.lead}>{text}</p>
        </div>

        <div className={styles.process}>
          <ol role="list" className={styles.steps}>
            {phases.map((phase, index) => (
              <li key={phase.name} className={styles.step}>
                {index < phases.length - 1 && <span aria-hidden="true" className={styles.rail} />}
                <span aria-hidden="true" className={styles.number}>{index + 1}</span>
                <div>
                  <h3 className={styles.phaseTitle}>{phase.name}</h3>
                  <p className={styles.phaseText}>{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.actions}>
            <ButtonLink href={apply.href} size="lg">{apply.label}</ButtonLink>
            <Link href={more.href} className={styles.details}>{more.label}</Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.photo}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1240px) 480px, (min-width: 768px) 43vw, 100vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
          <div className={styles.reassurance}>
            <p>{reassurance.title}</p>
            <span>{reassurance.text}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
