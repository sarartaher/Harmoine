import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { Ticket } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { JoinedEvents } from "@/components/account/joined-events"
import { EmptyState } from "@/components/shared/empty-state"
import { getJoinedEvents } from "@/lib/account-api"

export const metadata: Metadata = {
  title: "Joined Events — Hermone",
  description: "All the events you have joined, in one place.",
}

// Cache Components requires runtime data to be read inside <Suspense>.
async function JoinedEventsContent() {
  const events = await getJoinedEvents()

  return <JoinedEvents events={events} />
}

export default function AccountJoinedPage() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Joined Events"
        description="Everything you have signed up for, in one place."
        icon={<Ticket className="size-6" />}
        action={
          <Link
            href="/events"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 outline-none transition hover:from-violet-500 hover:to-indigo-500 focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            Find more events
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Suspense fallback={<EmptyState />}>
          <JoinedEventsContent />
        </Suspense>
      </div>
    </main>
  )
}
