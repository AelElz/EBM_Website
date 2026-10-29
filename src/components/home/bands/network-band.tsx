import { Backpack, CalendarDays, LandPlot, Plane, School, UsersRound, type LucideIcon } from 'lucide-react'
import Image from 'next/image'

import { homeBands, type BandIcon } from '@/content/home-bands'
import { Container } from '@/components/ui/container'

import { CountUp } from '../count-up'
import { BandHeading } from './band-heading'
import styles from './bands.module.css'

/*
 * Band 2 of Ayoub's board, replacing the key figures: the network on charcoal over the
 * black-and-white courtyard, centred as on the board, then the six figures in one row from
 * 1280px (icon above, number, label), counting up one after the other (count-up.tsx, 120ms
 * apart). Server Component; only the numbers are client islands.
 *
 * The photo is drawn at 22% over charcoal, so white text stays >= 7:1 on the sunlit floor.
 * The board's clay numbers and label are a lighter clay here (Ember, bands.module.css): Fired
 * Clay itself measures 2.2:1 on this ground. The photo drifts slowly with the scroll.
 * Figures from the board; EBM to confirm (src/content/home-bands.ts).
 */

const icons: Record<BandIcon, LucideIcon> = {
  founded: CalendarDays,
  campus: School,
  pupils: Backpack,
  staff: UsersRound,
  expatriates: Plane,
  surface: LandPlot,
}

export function NetworkBand() {
  const { label, title, paragraphs, image, figures } = homeBands.network

  return (
    <section aria-labelledby="network-title" className={styles.network}>
      <div className={styles.networkPhoto}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
      </div>

      <Container className="relative text-center">
        <BandHeading id="network-title" label={label} title={title} tone="ember" className="reveal" />
        <div className={`${styles.networkText} reveal-2`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className={styles.figures}>
          {figures.map((figure, index) => {
            const Icon = icons[figure.icon]
            return (
              <div key={figure.label} className={styles.figure}>
                <dt className={styles.figureLabel}>{figure.label}</dt>
                <dd className={styles.figureValue}>
                  {figure.prefix}
                  <CountUp value={figure.value} from={figure.countFrom} delay={index * 120} />
                  {figure.suffix ? <span className={styles.figureUnit}>{figure.suffix}</span> : null}
                </dd>
                <dd className={styles.figureIconCell} aria-hidden="true">
                  <Icon strokeWidth={1.25} className={styles.figureIcon} />
                </dd>
              </div>
            )
          })}
        </dl>
      </Container>
    </section>
  )
}
