"use client"

import * as React from "react"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/components/providers/app-data-provider"
import { updateManagedEvent } from "@/app/account/events/actions"
import { toast } from "react-toastify"
import type { EventDetail } from "@/interfaces"

const inputClass =
  "h-10 w-full rounded-lg border border-violet-100 bg-violet-50/60 px-3 text-sm outline-none transition hover:bg-violet-50 focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/50 dark:border-violet-900/40 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"

const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300"

const textareaClass =
  "min-h-24 w-full rounded-lg border border-violet-100 bg-violet-50/60 px-3 py-2 text-sm outline-none transition hover:bg-violet-50 focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/50 dark:border-violet-900/40 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"

/**
 * Edit-event form used by /account/events/[slug]/edit.
 * Pre-fills fields from the existing event.
 */
export function EditEventForm({ event }: { event: EventDetail }) {
  const { categories } = useAppData()
  const [state, formAction, isPending] = useActionState(updateManagedEvent, null)

  const error = state?.ok === false ? state.error : null

  React.useEffect(() => {
    if (state?.ok) {
      toast.success("Event updated successfully!")
    }
  }, [state])

  const categoryOptions =
    categories.length > 0 ? categories : ["Cleanup", "Plantation", "Donation"]

  // Format eventDate for datetime-local input
  const dateValue = event.eventDate
    ? new Date(event.eventDate).toISOString().slice(0, 16)
    : ""

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900"
    >
      <input type="hidden" name="id" value={event._id} />

      <div className="space-y-2">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={event.title}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={event.description}
          className={textareaClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="category" className={labelClass}>
            Event type
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={event.eventType}
            className={inputClass}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className={labelClass}>
            Event date
          </label>
          <Input
            id="startDate"
            name="startDate"
            type="datetime-local"
            required
            defaultValue={dateValue}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <Input
          id="location"
          name="location"
          required
          defaultValue={event.location}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="thumbnail" className={labelClass}>
          Thumbnail image <span className="font-normal text-slate-400">(optional, leave empty to keep current)</span>
        </label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          className={inputClass}
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" className="h-10 rounded-full px-5">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        <Link
          href="/account/events"
          className="inline-flex h-10 items-center justify-center rounded-full border border-violet-100 bg-white px-5 text-sm font-semibold text-slate-700 outline-none transition hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-violet-900/40 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
