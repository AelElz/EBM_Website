import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'

import { journey } from '@/content/journey'
import { ButtonLink } from '@/components/ui/button'

import styles from './journey.module.css'

/** Native radio choices: click/tap or arrow keys. Works before hydration and without JS. */
export function JourneyPicker() {
  return (
    <div className={styles.picker}>
      <fieldset className={styles.choices}>
        <legend className="sr-only">Choisissez la tranche d’âge de votre enfant</legend>
        {journey.stages.map((stage, index) => (
          <label key={stage.id} className={styles.choice}>
            <input
              type="radio"
              name="home-school-cycle"
              value={stage.id}
              defaultChecked={index === 0}
              aria-controls={`path-${stage.id}`}
              className={styles.radio}
            />
            <span className={styles.age}>{stage.ages} <span>ans</span></span>
            <span className={styles.stage}>{stage.name}</span>
            <Check aria-hidden="true" size={20} strokeWidth={2} className={styles.selected} />
          </label>
        ))}
      </fieldset>
      <p className={styles.note}>{journey.note}</p>

      {journey.stages.map((stage) => (
        <div key={stage.id} id={`path-${stage.id}`} data-cycle={stage.id} className={styles.panel}>
          <div className={styles.photo}>
            <Image
              src={stage.image.src}
              alt={stage.image.alt}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: stage.image.position }}
            />
          </div>
          <div className={styles.copy}>
            <h3 className="font-sans text-[clamp(1.75rem,2.7vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
              {stage.title}
            </h3>
            <ul className={styles.facts}>
              {stage.facts.map((fact) => (
                <li key={fact}>
                  <Check aria-hidden="true" size={21} strokeWidth={1.75} />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={journey.link.href} size="lg" className={styles.action}>
              {journey.link.label}<ArrowRight aria-hidden="true" size={18} />
            </ButtonLink>
          </div>
        </div>
      ))}
      <p className={styles.admission}>{journey.admission}</p>
    </div>
  )
}
