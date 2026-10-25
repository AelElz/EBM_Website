'use client'

import { useEffect, useState } from 'react'
import type { SchoolCalendarEvent } from '@/content/migration/admissions-calendar'
import styles from './admissions.module.css'

const dayFormat = new Intl.DateTimeFormat('fr-MA', { day: 'numeric', month: 'long', timeZone: 'Africa/Casablanca' })
const monthFormat = new Intl.DateTimeFormat('fr-MA', { month: 'long', year: 'numeric', timeZone: 'Africa/Casablanca' })
const dateObject = (date: string) => new Date(`${date}T12:00:00Z`)
const dateLabel = (event: SchoolCalendarEvent) => event.end_date_inclusive ? `${dayFormat.format(dateObject(event.start_date))} – ${dayFormat.format(dateObject(event.end_date_inclusive))}` : dayFormat.format(dateObject(event.start_date))
const typeOf = (event: SchoolCalendarEvent) => /vacances|congé/i.test(event.title) ? 'holidays' : /reprise|rentrée|dernier jour/i.test(event.title) ? 'school' : 'public'

export function CalendarBrowser({ events }: { events: SchoolCalendarEvent[] }) {
  const [campus, setCampus] = useState('network')
  const [level, setLevel] = useState('all')
  const [type, setType] = useState('all')
  const [period, setPeriod] = useState('all')
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => {
    const update = () => setToday(new Intl.DateTimeFormat('fr-CA', { timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()))
    update()
    const handleVisibility = () => { if (document.visibilityState === 'visible') update() }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])
  const filtered = events.filter(event => (type === 'all' || typeOf(event) === type) && (period === 'all' || today === null || (event.end_date_inclusive ?? event.start_date) >= today))
  const months = [...new Set(filtered.map(event => event.start_date.slice(0, 7)))]
  const chosenCampus = campus === 'casablanca' ? 'Casablanca' : campus === 'rabat' ? 'Rabat' : 'vos campus'
  return <div>
    <div className={styles.calendarControls}>
      <label className={styles.field}>Campus<select name="calendar-campus" autoComplete="off" value={campus} onChange={event => setCampus(event.target.value)}><option value="network">Les deux campus</option><option value="casablanca">Casablanca</option><option value="rabat">Rabat</option></select></label>
      <label className={styles.field}>Niveau<select name="calendar-level" autoComplete="off" value={level} onChange={event => setLevel(event.target.value)}><option value="all">Tous les niveaux</option><option value="accueil">Classe d’accueil</option><option value="maternelle">Maternelle</option><option value="primaire">Primaire</option><option value="secondaire">Secondaire</option></select></label>
      <label className={styles.field}>Type de date<select name="calendar-type" autoComplete="off" value={type} onChange={event => setType(event.target.value)}><option value="all">Toutes les dates</option><option value="holidays">Congés et vacances</option><option value="school">Rentrée et reprises</option><option value="public">Jours fériés publiés</option></select></label>
      <label className={styles.field}>Période<select name="calendar-period" autoComplete="off" value={period} onChange={event => setPeriod(event.target.value)}><option value="all">Toute l’année</option><option value="upcoming">En cours et à venir</option></select></label>
    </div>
    <p className={styles.help}>Le document scolaire s’applique au réseau. Le choix de campus et de niveau prépare votre demande de précisions : les dates communes restent affichées. L’organisation de la rentrée peut varier selon l’école.</p>
    <p className={styles.count} role="status" aria-live="polite">{filtered.length} dates du calendrier scolaire · aucun créneau de visite dans cette liste</p>
    <div className={styles.calendarLayout}>
      <div>{months.map(month => <section key={month} className={styles.month} aria-labelledby={`month-${month}`}><h3 id={`month-${month}`}>{monthFormat.format(dateObject(`${month}-01`))}</h3><ul className={styles.events}>{filtered.filter(event => event.start_date.startsWith(month)).map((event, index) => {
        const past = today !== null && (event.end_date_inclusive ?? event.start_date) < today
        const tentative = event.tentative_in_source || event.title === 'Premier Moharem'
        return <li key={`${event.start_date}-${index}`} className={styles.event}><div className={styles.eventDate}><time dateTime={event.start_date}>{dateLabel(event)}</time></div><div><h4>{event.title === 'rentrée' ? 'Rentrée scolaire' : event.title}</h4>{tentative && <p>Date lunaire estimée, à confirmer par l’école.</p>}{event.title === 'rentrée' && <p>Selon l’organisation de chaque école.</p>}{event.end_date_inclusive && <p>Dates incluses. Calendrier scolaire, sans réservation.</p>}<span className={styles.eventStatus}>{past ? 'Date passée' : today && event.start_date <= today ? 'En cours' : 'Date scolaire'}</span></div></li>
      })}</ul></section>)}{months.length === 0 && <p className={styles.empty}>Aucune date ne correspond à ces filtres. Consultez toute l’année ou demandez des précisions au campus.</p>}</div>
      <aside className={styles.side}><h3>Une question pour {chosenCampus} ?</h3><p>{level === 'all' ? 'Précisez le niveau de votre enfant lors de votre échange avec l’équipe.' : `Votre demande concerne ${level === 'accueil' ? 'la classe d’accueil' : level === 'maternelle' ? 'la maternelle' : level === 'primaire' ? 'le primaire' : 'le secondaire'}.`} Les rendez-vous de visite sont confirmés directement par l’école pour les familles ayant engagé une candidature.</p><a href={campus === 'network' ? '/contact' : `/contact#${campus}`}>Contacter le campus</a><br /><a href="/reserver-une-visite">Préparer une demande de visite</a></aside>
    </div>
  </div>
}
