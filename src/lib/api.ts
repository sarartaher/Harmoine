export function apiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local.",
    );
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}
