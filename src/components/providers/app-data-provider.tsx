"use client"

// Global data shared by the home page, the events list, and the navbar.
// Everything is fetched from the backend endpoints in `src/lib/endpoints.ts`.

import * as React from "react"
import { apiUrl } from "@/lib/api"
import { endpoints } from "@/lib/endpoints"

export type EventSummary = {
  slug: string
  title: string
  /** ISO 8601 date-time, e.g. "2026-08-26T18:00:00+01:00" */
  startDate: string
  /** IANA time zone for display, e.g. "Europe/London". */
  timeZone?: string
  location: string
  category: string
  image?: string
}

export type GalleryImage = {
  id: string
  src: string
  alt?: string
}

export type AccountProfile = {
  name?: string
  email?: string
  avatar?: string
}

type AppData = {
  events: EventSummary[]
  categories: string[]
  gallery: GalleryImage[]
  profile: AccountProfile | null
  /** True until the first fetch finishes (or fails). */
  loading: boolean
}

const emptyData: AppData = {
  events: [],
  categories: [],
  gallery: [],
  profile: null,
  loading: true,
}

const AppDataContext = React.createContext<AppData>(emptyData)

async function getJson<T>(path: string, signal: AbortSignal): Promise<T | null> {
  try {
    const response = await fetch(apiUrl(path), { signal })
    if (!response.ok) {
      return null
    }
    return (await response.json()) as T
  } catch {
    // A missing or offline backend simply leaves this section empty.
    return null
  }
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<AppData>(emptyData)

  React.useEffect(() => {
    const controller = new AbortController()

    async function load() {
      const [events, categories, gallery, profile] = await Promise.all([
        getJson<EventSummary[]>(endpoints.events, controller.signal),
        getJson<string[]>(endpoints.categories, controller.signal),
        getJson<GalleryImage[]>(endpoints.gallery, controller.signal),
        getJson<AccountProfile>(endpoints.profile, controller.signal),
      ])

      if (controller.signal.aborted) {
        return
      }

      setData({
        events: events ?? [],
        categories: categories ?? [],
        gallery: gallery ?? [],
        profile: profile ?? null,
        loading: false,
      })
    }

    load()

    return () => controller.abort()
  }, [])

  return (
    <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>
  )
}

export function useAppData() {
  return React.useContext(AppDataContext)
}
