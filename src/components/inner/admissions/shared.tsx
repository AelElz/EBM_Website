import { applicationDocuments } from '@/content/migration/admissions'
import { site } from '@/content/site'
import styles from './admissions.module.css'

export function DocumentChecklist() {
  return <div className={styles.documents}>{applicationDocuments.map(document => <article key={document.title} className={styles.document}><span className={styles.documentCondition}>{document.condition}</span><h3>{document.title}</h3><p>{document.text}</p></article>)}</div>
}

export function AdmissionsContacts() {
  return <div className={styles.contacts}>{(['casablanca', 'rabat'] as const).map(campus => <article id={campus} className={styles.contact} key={campus}><h3>{campus === 'casablanca' ? 'Casablanca · Dar Bouazza' : 'Rabat · Hay Riad'}</h3><p>{site.addresses[campus].lines.join(', ')}</p><ul><li><a href={site.phones[campus].href}>{site.phones[campus].display}</a></li>{site.emails[campus].map((email, index) => <li key={email.address}><a href={email.href}>{email.address}</a>{campus === 'casablanca' && <small>{index === 0 ? 'Section fondamentale' : 'Section secondaire'}</small>}</li>)}</ul></article>)}</div>
}
