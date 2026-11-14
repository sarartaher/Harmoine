// Server actions used by the manage-events page.
//
// They call the backend, then ask Next.js to refresh /account/events so the
// list is fetched again and the new status (or the deletion) is visible.
//
// There is no auth yet, so these requests carry no session token.

"use server"

import { revalidatePath } from "next/cache"
import { apiUrl } from "@/lib/api"

export async function setManagedEventStatus(formData: FormData) {
  const slug = String(formData.get("slug") ?? "")
  const status = String(formData.get("status") ?? "")

  // Only the two statuses the UI can switch between are accepted.
  if (!slug || (status !== "published" && status !== "draft")) {
    return
  }

  const response = await fetch(
    apiUrl(`/account/events/${encodeURIComponent(slug)}`),
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to update "${slug}" (${response.status})`)
  }

  revalidatePath("/account/events")
}

export async function deleteManagedEvent(formData: FormData) {
  const slug = String(formData.get("slug") ?? "")

  if (!slug) {
    return
  }

  const response = await fetch(
    apiUrl(`/account/events/${encodeURIComponent(slug)}`),
    { method: "DELETE" }
  )

  if (!response.ok) {
    throw new Error(`Failed to delete "${slug}" (${response.status})`)
  }

  revalidatePath("/account/events")
}
