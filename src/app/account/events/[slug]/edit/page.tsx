import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { EditEventForm } from "@/components/account/edit-event-form"
import { EmptyState } from "@/components/shared/empty-state"
import { getEventBySlug } from "@/lib/events-api"
import type { EventPageProps } from "@/interfaces"

// The shared navbar reads usePathname(), whose value is unknown for a dynamic
// slug during prerendering. Opt this route out of instant navigation so the
// page can render per request instead of blocking the build.
export const instant = false

export const metadata: Metadata = {
  title: "Edit Event — Hermone",
  description: "Update your event details.",
}

// Cache Components requires runtime params to be read inside <Suspense>.
async function EditEventContent({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return <EmptyState message="Event not found." />
  }

  return <EditEventForm event={event} />
}

export default function EditEventPage({ params }: EventPageProps) {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Edit Event"
        description="Update your event details."
        icon={<CalendarDays className="size-6" />}
        action={
          <Link
            href="/account/events"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-violet-100 bg-white px-5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-violet-900/40 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
          >
            Back to events
          </Link>
        }
      />

      <div className="mx-auto max-w-3xl px-6 py-8">
        <Suspense fallback={<EmptyState />}>
          <EditEventContent params={params} />
        </Suspense>
      </div>
    </main>
  )
}
