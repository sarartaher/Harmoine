"use client"

import { CalendarDays } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { CreateEventForm } from "@/components/account/create-event-form"

export default function CreateEventPage() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Create Event"
        description="Organize a community service event in your local area."
        icon={<CalendarDays className="size-6" />}
      />

      <div className="mx-auto max-w-3xl px-6 py-8 pb-16">
        <CreateEventForm />
      </div>
    </main>
  )
}
