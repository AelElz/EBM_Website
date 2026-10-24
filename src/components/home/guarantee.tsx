import { Check } from 'lucide-react'

import { guarantee } from '@/content/home-details'
import { Container } from '@/components/ui/container'

import { CertificatePath } from './certificate-path'
import styles from './guarantee.module.css'

/** One connected diagram, instead of the former eight-row institutional table. */
export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-title" className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <h2 id="guarantee-title" className="font-sans text-h2 font-semibold tracking-[-0.025em]">
            {guarantee.title}
          </h2>
          <p>{guarantee.text}</p>
        </div>
        <CertificatePath className={styles.path}>
          {guarantee.milestones.map((step, index) => (
            <li key={step.code}>
              {index < guarantee.milestones.length - 1 && (
                <span aria-hidden="true" className={styles.rail}>
                  <span className={styles.railFill} />
                </span>
              )}
              <span className={styles.node}><Check aria-hidden="true" size={28} strokeWidth={1.75} /></span>
              <div>
                <h3>{step.code}</h3>
                <p>{step.when}</p>
                <span className={styles.fullName}>{step.name}</span>
              </div>
            </li>
          ))}
        </CertificatePath>
        <p className={styles.result}>{guarantee.result}</p>
      </Container>
    </section>
  )
}
