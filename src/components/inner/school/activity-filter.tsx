'use client'

import { Children, useState, type ReactNode } from 'react'
import styles from './school.module.css'

export function ActivityFilter({ activities, children }: { activities: { id: string; type: string }[]; children: ReactNode }) {
  const [type, setType] = useState('all')
  const options = [{ value: 'all', label: 'Tous les domaines' }, { value: 'sport', label: 'Sport' }, { value: 'arts', label: 'Arts' }, { value: 'culture', label: 'Culture' }]
  const count = activities.filter(activity => type === 'all' || activity.type === type).length
  return <div>
    <div className={styles.filter}><label htmlFor="activity-type">Un domaine à découvrir</label><select id="activity-type" value={type} onChange={event => setType(event.target.value)}>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><p role="status" aria-live="polite">{count} {count > 1 ? 'domaines' : 'domaine'}</p></div>
    <div className={styles.activityGrid}>{Children.map(children, (child, index) => <div hidden={type !== 'all' && activities[index].type !== type}>{child}</div>)}</div>
  </div>
}
