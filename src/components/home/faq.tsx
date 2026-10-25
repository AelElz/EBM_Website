import Link from 'next/link'

import { faq } from '@/content/home-details'
import { Container } from '@/components/ui/container'

import { FaqCards } from './faq-cards'
import { VideoFacade } from './video-facade'
import styles from './faq.module.css'
import { SectionHeading } from './emphasis'

export function Faq() {
  return (
    <>
      <section aria-labelledby="school-video-title" className={styles.videoSection}>
        <Container>
          <div className={styles.videoHeading}>
            <SectionHeading id="school-video-title" text="L’école, *de l’intérieur*" />
            <p>Jad vous fait découvrir les Écoles Belges au Maroc.</p>
          </div>
          <VideoFacade id={faq.video.id} title={faq.video.title} poster={faq.video.poster} />
        </Container>
      </section>
      <section aria-labelledby="faq-title" className={styles.section}>
        <Container>
          <div className={styles.layout}>
            <div>
              <SectionHeading id="faq-title" text={faq.title} />
              <p className={styles.intro}>Une question, une réponse.</p>
            </div>
            <FaqCards items={faq.items} />
            <Link href={faq.more.href} className={styles.more}>{faq.more.label}</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
