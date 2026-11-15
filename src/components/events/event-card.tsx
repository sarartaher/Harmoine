"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Heart, MapPin, Tag } from "lucide-react"
import { EventImage } from "@/components/shared/event-image"
import type { EventSummary } from "@/interfaces"
import { formatDateBadge } from "@/lib/format-event-date"
import { cn } from "@/lib/utils"

export function EventCard({ event }: { event: EventSummary }) {
  const { month, day } = formatDateBadge(event.eventDate)
  const [favorite, setFavorite] = React.useState(false)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-violet-900/40 dark:bg-slate-900">
      <div className="relative aspect-[4/3] overflow-hidden">
        <EventImage
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-lg bg-white px-2.5 py-1 text-center shadow-md dark:bg-slate-900">
          <div className="text-[10px] font-bold tracking-widest text-violet-600 dark:text-violet-400">
            {month}
          </div>
          <div className="text-lg leading-none font-extrabold text-slate-900 dark:text-white">
            {day}
          </div>
        </div>
        <button
          type="button"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
          onClick={() => setFavorite((value) => !value)}
          className="absolute top-3 right-3 rounded-full p-1.5 outline-none transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <Heart
            className={cn(
              "size-5 drop-shadow-sm transition",
              favorite
                ? "fill-rose-500 text-rose-500"
                : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          {event.title}
        </h2>
        <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="size-4 shrink-0 text-violet-600 dark:text-violet-400" />
          {event.location}
        </p>

        <div className="mt-auto flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Tag className="size-4 text-violet-600 dark:text-violet-400" />
            {event.eventType}
          </span>
          <Link
            href={`/events/${event._id}`}
            aria-label={`View ${event.title}`}
            className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md transition hover:from-violet-400 hover:to-indigo-500"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
