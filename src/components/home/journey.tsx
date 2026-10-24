import { journey } from '@/content/journey'
import { Container } from '@/components/ui/container'

import { JourneyPicker } from './journey-picker'
import styles from './journey.module.css'

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2 id="journey-title" className="font-sans text-h2 font-semibold tracking-[-0.025em]">
            {journey.title.map((line) => <span key={line} className="block">{line}</span>)}
          </h2>
          <p className="max-w-[24ch] text-lead">{journey.text}</p>
        </div>
        <JourneyPicker />
      </Container>
    </section>
  )
}
