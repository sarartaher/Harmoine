import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react"

// Simple list of the things Hermone helps people do. Each item has a lucide
// icon and a short label, so we do not need any hand-drawn SVG artwork.
const highlights = [
  { label: "Discover events", icon: CalendarDays },
  { label: "Meet new people", icon: Users },
  { label: "Build community", icon: HeartHandshake },
  { label: "Make memories", icon: Sparkles },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-indigo-950/50">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 size-96 rounded-full bg-violet-300/40 blur-3xl dark:bg-violet-500/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-80 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-500/20"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Bringing People Together
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Discover events, connect with people, and make meaningful memories.
          </p>
          <Link
            href="/events"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 text-base text-white shadow-lg shadow-violet-600/25 outline-none transition-all hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:shadow-violet-900/40"
          >
            Explore Events
            <ArrowRight className="size-5" />
          </Link>
        </div>

        <div className="relative">
          {/* soft glow behind the panel */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-500/30 via-fuchsia-400/20 to-indigo-500/30 blur-xl dark:from-violet-500/20 dark:to-indigo-500/20 lg:-inset-8"
          />

          <div className="relative grid aspect-[4/3] grid-cols-2 gap-4 rounded-[2rem] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6 shadow-2xl ring-1 ring-white/30 sm:p-8 lg:aspect-[5/4]">
            {highlights.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/15 p-4 text-center text-white backdrop-blur"
              >
                <Icon className="size-8" />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
