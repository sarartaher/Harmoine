import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Sparkles,
  Tag,
  Users,
} from "lucide-react"
import type { EventDetail } from "@/lib/events-api"
import {
  formatEventDate,
  formatEventTimeRange,
} from "@/lib/format-event-date"

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">
          {children}
        </dd>
      </div>
    </div>
  )
}

function EventDetails({ event }: { event: EventDetail }) {
  const date = formatEventDate(event.startDate, event.timeZone)
  const time = formatEventTimeRange(
    event.startDate,
    event.endDate,
    event.timeZone
  )

  let spotsText: string | null = null
  if (event.spotsLeft !== undefined && event.capacity !== undefined) {
    spotsText = `${event.spotsLeft} of ${event.capacity} spots left`
  } else if (event.spotsLeft !== undefined) {
    spotsText = `${event.spotsLeft} spots left`
  }

  const organizerInitials = event.organizer
    ? event.organizer.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : ""

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <header className="relative isolate overflow-hidden bg-slate-900">
        {event.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- backend image URL; swap for next/image if the host is configured */}
            <img
              src={event.image}
              alt=""
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30"
            />
          </>
        ) : null}

        <div className="mx-auto max-w-7xl px-6 pt-8 pb-12 sm:pt-10 sm:pb-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-white/80 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ArrowLeft className="size-4" />
            All events
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
              <Tag className="size-3.5" />
              {event.category}
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <CalendarDays className="size-4" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <Clock className="size-4" />
                {time}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <MapPin className="size-4" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-6">
            <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                About this event
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-600 dark:text-slate-300">
                {event.description}
              </p>
            </section>

            {event.highlights && event.highlights.length > 0 ? (
              <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  <Sparkles className="size-5 text-violet-600 dark:text-violet-300" />
                  Highlights
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {event.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-300" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {event.agenda && event.agenda.length > 0 ? (
              <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Schedule
                </h2>
                <ol className="mt-5 space-y-5">
                  {event.agenda.map((item) => (
                    <li key={`${item.time}-${item.title}`} className="flex gap-4">
                      <span className="w-20 shrink-0 pt-0.5 text-sm font-semibold text-violet-600 dark:text-violet-300">
                        {item.time}
                      </span>
                      <div className="border-l border-violet-100 pl-4 dark:border-violet-900/50">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        {item.description ? (
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Location
              </h2>
              <div className="mt-4 flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {event.location}
                  </p>
                  {event.address ? (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {event.address}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-900">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Event details
              </h2>

              <dl className="mt-5 space-y-4">
                <DetailRow icon={<CalendarDays className="size-4" />} label="Date">
                  {date}
                </DetailRow>
                <DetailRow icon={<Clock className="size-4" />} label="Time">
                  {time}
                </DetailRow>
                <DetailRow icon={<MapPin className="size-4" />} label="Location">
                  {event.location}
                  {event.address ? (
                    <span className="mt-0.5 block text-sm font-normal text-slate-500 dark:text-slate-400">
                      {event.address}
                    </span>
                  ) : null}
                </DetailRow>
                {event.price ? (
                  <DetailRow icon={<Tag className="size-4" />} label="Price">
                    {event.price}
                  </DetailRow>
                ) : null}
                {spotsText ? (
                  <DetailRow icon={<Users className="size-4" />} label="Availability">
                    {spotsText}
                  </DetailRow>
                ) : null}
              </dl>

              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-base font-medium text-white shadow-lg shadow-violet-600/25 outline-none transition hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50"
                >
                  Register now
                  <ArrowRight className="size-4" />
                </a>
              ) : (
                <span className="mt-6 inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-lg bg-slate-200 px-5 text-base font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Registration closed
                </span>
              )}
            </section>

            {event.organizer ? (
              <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm dark:border-violet-900/40 dark:bg-slate-900">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Organizer
                </h2>
                <div className="mt-4 flex items-center gap-3">
                  {event.organizer.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element -- backend avatar URL
                    <img
                      src={event.organizer.avatar}
                      alt=""
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                      {organizerInitials}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {event.organizer.name}
                    </p>
                    {event.organizer.bio ? (
                      <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                        {event.organizer.bio}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>
            ) : null}

            <Link
              href="/events"
              className="flex items-center justify-between rounded-2xl border border-violet-100 bg-white p-5 text-sm font-semibold text-slate-900 shadow-sm outline-none transition hover:border-violet-300 hover:text-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-violet-900/40 dark:bg-slate-900 dark:text-white dark:hover:text-violet-300"
            >
              Browse all events
              <ArrowRight className="size-4" />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export { EventDetails }
