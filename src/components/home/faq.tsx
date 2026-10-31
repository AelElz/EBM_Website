import { getCmsContent } from '@/cms/server'
import Link from '@/cms/link'

import { faq as defaultValue } from '@/content/home-details'
import { Container } from '@/components/ui/container'

import { FaqCards } from './faq-cards'
import { VideoFacade } from './video-facade'
import styles from './faq.module.css'
import { SectionHeading } from './emphasis'

export async function Faq() {
  const { faq } = await getCmsContent('homeDetails', { faq: defaultValue })
  return (
    <>
      <section aria-labelledby="school-video-title" className={styles.videoSection}>
        <Container>
          <div className={styles.videoHeading}>
            <SectionHeading id="school-video-title" text="L’école, *de l’intérieur*" />
            <p>Jad vous fait découvrir les Écoles Belges au Maroc.</p>
          </div>
          {faq.video.url && /^(?:\/(?!\/)|https?:\/\/)/i.test(faq.video.url) ? <video controls playsInline preload="metadata" poster={faq.video.poster.src} src={faq.video.url} aria-label={faq.video.title} className="aspect-video w-full object-cover">Votre navigateur ne peut pas lire cette vidéo.</video> : <VideoFacade id={faq.video.id} title={faq.video.title} poster={faq.video.poster} />}
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
