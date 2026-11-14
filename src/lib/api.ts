// Shared helper for the events backend. Keeping the base URL in one place
// means every request fails with the same clear message when it is missing.
export function apiUrl(path: string) {
  const baseUrl = process.env.API_BASE_URL

  if (!baseUrl) {
    throw new Error(
      "API_BASE_URL is not set. Add it to .env.local (see .env.example)."
    )
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`
}
