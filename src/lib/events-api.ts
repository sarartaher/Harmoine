// The event details page reads from the events backend.
//
// Expected request:
//   GET {API_BASE_URL}/events/{slug}
//
// Expected response: one event object shaped like `EventDetail` below.
// Set API_BASE_URL in .env.local (see .env.example). It is server-only, so
// the backend URL is never sent to the browser.

export type EventAgendaItem = {
  time: string
  title: string
  description?: string
}

export type EventOrganizer = {
  name: string
  bio?: string
  avatar?: string
}

export type EventDetail = {
  slug: string
  title: string
  description: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  /** ISO 8601 date-time, optional if the event has no end time. */
  endDate?: string
  /** IANA time zone for display, e.g. "Europe/London". */
  timeZone?: string
  location: string
  address?: string
  category: string
  image: string
  /** Free text, e.g. "Free" or "$25". */
  price?: string
  capacity?: number
  spotsLeft?: number
  highlights?: string[]
  agenda?: EventAgendaItem[]
  organizer?: EventOrganizer
  registrationUrl?: string
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const baseUrl = process.env.API_BASE_URL

  if (!baseUrl) {
    throw new Error(
      "API_BASE_URL is not set. Add it to .env.local (see .env.example)."
    )
  }

  const cleanBaseUrl = baseUrl.replace(/\/$/, "")
  const url = `${cleanBaseUrl}/events/${encodeURIComponent(slug)}`

  // "no-store" keeps the page fresh: the backend is the source of truth.
  const response = await fetch(url, { cache: "no-store" })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to load event "${slug}" (${response.status})`)
  }

  return (await response.json()) as EventDetail
}
