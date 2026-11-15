"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, MapPin, Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { JoinedEvent, JoinedEventsTab } from "@/interfaces"
import { EventImage } from "@/components/shared/event-image"
import { EmptyState } from "@/components/shared/empty-state"
import { formatEventDateShort } from "@/lib/format-event-date"
import { cn } from "@/lib/utils"

const tabs: JoinedEventsTab[] = ["all", "upcoming", "past"]

function tabLabel(tab: JoinedEventsTab) {
  if (tab === "all") return "All"
  return tab.charAt(0).toUpperCase() + tab.slice(1)
}

function isPast(event: JoinedEvent, now: number) {
  const start = new Date(event.startDate).getTime()
  return !Number.isNaN(start) && start < now
}

export function JoinedEvents({ events }: { events: JoinedEvent[] }) {
  const [query, setQuery] = React.useState("")
  const [tab, setTab] = React.useState<JoinedEventsTab>("all")

  // Capture "now" once so the Upcoming/Past split stays stable while the
  // user is on the page.
  const [now] = React.useState(() => Date.now())

  const search = query.trim().toLowerCase()

  const filtered = events.filter((event) => {
    const matchesSearch =
      search === "" ||
      event.title.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search)

    const matchesTab =
      tab === "all" ||
      (tab === "upcoming" && !isPast(event, now)) ||
      (tab === "past" && isPast(event, now))

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm dark:border-violet-900/40 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-violet-500" />
          <Input
            type="search"
            value={query}
            onChange={(changeEvent) => setQuery(changeEvent.target.value)}
            placeholder="Search joined events..."
            aria-label="Search joined events"
            className="h-10 w-full rounded-lg border-violet-100 bg-violet-50/60 pr-3 pl-9 sm:w-72 dark:border-violet-900/40 dark:bg-violet-950/30"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events">
          {tabs.map((value) => {
            const active = tab === value
            return (
              <Button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setTab(value)}
                variant="outline"
                className={cn(
                  "h-9 rounded-full px-4",
                  active
                    ? "border-transparent bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    : "border-violet-100 bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700 dark:border-violet-900/40 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
                )}
              >
                {tabLabel(value)}
              </Button>
            )
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-violet-900/40 dark:bg-slate-900"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <EventImage
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-violet-700 shadow-md dark:bg-slate-900 dark:text-violet-300">
                  {formatEventDateShort(event.startDate, event.timeZone)}
                </span>
                {isPast(event, now) ? (
                  <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    Past
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-violet-600 uppercase dark:text-violet-300">
                  <Tag className="size-3.5" />
                  {event.category}
                </span>

                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {event.title}
                </h2>

                <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="size-4 shrink-0 text-violet-600 dark:text-violet-400" />
                  {event.location}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-violet-100 pt-3 dark:border-violet-900/40">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {event.joinedAt
                      ? `Joined ${formatEventDateShort(event.joinedAt, event.timeZone)}`
                      : "Joined"}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-300">
                    View event
                    <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message="Join an event and it will show up here." />
      )}
    </div>
  )
}
