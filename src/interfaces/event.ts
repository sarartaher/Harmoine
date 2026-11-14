// Shapes shared by the event pages and the global data context.
// Adjust these to match what your backend returns.

export interface EventSummary {
  slug: string
  title: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  /** IANA time zone for display, e.g. "Europe/London". */
  timeZone?: string
  location: string
  category: string
  image?: string
}

// Helper shapes used inside EventDetail.
interface EventAgendaItem {
  time: string
  title: string
  description?: string
}

interface EventOrganizer {
  name: string
  bio?: string
  avatar?: string
}

export interface EventDetail extends EventSummary {
  description: string
  /** ISO 8601 date-time, optional if the event has no end time. */
  endDate?: string
  address?: string
  /** Free text, e.g. "Free" or "$25". */
  price?: string
  capacity?: number
  spotsLeft?: number
  highlights?: string[]
  agenda?: EventAgendaItem[]
  organizer?: EventOrganizer
  registrationUrl?: string
}

/** Route props for `/events/[slug]`. */
export type EventPageProps = {
  params: Promise<{ slug: string }>
}

/** Fields used by the create-event form (all required except image). */
export interface CreateEventInput {
  title: string
  description: string
  category: string
  image?: string
  location: string
  /** ISO 8601 date-time in the future, e.g. "2026-12-01T18:00:00+01:00". */
  startDate: string
  status: "draft" | "published"
}
