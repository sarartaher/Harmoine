"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { useAppData } from "@/components/providers/app-data-provider"
import type { EventSummary } from "@/interfaces"
import { SectionHeading } from "@/components/home/section-heading"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { formatDateBadge } from "@/lib/format-event-date"
import { EventImage } from "@/components/shared/event-image"
import { EmptyState } from "@/components/shared/empty-state"

function EventCard({ event }: { event: EventSummary }) {
  const { month, day } = formatDateBadge(event.startDate, event.timeZone)

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block h-full overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-violet-900/40 dark:bg-slate-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <EventImage
          src={event.image}
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
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
          {event.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="size-4 shrink-0 text-violet-600 dark:text-violet-400" />
          {event.location}
        </p>
      </div>
    </Link>
  )
}

export function UpcomingEvents() {
  const { events } = useAppData()
  const upcoming = events.slice(0, 6)

  return (
    <section className="bg-white py-16 dark:bg-slate-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Upcoming Events" />

        {upcoming.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} className="mt-12">
            <CarouselContent>
              {upcoming.map((event) => (
                <CarouselItem
                  key={event.slug}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 size-9 bg-white shadow-md sm:-left-4 dark:bg-slate-800" />
            <CarouselNext className="-right-2 size-9 bg-white shadow-md sm:-right-4 dark:bg-slate-800" />
          </Carousel>
        ) : (
          <EmptyState
            className="mt-12"
            message="Events from your backend will appear here."
          />
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/events"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base text-white shadow-lg shadow-violet-600/25 outline-none transition-all hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
