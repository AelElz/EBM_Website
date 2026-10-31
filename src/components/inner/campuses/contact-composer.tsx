'use client'
import { CmsAnchor } from '@/cms/link'


import { useEffect, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'

import styles from './campuses.module.css'

interface Recipient { id: string; campus: 'casablanca' | 'rabat'; label: string; email: string }
const subjects = ['Une question sur les admissions', 'Demander une visite', 'Vie scolaire et services', 'Autre question']

/** A mailto composer only. No website collection, delivery, success state or third-party script. */
export function ContactComposer({ recipients, initialCampus, initialSubject, context = 'contact' }: {
  recipients: Recipient[]
  initialCampus?: 'casablanca' | 'rabat'
  initialSubject?: string
  context?: 'contact' | 'visit'
}) {
  const [enhanced, setEnhanced] = useState(false)
  useEffect(() => setEnhanced(true), [])
  const availableSubjects = initialSubject && !subjects.includes(initialSubject) ? [initialSubject, ...subjects] : subjects
  const [recipientId, setRecipientId] = useState(recipients.find((item) => item.campus === initialCampus)?.id ?? recipients[0]?.id ?? '')
  const [subject, setSubject] = useState(initialSubject ?? subjects[0])
  const [message, setMessage] = useState('')
  const recipient = recipients.find((item) => item.id === recipientId) ?? recipients[0]
  const href = `mailto:${recipient?.email ?? ''}?subject=${encodeURIComponent(`${subject} — ${recipient?.label ?? ''}`)}&body=${encodeURIComponent(message)}`

  if (!recipient) return <p className={styles.notice}>Aucun service de contact n’est publié pour le moment.</p>
  return (
    <div className={styles.composer} data-enhanced={enhanced ? '' : undefined}>
      <p className={styles.notice}>{context === 'visit' ? 'Vous préparez une demande de visite, pas une réservation confirmée. ' : 'Le formulaire d’envoi du site n’est pas encore disponible. '}Préparez un e-mail ici, puis vérifiez-le et envoyez-le dans votre messagerie. Le site ne conserve pas votre message et ne l’envoie pas.</p>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Campus et service</span>
          <select name="campus-service" autoComplete="off" value={recipientId} onChange={(event) => setRecipientId(event.target.value)}>
            {recipients.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          <span>Votre demande</span>
          <select name="request-subject" autoComplete="off" value={subject} onChange={(event) => setSubject(event.target.value)}>
            {availableSubjects.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className={`${styles.field} ${styles.message}`}>
          <span>Votre message (facultatif)</span>
          <textarea name="message" autoComplete="off" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1500} aria-describedby="contact-message-hint" />
          <span id="contact-message-hint" className={styles.fieldHint}>Pour protéger vos informations, ne joignez pas de dossier scolaire ou de document d’identité à cette première demande.</span>
        </label>
      </div>
      <p className={styles.composerAddress}>Destinataire : <strong>{recipient.email}</strong></p>
      <div className={styles.actions}><CmsAnchor className={buttonVariants({ size: 'lg' })} href={href}>Ouvrir ma messagerie</CmsAnchor></div>
      <noscript><p className={styles.notice}>Vous pouvez écrire directement aux adresses des campus ci-dessus.</p></noscript>
    </div>
  )
}
