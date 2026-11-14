import { Ticket } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { JoinedEventsSkeleton } from "@/components/account/joined-events-skeleton"

export default function Loading() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Joined Events"
        description="Everything you have signed up for, in one place."
        icon={<Ticket className="size-6" />}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <JoinedEventsSkeleton />
      </div>
    </main>
  )
}
