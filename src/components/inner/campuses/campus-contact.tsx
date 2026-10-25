import { ArrowUpRight } from 'lucide-react'

import { campusRequestHref, type MigratedCampus } from '@/content/migration/campuses'

import styles from './campuses.module.css'

export function CampusContact({ campus, showTitle = true }: { campus: MigratedCampus; showTitle?: boolean }) {
  return (
    <div className={styles.contact}>
      {showTitle ? <h3>{campus.city}, {campus.district}</h3> : null}
      <address className={styles.address}>{campus.address.map((line) => <span className="block" key={line}>{line}</span>)}</address>
      {campus.contacts.map((service, index) => (
        <div key={service.email} className={styles.service}>
          <h4>{service.label}</h4>
          {service.phones.map((number) => <a key={number.href} href={number.href} className={styles.contactLink}>{number.display}{number.label === 'Mobile' ? ' (mobile)' : ''}</a>)}
          <a href={`mailto:${service.email}`} className={styles.contactLink}>{service.email}</a>
          <a href={campusRequestHref(campus, 'Demande de renseignements', index)} className={styles.textLink}>Écrire au service</a>
        </div>
      ))}
      <div className={styles.actions}><a className={styles.textLink} href={campus.directionsUrl} target="_blank" rel="noopener noreferrer">Rechercher l’adresse sur Google Maps<ArrowUpRight aria-hidden="true" size={18} /><span className="sr-only"> (nouvel onglet)</span></a></div>
    </div>
  )
}
