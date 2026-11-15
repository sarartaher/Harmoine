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
  _id: string
  title: string
  thumbnail?: string
  /** ISO 8601 date-time */
  eventDate: string
  timeZone?: string
  location: string
  eventType: string
  status: ManagedEventStatus
  attendees?: number
  capacity?: number
}

export interface JoinedEvent {
  _id: string
  title: string
  thumbnail?: string
  /** ISO 8601 date-time */
  eventDate: string
  timeZone?: string
  location: string
  eventType: string
  /** ISO 8601 date-time for when the user joined. */
  joinedAt?: string
}
