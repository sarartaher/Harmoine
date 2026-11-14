// The details page reads from the events backend.
//
// Expected request:
//   GET {NEXT_PUBLIC_API_BASE_URL}/events/{slug}   (path in src/lib/endpoints.ts)
//
// Expected response: one event object shaped like `EventDetail` in
// `src/interfaces/event.ts`.
// Set NEXT_PUBLIC_API_BASE_URL in .env.local (see .env.example).

import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"
import type { EventDetail } from "@/interfaces"

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const url = apiUrl(endpoints.event(slug))

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
