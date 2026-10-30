'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import type { CalendarCampus, CalendarCategory, CalendarEntry } from '@/lib/calendar'

import styles from './calendar.module.css'

/*
 * The /calendrier dashboard (30 Oct 2026, Apple design skill, utility surface: quiet chrome, type
 * and space, state changes only). Four cards answer the families' questions at a glance (where
 * we are today, the next date, the next holidays, how far into the year); one month at a time,
 * chosen by month and year (Ayoub, 30 Oct), with the chosen day's dates beside it; then the
 * agenda lists every date with its filters. The data comes
 * from the CMS or the signed document (src/lib/calendar.ts); `today` is computed on the server
 * in Casablanca time and refreshed here when the tab comes back.
 */

const TZ = 'UTC' // every day is stored as YYYY-MM-DD and read at noon UTC
const day = (date: string) => new Date(`${date}T12:00:00Z`)
/* French writes the first of the month "1er". */
const fmt = (options: Intl.DateTimeFormatOptions) => {
  const format = new Intl.DateTimeFormat('fr-FR', { timeZone: TZ, ...options })
  return { format: (date: Date) => format.format(date).replace(/(^|\s)1(\s)/, '$11er$2') }
}
const dayMonth = fmt({ day: 'numeric', month: 'long' })
const weekdayDayMonth = fmt({ weekday: 'long', day: 'numeric', month: 'long' })
const monthYear = fmt({ month: 'long', year: 'numeric' })
const monthShort = fmt({ month: 'short' })
const monthName = fmt({ month: 'long' })

function addDays(date: string, amount: number) {
  const d = day(date)
  d.setUTCDate(d.getUTCDate() + amount)
  return d.toISOString().slice(0, 10)
}
function shiftMonth(month: string, amount: number) {
  const d = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 1 + amount, 1))
  return d.toISOString().slice(0, 7)
}
const daysInMonth = (month: string) => new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)).getUTCDate()
const daysBetween = (from: string, to: string) => Math.round((day(to).getTime() - day(from).getTime()) / 86_400_000)
const lastDay = (entry: CalendarEntry) => entry.end ?? entry.start
const covers = (entry: CalendarEntry, date: string) => entry.start <= date && date <= lastDay(entry)
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/* "Du 10 au 11 mars", or "Du 17 octobre au 1er novembre" across two months. */
function span(start: string, end: string) {
  const from = start.slice(0, 7) === end.slice(0, 7) ? dayMonth.format(day(start)).split(' ')[0] : dayMonth.format(day(start))
  return `Du ${from} au ${dayMonth.format(day(end))}`
}

function inDays(count: number) {
  if (count === 0) return 'Aujourd’hui'
  if (count === 1) return 'Demain'
  return `Dans ${count} jours`
}

