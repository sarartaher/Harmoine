// The account pages read the signed-in user's data from the backend.
// Route paths live in `src/lib/endpoints.ts`.
//
// Expected requests (Bearer token forwarded):
//   GET    {NEXT_PUBLIC_API_BASE_URL}/account/events   -> ManagedEvent[]
//   GET    {NEXT_PUBLIC_API_BASE_URL}/account/joined   -> JoinedEvent[]
//   GET    {NEXT_PUBLIC_API_BASE_URL}/account/profile  -> AccountProfile
//   PATCH  {NEXT_PUBLIC_API_BASE_URL}/account/profile  body: {"name": "..."}
//
// Mutations used by the manage page:
//   PATCH  {NEXT_PUBLIC_API_BASE_URL}/account/events/{slug}  body: { "status": "published" | "draft" }
//   DELETE {NEXT_PUBLIC_API_BASE_URL}/account/events/{slug}

import { connection } from "next/server"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"
import { getAuthHeaders } from "@/lib/account-auth"
import type { JoinedEvent, ManagedEvent, AccountProfile } from "@/interfaces"

async function getList<T>(path: string): Promise<T> {
  // These lists belong to the signed-in user, so they must be fetched per
  // request. `connection()` stops them from being prerendered at build time.
  await connection()

  let response: Response
  try {
    const authHeaders = await getAuthHeaders()
    response = await fetch(apiUrl(path), {
      cache: "no-store",
      headers: authHeaders,
    })
  } catch {
    // Backend is unreachable - return empty list instead of crashing.
    return [] as unknown as T
  }

  // Treat 404/400/401 as "no data".
  if (
    response.status === 404 ||
    response.status === 400 ||
    response.status === 401
  ) {
    return [] as unknown as T
  }

  if (!response.ok) {
    throw new Error(`Failed to load ${path} (${response.status})`)
  }

  return (await response.json()) as T
}

export function getManagedEvents(category?: string) {
  const path = category && category !== "all"
    ? `${endpoints.managedEvents}?category=${encodeURIComponent(category)}`
    : endpoints.managedEvents
  return getList<ManagedEvent[]>(path)
}

export function getJoinedEvents() {
  return getList<JoinedEvent[]>(endpoints.joinedEvents)
}

export async function getProfile(): Promise<AccountProfile | null> {
  await connection()

  try {
    const authHeaders = await getAuthHeaders()
    const response = await fetch(apiUrl(endpoints.profile), {
      cache: "no-store",
      headers: authHeaders,
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as AccountProfile
  } catch {
    return null
  }
}
