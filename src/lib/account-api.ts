// The account pages read the signed-in user's events from the backend.
// Route paths live in `src/lib/endpoints.ts`.
//
// Expected requests:
//   GET {NEXT_PUBLIC_API_BASE_URL}/account/events   -> ManagedEvent[]
//   GET {NEXT_PUBLIC_API_BASE_URL}/account/joined   -> JoinedEvent[]
//
// Mutations used by the manage page:
//   PATCH  {NEXT_PUBLIC_API_BASE_URL}/account/events/{slug}  body: { "status": "published" | "draft" }
//   DELETE {NEXT_PUBLIC_API_BASE_URL}/account/events/{slug}
//
// There is no auth yet, so these requests carry no session token. When auth
// is added, forward the session (for example a cookie) with each request.

import { connection } from "next/server"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"
import type { JoinedEvent, ManagedEvent } from "@/interfaces"

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
  return getList<ManagedEvent[]>(endpoints.managedEvents)
}

export function getJoinedEvents() {
  return getList<JoinedEvent[]>(endpoints.joinedEvents)
}
