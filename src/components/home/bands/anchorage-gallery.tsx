'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from '@/cms/image'
import { useState, type ReactNode } from 'react'

import type { ImageAsset } from '@/content/types'
import { NNBSP } from '@/lib/typography'
import { cn } from '@/lib/utils'

import styles from './bands.module.css'

type Photo = ImageAsset & { caption: string }

/*
 * The layout of band 3, as on Ayoub's board: the photo mosaic on the left (one large photo, two
 * below), the text on the right (`children`, server-rendered), and the two round arrows at the
 * band's lower right. The arrows or a thumbnail bring a photo into the large frame, which wipes
 * in over the previous one (clip-path, 900ms, bands.module.css); the caption under it is
 * announced politely. Before hydration and without JS the server HTML is the board's still
 * mosaic. Reduced motion: the wipe becomes instant (globals.css guard).
 */
export function AnchorageGallery({ photos, children }: { photos: Photo[]; children: ReactNode }) {
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const count = photos.length

  const show = (index: number, dir: 'next' | 'prev') => {
    if (index === active) return
    setPrevious(active)
    setDirection(dir)
    setActive(index)
  }

  const others = [1, 2].map((step) => (active + step) % count)

  return (
    <div className={styles.anchorage}>
      <div className={styles.gallery}>
        <figure>
          <div className={styles.galleryFrame} data-direction={direction}>
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className={styles.slide}
                data-state={index === active ? 'active' : index === previous ? 'previous' : 'idle'}
                aria-hidden={index === active ? undefined : true}
              >
                <Image
                  src={photo.src}
                  alt={index === active ? photo.alt : ''}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                />
              </div>
            ))}
          </div>
          <figcaption aria-live="polite" className={styles.galleryCaption}>
            {photos[active].caption}
          </figcaption>
        </figure>

        <ul role="list" className={styles.galleryThumbs}>
          {others.map((index, slot) => (
            <li key={slot}>
              <button
                type="button"
                onClick={() => show(index, 'next')}
                aria-label={`Afficher en grand${NNBSP}: ${photos[index].caption}`}
                className={styles.thumb}
              >
                <Image
                  key={photos[index].src}
                  src={photos[index].src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, 50vw"
                  className={cn('object-cover', styles.thumbImage)}
                  style={{ objectPosition: photos[index].position }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {children}

      <div className={styles.galleryArrows}>
        <button
          type="button"
          aria-label={`Coopération${NNBSP}: photo précédente`}
          onClick={() => show((active - 1 + count) % count, 'prev')}
          className={styles.arrow}
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label={`Coopération${NNBSP}: photo suivante`}
          onClick={() => show((active + 1) % count, 'next')}
          className={styles.arrow}
        >
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
