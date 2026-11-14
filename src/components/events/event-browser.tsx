"use client"

import * as React from "react"
import { SearchX } from "lucide-react"
import { useAppData } from "@/components/providers/app-data-provider"
import { EventCard } from "@/components/events/event-card"
import { EventsHeader } from "@/components/events/events-header"
import { EventsPagination } from "@/components/events/events-pagination"
import { EventsToolbar } from "@/components/events/events-toolbar"

const PAGE_SIZE = 6
const skeletonCards = [1, 2, 3, 4, 5, 6]

export function EventBrowser() {
  const { events, categories, loading } = useAppData()
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("All")
  const [page, setPage] = React.useState(1)

  // Put "All" first even if the backend list does not include it.
  const categoryFilters = categories.includes("All")
    ? categories
    : ["All", ...categories]

  // The list is small, so we simply re-filter on every render.
  const search = query.trim().toLowerCase()

  // The clock is read in an effect so the page can be prerendered without
  // an unstable current-time value during render.
  const [now, setNow] = React.useState<number | null>(null)
  React.useEffect(() => {
    setNow(Date.now())
  }, [])

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

        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skeletonCards.map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-white dark:bg-slate-900"
              />
            ))}
          </div>
        ) : pageItems.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-violet-200 bg-white py-16 text-center dark:border-violet-900/50 dark:bg-slate-900">
            <SearchX className="size-10 text-violet-400" />
            <p className="font-medium text-slate-900 dark:text-white">
              No events found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try a different search or category.
            </p>
          </div>
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
