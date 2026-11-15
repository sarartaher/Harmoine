"use client"

import * as React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { useFormStatus } from "react-dom"
import {
  deleteManagedEvent,
  setManagedEventStatus,
} from "@/app/account/events/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type {
  ManagedEvent,
  ManagedEventStatus,
  ManagedEventsFilter,
} from "@/interfaces"
import { EventImage } from "@/components/shared/event-image"
import { EmptyState } from "@/components/shared/empty-state"
import { formatEventDateShort } from "@/lib/format-event-date"
import { cn } from "@/lib/utils"

const statusFilters: ManagedEventsFilter[] = [
  "all",
  "published",
  "draft",
  "past",
  "cancelled",
]

function statusLabel(filter: ManagedEventsFilter) {
  if (filter === "all") return "All"
  return filter.charAt(0).toUpperCase() + filter.slice(1)
}

function StatusBadge({ status }: { status: ManagedEventStatus }) {
  const styles: Record<ManagedEventStatus, string> = {
    published:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    draft:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    past: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    cancelled:
      "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        styles[status]
      )}
    >
      {status}
    </span>
  )
}

function SubmitButton({
  label,
  pendingLabel,
  destructive = false,
}: {
  label: string
  pendingLabel: string
  destructive?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="sm"
      variant={destructive ? "destructive" : "outline"}
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </Button>
  )
}

function EventActions({ event }: { event: ManagedEvent }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/events/${event._id}`}
        className="inline-flex h-7 items-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-foreground outline-none transition hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
      >
        View
      </Link>

      {event.status === "published" ? (
        <form action={setManagedEventStatus}>
          <input type="hidden" name="slug" value={event._id} />
          <input type="hidden" name="status" value="draft" />
          <SubmitButton label="Unpublish" pendingLabel="Saving..." />
        </form>
      ) : null}

      {event.status === "draft" ? (
        <form action={setManagedEventStatus}>
          <input type="hidden" name="slug" value={event._id} />
          <input type="hidden" name="status" value="published" />
          <SubmitButton label="Publish" pendingLabel="Saving..." />
        </form>
      ) : null}

      <form
        action={deleteManagedEvent}
        onSubmit={(submitEvent) => {
          const confirmed = window.confirm(
            "Delete this event? This cannot be undone."
          )
          if (!confirmed) {
            submitEvent.preventDefault()
          }
        }}
      >
        <input type="hidden" name="slug" value={event._id} />
        <SubmitButton
          label="Delete"
          pendingLabel="Deleting..."
          destructive
        />
      </form>
    </div>
  )
}

function attendeesText(event: ManagedEvent) {
  if (event.attendees === undefined) return "—"
  if (event.capacity === undefined) return String(event.attendees)
  return `${event.attendees} / ${event.capacity}`
}

export function ManagedEvents({ events }: { events: ManagedEvent[] }) {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<ManagedEventsFilter>("all")

  const search = query.trim().toLowerCase()

  const filtered = events.filter((event) => {
    const matchesSearch =
      search === "" ||
      event.title.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search)

    const matchesStatus = status === "all" || event.status === status

    return matchesSearch && matchesStatus
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
            placeholder="Search your events..."
            aria-label="Search your events"
            className="h-10 w-full rounded-lg border-violet-100 bg-violet-50/60 pr-3 pl-9 sm:w-72 dark:border-violet-900/40 dark:bg-violet-950/30"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by status"
        >
          {statusFilters.map((filter) => {
            const active = status === filter
            return (
              <Button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setStatus(filter)}
                variant="outline"
                className={cn(
                  "h-9 rounded-full px-4",
                  active
                    ? "border-transparent bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    : "border-violet-100 bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700 dark:border-violet-900/40 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
                )}
              >
                {statusLabel(filter)}
              </Button>
            )
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm dark:border-violet-900/40 dark:bg-slate-900">
          {/* Desktop table */}
          <table className="hidden w-full text-left text-sm md:table">
            <thead className="border-b border-violet-100 bg-violet-50/60 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:border-violet-900/40 dark:bg-violet-950/20 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3">Event</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Attendees</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-100 dark:divide-violet-900/40">
              {filtered.map((event) => (
                <tr
                  key={event._id}
                  className="transition hover:bg-violet-50/40 dark:hover:bg-violet-950/20"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <EventImage
                        src={event.thumbnail}
                        alt=""
                        iconClassName="size-5"
                        className="size-12 shrink-0 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {event.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {event.eventType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {formatEventDateShort(event.eventDate, event.timeZone)}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {event.location}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {attendeesText(event)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end">
                      <EventActions event={event} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="divide-y divide-violet-100 md:hidden dark:divide-violet-900/40">
            {filtered.map((event) => (
              <div key={event._id} className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                  <EventImage
                    src={event.thumbnail}
                    alt=""
                    iconClassName="size-7"
                    className="size-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {event.title}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                      {formatEventDateShort(event.eventDate, event.timeZone)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {event.location}
                    </p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{event.eventType}</span>
                  <span aria-hidden>·</span>
                  <span>{attendeesText(event)} attendees</span>
                </div>

                <EventActions event={event} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState message="Try a different search or status." />
      )}
    </div>
  )
}
