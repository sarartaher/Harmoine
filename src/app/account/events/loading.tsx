import { CalendarDays } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { ManagedEventsSkeleton } from "@/components/account/managed-events-skeleton"

export default function Loading() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Manage Events"
        description="Create, publish, and keep track of the events you organize."
        icon={<CalendarDays className="size-6" />}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <ManagedEventsSkeleton />
      </div>
    </main>
  )
}
