import Link from '@/cms/link'
import { getCmsContent } from '@/cms/server'
import Image from '@/cms/image'

import { partners as defaultPartners, type Partner } from '@/content/partners'

import styles from './partners-marquee.module.css'

/*
 * The partners strip (31 Oct 2026, from Ayoub's reference of a logo marquee): the entities EBM
 * works with (content/partners.ts) glide slowly across the screen, in charcoal on white. Pure
 * CSS: the list is drawn twice and moves by half its width, so the loop never jumps; hovering or
 * focusing pauses it. Under reduced motion it stands still, wrapped and centred. Server
 * Component.
 */
function Mark({ partner }: { partner: Partner }) {
  return partner.logo?.src ? (
    <Image
      src={partner.logo.src}
      alt=""
      width={partner.logo.width}
      height={partner.logo.height}
      sizes="160px"
      className={styles.logo}
    />
  ) : (
    <span className={styles.wordmark} aria-hidden="true">
      <span className={styles.wordmarkName}>{partner.name}</span>
      <span className={styles.wordmarkDetail}>{partner.detail}</span>
    </span>
  )
}

export async function PartnersMarquee() {
  const partners = await getCmsContent('partners', defaultPartners)
  return (
    <section aria-labelledby="partenaires-title" className={styles.section}>
      <h2 id="partenaires-title" className={styles.label}>
        Ils avancent avec nous
      </h2>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul key={copy} role="list" className={styles.list} aria-hidden={copy === 1 ? true : undefined}>
              {partners.map((partner) => (
                <li key={partner.name} className={styles.item} title={`${partner.name} · ${partner.detail}`}>
                  <>{partner.href ? <Link href={partner.href} aria-label={partner.name} tabIndex={copy === 1 ? -1 : undefined}><Mark partner={partner} /></Link> : <Mark partner={partner} />}</>
                  {copy === 0 ? (
                    <span className="sr-only">
                      {partner.name}, {partner.detail}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
