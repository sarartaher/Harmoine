// The details page reads from the events backend.
//
// Expected request:
//   GET {NEXT_PUBLIC_API_BASE_URL}/events   (path in src/lib/endpoints.ts)
//
// The backend returns the full list; we find the one matching the id.
// (The backend has no per-event detail endpoint.)
//
// Expected response: one event object shaped like `EventDetail` in
// `src/interfaces/event.ts`.
// Set NEXT_PUBLIC_API_BASE_URL in .env.local (see .env.example).

import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"
import type { EventDetail } from "@/interfaces"

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const url = apiUrl(endpoints.events)

  let response: Response
  try {
    response = await fetch(url, { cache: "no-store" })
  } catch {
    // Backend is unreachable — treat as "not found" instead of crashing.
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status})`)
  }

  const events = (await response.json()) as EventDetail[]
  return events.find((event) => event._id === slug) ?? null
}
