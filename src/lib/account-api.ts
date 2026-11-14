// The account pages read the signed-in user's events from the backend.
//
// Expected requests:
//   GET {API_BASE_URL}/account/events   -> ManagedEvent[]
//   GET {API_BASE_URL}/account/joined   -> JoinedEvent[]
//
// Mutations used by the manage page:
//   PATCH  {API_BASE_URL}/account/events/{slug}  body: { "status": "published" | "draft" }
//   DELETE {API_BASE_URL}/account/events/{slug}
//
// There is no auth yet, so these requests carry no session token. When auth
// is added, forward the session (for example a cookie) with each request.

import { connection } from "next/server"
import { apiUrl } from "@/lib/api"

export type ManagedEventStatus = "published" | "draft" | "past" | "cancelled"

export type ManagedEvent = {
  slug: string
  title: string
  image: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  timeZone?: string
  location: string
  category: string
  status: ManagedEventStatus
  attendees?: number
  capacity?: number
}

export type JoinedEvent = {
  slug: string
  title: string
  image: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  timeZone?: string
  location: string
  category: string
  /** ISO 8601 date-time for when the user joined. */
  joinedAt?: string
}

async function getList<T>(path: string): Promise<T> {
  // These lists belong to the signed-in user, so they must be fetched per
  // request. `connection()` stops them from being prerendered at build time.
  await connection()

  const response = await fetch(apiUrl(path), { cache: "no-store" })

  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status})`)
  }

  return (await response.json()) as T
}

export function getManagedEvents() {
  return getList<ManagedEvent[]>("/account/events")
}

export function getJoinedEvents() {
  return getList<JoinedEvent[]>("/account/joined")
}