const categoryLabels: Record<CalendarCategory, string> = {
  holidays: 'Congés et vacances',
  school: 'Rentrée et reprises',
  public: 'Jours fériés',
  event: 'Événements',
}
const campusLabels: Record<CalendarCampus, string> = { network: 'Les deux campus', casablanca: 'Casablanca', rabat: 'Rabat' }

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.segmented}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={styles.segment}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function CalendarDashboard({ entries, initialToday }: { entries: CalendarEntry[]; initialToday: string }) {
  const [today, setToday] = useState(initialToday)
  const [category, setCategory] = useState<'all' | CalendarCategory>('all')
  const [campus, setCampus] = useState<CalendarCampus>('network')
  const [upcomingOnly, setUpcomingOnly] = useState(true)

  useEffect(() => {
    const update = () =>
      setToday(
        new Intl.DateTimeFormat('fr-CA', { timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
      )
    update()
    const onVisible = () => document.visibilityState === 'visible' && update()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const sorted = useMemo(() => [...entries].sort((a, b) => a.start.localeCompare(b.start)), [entries])
  const forCampus = useMemo(
    () => sorted.filter((entry) => campus === 'network' || entry.campus === 'network' || entry.campus === campus),
    [sorted, campus],
  )

  /* ---- The four cards ---- */
  const firstDay = sorted.find((entry) => /rentrée/i.test(entry.title))?.start ?? sorted[0]?.start
  const finalDay = [...sorted].reverse().find((entry) => /dernier jour/i.test(entry.title))?.start ?? lastDay(sorted.at(-1)!)
  const holidayNow = forCampus.find((entry) => entry.category === 'holidays' && covers(entry, today))
  const resume = (after: string) => forCampus.find((entry) => entry.category === 'school' && entry.start > after)
  const nextDate = forCampus.find((entry) => entry.start > today)
  const nextHolidays = forCampus.find((entry) => entry.category === 'holidays' && entry.start > today)
  const yearLength = Math.max(1, daysBetween(firstDay, finalDay))
  const elapsed = Math.min(yearLength, Math.max(0, daysBetween(firstDay, today)))
  const progress = Math.round((elapsed / yearLength) * 100)
  const beforeYear = today < firstDay
  const afterYear = today > finalDay

  /* ---- The month view: the months the calendar covers, the one on screen, the chosen day ---- */
  const months = useMemo(() => {
    if (!sorted.length) return []
    const last = lastDay(sorted.at(-1)!).slice(0, 7)
    const list: string[] = []
    for (let cursor = sorted[0].start.slice(0, 7); cursor <= last; cursor = shiftMonth(cursor, 1)) list.push(cursor)
    return list
  }, [sorted])
  const clampMonth = (month: string) => (month < months[0] ? months[0] : month > months.at(-1)! ? months.at(-1)! : month)
  const [shown, setShown] = useState(() => clampMonth(initialToday.slice(0, 7)))
  const [picked, setPicked] = useState<string | null>(null)
  const years = [...new Set(months.map((month) => month.slice(0, 4)))]
  const monthsOfYear = months.filter((month) => month.startsWith(shown.slice(0, 4)))
  const at = months.indexOf(shown)

  function show(month: string) {
    setShown(clampMonth(month))
    setPicked(null)
  }

  const shownFirst = `${shown}-01`
  const offset = (day(shownFirst).getUTCDay() + 6) % 7
  const shownDays = Array.from({ length: daysInMonth(shown) }, (_, index) => addDays(shownFirst, index))
  const cells: (string | null)[] = [...Array.from({ length: offset }, () => null), ...shownDays]
  while (cells.length % 7) cells.push(null)
  const weeks = Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7))
  const onDay = (date: string) => forCampus.filter((entry) => covers(entry, date))
  const inShown = forCampus.filter((entry) => entry.start.slice(0, 7) <= shown && lastDay(entry).slice(0, 7) >= shown)
  const focusDay =
    picked ?? (today.startsWith(shown) ? today : (inShown.map((entry) => (entry.start < shownFirst ? shownFirst : entry.start))[0] ?? shownFirst))
  const focusEntries = onDay(focusDay)

  /* ---- The agenda ---- */
  const listed = forCampus.filter(
    (entry) => (category === 'all' || entry.category === category) && (!upcomingOnly || lastDay(entry) >= today),
  )
  const listedMonths = [...new Set(listed.map((entry) => entry.start.slice(0, 7)))]
  const categories = (['holidays', 'school', 'public', 'event'] as CalendarCategory[]).filter((value) =>
    sorted.some((entry) => entry.category === value),
  )
  const hasCampusDates = sorted.some((entry) => entry.campus !== 'network')

  return (
    <div className={styles.dashboard}>
      {/* ---- At a glance ---- */}
      <section aria-label="En un coup d’œil" className={styles.cards}>
        <article className={styles.card}>
          <p className={styles.cardLabel}>Aujourd’hui</p>
          {holidayNow ? (
            <>
              <p className={styles.cardValue}>En vacances</p>
              <p className={styles.cardText}>
                {holidayNow.title}. {resume(lastDay(holidayNow)) ? `Reprise le ${weekdayDayMonth.format(day(resume(lastDay(holidayNow))!.start))}.` : ''}
              </p>
            </>
          ) : beforeYear ? (
            <>
              <p className={styles.cardValue}>Avant la rentrée</p>
              <p className={styles.cardText}>Rentrée le {weekdayDayMonth.format(day(firstDay))}.</p>
            </>
          ) : afterYear ? (
            <>
              <p className={styles.cardValue}>Année terminée</p>
              <p className={styles.cardText}>Bel été à toutes les familles.</p>
            </>
          ) : (
            <>
              <p className={styles.cardValue}>En classe</p>
              <p className={styles.cardText}>{capitalise(weekdayDayMonth.format(day(today)))}.</p>
            </>
          )}
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>Prochaine date</p>
          {nextDate ? (
            <>
              <p className={styles.cardValue}>{inDays(daysBetween(today, nextDate.start))}</p>
              <p className={styles.cardText}>
                {nextDate.title}, le {dayMonth.format(day(nextDate.start))}
                {nextDate.tentative ? ' (date estimée)' : ''}.
              </p>
            </>
          ) : (
            <p className={styles.cardText}>Les dates de l’année suivante seront publiées ici.</p>
          )}
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>Prochaines vacances</p>
          {nextHolidays ? (
            <>
              <p className={styles.cardValue}>{inDays(daysBetween(today, nextHolidays.start))}</p>
              <p className={styles.cardText}>
                {nextHolidays.title} : {dayMonth.format(day(nextHolidays.start))} – {dayMonth.format(day(lastDay(nextHolidays)))},{' '}
                {daysBetween(nextHolidays.start, lastDay(nextHolidays)) + 1} jours.
              </p>
            </>
          ) : (
            <p className={styles.cardText}>Pas d’autres vacances cette année.</p>
          )}
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>L’année scolaire</p>
          <p className={styles.cardValue}>{beforeYear ? '0' : afterYear ? '100' : progress} %</p>
          <div
            className={styles.progress}
            role="progressbar"
            aria-label="Avancement de l’année scolaire"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={beforeYear ? 0 : afterYear ? 100 : progress}
          >
            <span style={{ width: `${beforeYear ? 0 : afterYear ? 100 : progress}%` }} />
          </div>
          <p className={styles.cardText}>
            Du {dayMonth.format(day(firstDay))} au {dayMonth.format(day(finalDay))}.
          </p>
        </article>
      </section>

      {/* ---- One month, chosen by month and year ---- */}
      <section aria-labelledby="mois-title" className={styles.panel}>
        <div className={styles.monthBar}>
          <h2 id="mois-title" className={styles.panelTitle}>
            {capitalise(monthYear.format(day(shownFirst)))}
          </h2>
          <div className={styles.monthControls}>
            <label className={styles.picker}>
              <span className="sr-only">Mois</span>
              <select value={shown} onChange={(event) => show(event.target.value)}>
                {monthsOfYear.map((month) => (
                  <option key={month} value={month}>
                    {capitalise(monthName.format(day(`${month}-01`)))}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.picker}>
              <span className="sr-only">Année</span>
              <select
                value={shown.slice(0, 4)}
                onChange={(event) => show(`${event.target.value}${shown.slice(4)}`)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.stepper}>
              <button type="button" aria-label="Mois précédent" disabled={at <= 0} onClick={() => show(shiftMonth(shown, -1))}>
                <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} />
              </button>
              <button type="button" aria-label="Mois suivant" disabled={at >= months.length - 1} onClick={() => show(shiftMonth(shown, 1))}>
                <ChevronRight aria-hidden="true" size={20} strokeWidth={2} />
              </button>
            </div>
            <button type="button" className={styles.todayButton} onClick={() => show(today.slice(0, 7))}>
              Aujourd’hui
            </button>
          </div>
        </div>

        <div className={styles.monthLayout}>
          <table className={styles.monthGrid}>
            <caption className="sr-only">{capitalise(monthYear.format(day(shownFirst)))} : choisissez un jour pour voir ses dates.</caption>
            <thead>
              <tr>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((name) => (
                  <th key={name} scope="col">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, row) => (
                <tr key={row}>
                  {week.map((date, column) => {
                    if (!date) return <td key={column} />
                    const here = onDay(date)
                    const holiday = here.some((entry) => entry.category === 'holidays')
                    const marks = here.filter((entry) => entry.category !== 'holidays')
                    return (
                      <td key={date}>
                        <button
                          type="button"
                          className={styles.cell}
                          aria-pressed={date === focusDay}
                          aria-label={`${capitalise(weekdayDayMonth.format(day(date)))}${here.length ? ' : ' + here.map((entry) => entry.title).join(', ') : ''}`}
                          data-holiday={holiday ? '' : undefined}
                          data-weekend={column >= 5 ? '' : undefined}
                          data-past={date < today ? '' : undefined}
                          data-today={date === today ? '' : undefined}
                          onClick={() => setPicked(date)}
                        >
                          <span className={styles.cellDay}>{Number(date.slice(8))}</span>
                          {here.length ? (
                            <span className={styles.cellEvents} aria-hidden="true">
                              {(holiday && (date === here.find((entry) => entry.category === 'holidays')!.start || date === shownFirst) ? here : marks).map((entry) => (
                                <span key={entry.id} className={styles.cellEvent} data-category={entry.category}>
                                  {entry.title}
                                </span>
                              ))}
                            </span>
                          ) : null}
                          {marks.length ? <span className={styles.cellDot} aria-hidden="true" /> : null}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <aside className={styles.dayPanel} aria-live="polite">
            <p className={styles.cardLabel}>{focusDay === today ? 'Aujourd’hui' : 'Le jour choisi'}</p>
            <p className={styles.dayPanelDate}>{capitalise(weekdayDayMonth.format(day(focusDay)))}</p>
            {focusEntries.length ? (
              <ul role="list" className={styles.dayPanelList}>
                {focusEntries.map((entry) => (
                  <li key={entry.id} data-category={entry.category}>
                    <span aria-hidden="true" className={styles.dot} />
                    <div>
                      <p className={styles.dayPanelTitle}>{entry.title}</p>
                      <p className={styles.itemMeta}>
                        {entry.end
                          ? `${span(entry.start, entry.end)}, ${daysBetween(entry.start, entry.end) + 1} jours`
                          : categoryLabels[entry.category]}
                        {entry.tentative ? ' · date estimée' : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.cardText}>{[0, 6].includes(day(focusDay).getUTCDay()) ? 'Week-end.' : 'Journée de classe.'}</p>
            )}
            <p className={styles.dayPanelMonth}>
              {inShown.length
                ? `${inShown.length} ${inShown.length > 1 ? 'dates' : 'date'} ce mois-ci.`
                : 'Aucune date particulière ce mois-ci.'}
            </p>
          </aside>
        </div>
      </section>

      {/* ---- The agenda ---- */}
      <section aria-labelledby="agenda-title" className={styles.agendaSection}>
        <div className={styles.agendaHead}>
          <h2 id="agenda-title" className={styles.panelTitle}>
            Toutes les dates
          </h2>
          <div className={styles.filters}>
            <Segmented
              label="Type de date"
              value={category}
              onChange={setCategory}
              options={[{ value: 'all', label: 'Tout' }, ...categories.map((value) => ({ value, label: categoryLabels[value] }))]}
            />
            {hasCampusDates ? (
              <Segmented
                label="Campus"
                value={campus}
                onChange={setCampus}
                options={(['network', 'casablanca', 'rabat'] as CalendarCampus[]).map((value) => ({ value, label: campusLabels[value] }))}
              />
            ) : null}
            <Segmented
              label="Période"
              value={upcomingOnly ? 'upcoming' : 'year'}
              onChange={(value) => setUpcomingOnly(value === 'upcoming')}
              options={[
                { value: 'upcoming', label: 'À venir' },
                { value: 'year', label: 'Toute l’année' },
              ]}
            />
          </div>
        </div>

        <p className={styles.count} role="status" aria-live="polite">
          {listed.length} {listed.length > 1 ? 'dates' : 'date'}
        </p>

        {listedMonths.length === 0 ? (
          <p className={styles.empty}>Aucune date ne correspond. Essayez « Toute l’année » ou « Tout ».</p>
        ) : (
          listedMonths.map((month) => (
            <section key={month} id={`mois-${month}`} tabIndex={-1} aria-labelledby={`titre-${month}`} className={styles.agendaMonth}>
              <h3 id={`titre-${month}`} className={styles.agendaMonthTitle}>
                {capitalise(monthYear.format(day(`${month}-01`)))}
              </h3>
              <ol className={styles.agenda}>
                {listed
                  .filter((entry) => entry.start.startsWith(month))
                  .map((entry) => {
                    const end = lastDay(entry)
                    const past = end < today
                    const ongoing = covers(entry, today)
                    const back = entry.category === 'holidays' ? resume(end) : undefined
                    return (
                      <li key={entry.id} className={styles.item} data-category={entry.category} data-past={past ? '' : undefined}>
                        <time dateTime={entry.start} className={styles.itemDate}>
                          <span className={styles.itemDay}>{Number(entry.start.slice(8))}</span>
                          <span className={styles.itemMonth}>{monthShort.format(day(entry.start)).replace('.', '')}</span>
                        </time>
                        <div className={styles.itemBody}>
                          <h4 className={styles.itemTitle}>
                            <span aria-hidden="true" className={styles.dot} />
                            {entry.title}
                          </h4>
                          <p className={styles.itemMeta}>
                            {entry.end
                              ? `${capitalise(weekdayDayMonth.format(day(entry.start)))} – ${weekdayDayMonth.format(day(entry.end))} · ${daysBetween(entry.start, entry.end) + 1} jours`
                              : capitalise(weekdayDayMonth.format(day(entry.start)))}
                            {entry.campus !== 'network' ? ` · ${campusLabels[entry.campus]}` : ''}
                          </p>
                          {entry.tentative || entry.note || back ? (
                            <p className={styles.itemNote}>
                              {[
                                entry.tentative ? 'Date estimée, à confirmer par l’école.' : '',
                                entry.note ?? '',
                                back ? `Reprise le ${weekdayDayMonth.format(day(back.start))}.` : '',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                            </p>
                          ) : null}
                        </div>
                        <p className={styles.itemStatus} data-ongoing={ongoing ? '' : undefined}>
                          {past ? 'Passée' : ongoing ? 'En cours' : inDays(daysBetween(today, entry.start))}
                        </p>
                      </li>
                    )
                  })}
              </ol>
            </section>
          ))
        )}
      </section>
    </div>
  )
}
