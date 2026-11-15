// Shapes shared by the event pages and the global data context.
// These match the real backend's response shape (MongoDB _id, eventType,
// eventDate, thumbnail). Adjust if your backend returns different fields.

export interface EventSummary {
  /** MongoDB document id, used as the URL slug. */
  _id: string
  title: string
  /** ISO 8601 date-time, e.g. "2026-11-22T10:00:00.000Z" */
  eventDate: string
  location: string
  eventType: string
  thumbnail?: string
  description?: string
  createdByEmail?: string
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

/**
 * Route props for `/events/[slug]`. The param is the event's `_id`.
 */
export type EventPageProps = {
  params: Promise<{ slug: string }>
}

/** Fields used by the create-event form. */
export interface CreateEventInput {
  title: string
  description: string
  eventType: string
  thumbnail?: string
  location: string
  /** ISO 8601 date-time in the future. */
  eventDate: string
}
