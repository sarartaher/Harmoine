import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { ManagedEvents } from "@/components/account/managed-events"
import { ManagedEventsSkeleton } from "@/components/account/managed-events-skeleton"
import { getManagedEvents } from "@/lib/account-api"

export const metadata: Metadata = {
  title: "Manage Events — Hermone",
  description: "Create, publish, and keep track of the events you organize.",
}

// Cache Components requires runtime data to be read inside <Suspense>.
async function ManagedEventsContent() {
  const events = await getManagedEvents()

  return <ManagedEvents events={events} />
}

export default function AccountEventsPage() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Manage Events"
        description="Create, publish, and keep track of the events you organize."
        icon={<CalendarDays className="size-6" />}
        action={
          <Link
            href="/events"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 outline-none transition hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            Browse events
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Suspense fallback={<ManagedEventsSkeleton />}>
          <ManagedEventsContent />
        </Suspense>
      </div>
    </main>
  )
}
