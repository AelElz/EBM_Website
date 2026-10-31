import { getCmsContent } from '@/cms/server'
import { ArrowRight } from 'lucide-react'
import Image from '@/cms/image'
import Link from '@/cms/link'

import { homeBands as defaultHomeBands } from '@/content/home-bands'
import { Container } from '@/components/ui/container'

import { BandHeading } from './band-heading'
import styles from './bands.module.css'

/*
 * Band 4 of Ayoub's board: the pedagogy on olive, centred. The three medallions are the board's
 * white line drawings; each opens through a circle and turns a few degrees into place as it
 * enters (scroll-driven, bands.module.css). Pillar names in tracked capitals and the white pill
 * button, as on the board (his exception to the home's button and label rules).
 * Server Component, no client JS.
 */
export async function PedagogyBand() {
  const homeBands = await getCmsContent('homeBands', defaultHomeBands)
  const { label, title, text, pillars, cta } = homeBands.pedagogy

  return (
    <section aria-labelledby="pedagogy-title" className="bg-olive py-[clamp(72px,8vw,112px)] text-white">
      <Container className="text-center">
        <BandHeading id="pedagogy-title" label={label} title={title} tone="white" className="reveal" />
        <p className="reveal-2 mx-auto mt-4 max-w-[52ch] text-lead">{text}</p>

        <ul role="list" className={styles.pillars}>
          {pillars.map((pillar) => (
            <li key={pillar.title} className={styles.pillar}>
              <div className={styles.medallion}>
                <Image src={pillar.image} alt="" width={560} height={549} sizes="200px" />
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className="mx-auto mt-1.5 max-w-[30ch] text-base leading-[1.5]">{pillar.text}</p>
            </li>
          ))}
        </ul>

        <Link href={cta.href} className={`${styles.pill} reveal`}>
          {cta.label}
          <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
        </Link>
      </Container>
    </section>
  )
}
