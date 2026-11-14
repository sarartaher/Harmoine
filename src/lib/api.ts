// Builds a backend URL. `NEXT_PUBLIC_` is required because the global data
// provider also fetches from the browser, so the backend must allow this
// site's origin (CORS).
export function apiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local (see .env.example)."
    )
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`
}
