/*
 * French dates and times for the screens, always in the schools' time zone (Morocco, UTC+1
 * outside Ramadan), whatever the server's own zone. Times are written the French school way:
 * "8h25", "13h00".
 */

const ZONE = 'Africa/Casablanca'

/** U+202F narrow no-break space, before ? ! : ; in French. */
export const NNBSP = ' '

/** "8h25" from minutes after midnight. */
export function clock(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h${String(m).padStart(2, '0')}`
}

/** "8h25 – 10h05". */
export function span(from: number, to: number) {
  return `${clock(from)} – ${clock(to)}`
}

/** "Lundi 9 novembre". */
export function longDate(date: Date) {
  const text = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: ZONE,
  }).format(date)
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** { weekday: "mar.", day: "10" }, for a calendar-style date. */
export function dateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', timeZone: ZONE }).formatToParts(date)
  return {
    weekday: parts.find((p) => p.type === 'weekday')?.value ?? '',
    day: parts.find((p) => p.type === 'day')?.value ?? '',
  }
}

/** Minutes after midnight, in the schools' time zone. */
export function minutesOfDay(date: Date) {
  const [h, m] = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: ZONE,
  })
    .format(date)
    .split(':')
    .map(Number)
  return h * 60 + m
}

/** Calendar days from `from` to `to` (dates only, in the schools' time zone). */
export function daysBetween(from: Date, to: Date) {
  const day = (d: Date) =>
    Date.parse(new Intl.DateTimeFormat('en-CA', { timeZone: ZONE }).format(d) + 'T00:00:00Z')
  return Math.round((day(to) - day(from)) / 86_400_000)
}

/** "Aujourd'hui", "Demain", "Dans 4 jours". */
export function inDays(days: number) {
  if (days === 0) return 'Aujourd’hui'
  if (days === 1) return 'Demain'
  return `Dans ${days} jours`
}

/** As in Mail: "7h12" today, "Hier", then "6 nov.". */
export function ago(date: Date, now: Date) {
  const days = daysBetween(date, now)
  if (days === 0) return clock(minutesOfDay(date))
  if (days === 1) return 'Hier'
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: ZONE }).format(date)
}

/** Initials for an avatar: "Salma Benali" → "SB". */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/** "1 sept. 2026" */
export function shortFullDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: ZONE }).format(date)
}

/** "vendredi 13 novembre, 16h00" (or without the time). */
export function dayAndTime(date: Date, withTime = true) {
  const day = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: ZONE }).format(date)
  return withTime ? `${day}, ${clock(minutesOfDay(date))}` : day
}
