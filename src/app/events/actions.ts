// Server action used by the event details page to join an event.
//
// It calls the backend, then asks Next.js to refresh the joined list so the
// new join shows up on /account/joined.

"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"

export type JoinEventState = { ok: true } | { ok: false; error: string }

export async function joinEvent(slug: string): Promise<JoinEventState> {
  if (!slug) {
    return { ok: false, error: "Missing event." }
  }

  // Verify the user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return { ok: false, error: "You must be logged in to join an event." }
  }

  const userEmail = session.user.email
  if (!userEmail) {
    return { ok: false, error: "Could not determine your email." }
  }

  let response: Response
  try {
    response = await fetch(apiUrl(endpoints.eventJoin(slug)), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    })
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." }
  }

  if (!response.ok) {
    return { ok: false, error: `Failed to join event (${response.status})` }
  }

  revalidatePath("/account/joined")
  return { ok: true }
}
