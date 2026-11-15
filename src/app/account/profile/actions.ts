"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getAuthHeaders } from "@/lib/account-auth"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"

export async function updateProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim()
  if (!name) {
    return { ok: false, error: "Name is required." }
  }

  let response: Response
  try {
    const authHeaders = await getAuthHeaders()
    response = await fetch(apiUrl(endpoints.profile), {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({ name }),
    })
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." }
  }

  if (!response.ok) {
    return { ok: false, error: `Failed to update profile (${response.status})` }
  }

  revalidatePath("/account/profile")
  redirect("/account/profile")
}