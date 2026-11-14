import Link from "next/link"
import { SearchX } from "lucide-react"

export default function EventNotFound() {
  return (
    <main className="flex-1 bg-slate-50 px-6 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-lg rounded-2xl border border-violet-100 bg-white p-10 text-center shadow-sm dark:border-violet-900/40 dark:bg-slate-900">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
          <SearchX className="size-7" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Event not found
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          This event may have been removed, or the link is incorrect.
        </p>
        <Link
          href="/events"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-base font-medium text-white shadow-lg shadow-violet-600/25 outline-none transition hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50"
        >
          Browse upcoming events
        </Link>
      </div>
    </main>
  )
}
