// Small date helpers for the event details page. They use Intl so the
// output follows the browser/server locale without any extra library.

function parseDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatEventDate(value: string, timeZone?: string) {
  const date = parseDate(value)
  if (!date) return value

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(date)
}

export function formatEventDateShort(value: string, timeZone?: string) {
  const date = parseDate(value)
  if (!date) return value

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(date)
}

function formatEventTime(value: string, timeZone?: string) {
  const date = parseDate(value)
  if (!date) return value

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(date)
}

/** Small "AUG / 26" badge used on event cards. */
export function formatDateBadge(value: string, timeZone?: string) {
  const date = parseDate(value)
  if (!date) {
    return { month: "", day: "" }
  }

  return {
    month: new Intl.DateTimeFormat("en-US", { month: "short", timeZone })
      .format(date)
      .toUpperCase(),
    day: new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone }).format(
      date
    ),
  }
}

export function formatEventTimeRange(
  start: string,
  end?: string,
  timeZone?: string
) {
  const startTime = formatEventTime(start, timeZone)
  if (!end) return startTime

  return `${startTime} – ${formatEventTime(end, timeZone)}`
}
