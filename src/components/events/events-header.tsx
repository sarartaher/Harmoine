import { CalendarCheck } from "lucide-react"

export function EventsHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-indigo-100 dark:from-violet-950/50 dark:via-purple-950/40 dark:to-indigo-950/50">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/4 size-64 rounded-full bg-white/50 blur-3xl dark:bg-violet-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/3 size-64 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/10"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-12 sm:py-14">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Upcoming Events
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Find and join exciting events in your community
          </p>
        </div>
        <span
          aria-hidden
          className="hidden shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-white shadow-xl shadow-violet-500/30 sm:block"
        >
          <CalendarCheck className="size-12" />
        </span>
      </div>
    </section>
  )
}
