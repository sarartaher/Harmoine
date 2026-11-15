// Server actions used by the manage/create-events pages.
//
// They call the backend, then ask Next.js to refresh the relevant path so the
// list is fetched again and shows the new state.
//
// There is no auth yet, so these requests carry no session token.

"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"

export type EventMutationState =
  | { ok: true }
  | { ok: false; error: string }

export async function setManagedEventStatus(formData: FormData) {
  const slug = String(formData.get("slug") ?? "")
  const status = String(formData.get("status") ?? "")

  // Only the two statuses the UI can switch between are accepted.
  if (!slug || (status !== "published" && status !== "draft")) {
    return
  }

  const response = await fetch(apiUrl(endpoints.managedEvent(slug)), {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  })

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

  const response = await fetch(apiUrl(endpoints.managedEvent(slug)), {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Failed to delete "${slug}" (${response.status})`)
  }

  revalidatePath("/account/events")
}

// Used by the create-event form. Validates the required fields, asks the
// backend to create the event, then redirects to /events (the upcoming list).
export async function createManagedEvent(
  state: EventMutationState | null,
  formData: FormData
): Promise<EventMutationState> {
  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const eventType = String(formData.get("category") ?? "").trim()
  const location = String(formData.get("location") ?? "").trim()
  const eventDate = String(formData.get("startDate") ?? "").trim()
  const thumbnailFile = formData.get("thumbnail") as File | null

  if (!title || !description || !eventType || !location || !eventDate) {
    return {
      ok: false,
      error:
        "Please fill in the title, description, event type, location and date.",
    }
  }

  const start = new Date(eventDate)
  if (Number.isNaN(start.getTime()) || start.getTime() <= Date.now()) {
    return { ok: false, error: "Event date must be in the future." }
  }

  // Build FormData for multipart upload (supports file)
  const uploadData = new FormData()
  uploadData.append("title", title)
  uploadData.append("description", description)
  uploadData.append("eventType", eventType)
  uploadData.append("location", location)
  uploadData.append("eventDate", eventDate)
  if (thumbnailFile && thumbnailFile.size > 0) {
    uploadData.append("thumbnail", thumbnailFile)
  }

  let response: Response
  try {
    response = await fetch(apiUrl(endpoints.createEvent), {
      method: "POST",
      body: uploadData,
    })
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." }
  }

  if (!response.ok) {
    return { ok: false, error: `Failed to create event (${response.status})` }
  }

  revalidatePath("/events")
  redirect("/events")
}
