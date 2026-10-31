import { getAdmissions } from '@/cms/admissions'
import { getCampuses } from '@/cms/campuses'
import { CmsAnchor } from '@/cms/link'
import styles from './admissions.module.css'

export async function DocumentChecklist() {
  const { applicationDocuments } = await getAdmissions()
  return <div className={styles.documents}>{applicationDocuments.map(document => <article key={document.title} className={styles.document}><span className={styles.documentCondition}>{document.condition}</span><h3>{document.title}</h3><p>{document.text}</p></article>)}</div>
}

export async function AdmissionsContacts() {
  const campuses = await getCampuses()
  return <div className={styles.contacts}>{campuses.map(campus => <article id={campus.slug} className={styles.contact} key={campus.slug}><h3>{campus.city} · {campus.district}</h3><p>{campus.address.join(', ')}</p><ul>{campus.contacts.map(service => <li key={service.email}><CmsAnchor href={`mailto:${service.email}`}>{service.email}</CmsAnchor><small>{service.label}</small>{service.phones.map(phone => <p key={phone.href}><CmsAnchor href={phone.href}>{phone.display}</CmsAnchor></p>)}</li>)}</ul></article>)}</div>
}
