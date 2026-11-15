"use client"

import * as React from "react"
import { useAppData } from "@/components/providers/app-data-provider"
import { EventCard } from "@/components/events/event-card"
import { EventsHeader } from "@/components/events/events-header"
import { EventsPagination } from "@/components/events/events-pagination"
import { EventsToolbar } from "@/components/events/events-toolbar"
import { EmptyState } from "@/components/shared/empty-state"

const PAGE_SIZE = 6

// Cached on the client so the snapshot always returns the same value.
let clientNow: number | null = null

export function EventBrowser() {
  const { events, categories } = useAppData()
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("All")
  const [page, setPage] = React.useState(1)

  // Put "All" first even if the backend list does not include it.
  const categoryFilters = categories.includes("All")
    ? categories
    : ["All", ...categories]

  // The list is small, so we simply re-filter on every render.
  const search = query.trim().toLowerCase()

  // Reading the clock during render would break prerendering, so the
  // current time is read lazily on the client via useSyncExternalStore.
  // The server snapshot (null) means "no time yet", which keeps the
  // prerendered HTML stable; after hydration the list filters to upcoming.
  const now = React.useSyncExternalStore(
    () => () => {},
    () => {
      if (clientNow === null) {
        clientNow = Date.now()
      }
      return clientNow
    },
    () => null
  )

  // Only upcoming events are shown on this public page.
  const upcomingEvents = events.filter(
    (event) =>
      now === null || new Date(event.startDate).getTime() > now
  )

  const filtered = upcomingEvents.filter((event) => {
    const matchesSearch =
      search === "" ||
      event.title.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search)

    const matchesCategory =
      category === "All" || event.category === category

    return matchesSearch && matchesCategory
  })

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Going back to page 1 whenever the filters change keeps us in range.
  function handleQueryChange(value: string) {
    setQuery(value)
    setPage(1)
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
    setPage(1)
  }

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <EventsHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <EventsToolbar
          query={query}
          onQueryChange={handleQueryChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          categories={categoryFilters}
        />

        {pageItems.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState className="mt-8" message="Try a different search or category." />
        )}

        {pageCount > 1 && (
          <div className="mt-10">
            <EventsPagination
              page={page}
              pageCount={pageCount}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </main>
  )
}
