import { headers } from "next/headers"
import { auth } from "@/lib/auth"

// Helper: get auth headers with Bearer token from session.
// Shared by account-api.ts and account server actions.
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const token = session?.session?.token
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}