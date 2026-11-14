// Shapes used by the account pages and the navbar profile.

export interface AccountProfile {
  name?: string
  email?: string
  avatar?: string
}

export type ManagedEventStatus = "published" | "draft" | "past" | "cancelled"

/** Status pills on `/account/events`. */
export type ManagedEventsFilter = "all" | ManagedEventStatus

/** Tabs on `/account/joined`. */
export type JoinedEventsTab = "all" | "upcoming" | "past"

export interface ManagedEvent {
  slug: string
  title: string
  image?: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  timeZone?: string
  location: string
  category: string
  status: ManagedEventStatus
  attendees?: number
  capacity?: number
}

export interface JoinedEvent {
  slug: string
  title: string
  image?: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  timeZone?: string
  location: string
  category: string
  /** ISO 8601 date-time for when the user joined. */
  joinedAt?: string
}
