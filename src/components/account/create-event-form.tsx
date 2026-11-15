"use client"

import * as React from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/components/providers/app-data-provider"
import { createManagedEvent } from "@/app/account/events/actions"
import { toast } from "react-toastify"

const inputClass =
  "h-10 w-full rounded-lg border border-violet-100 bg-violet-50/60 px-3 text-sm outline-none transition hover:bg-violet-50 focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/50 dark:border-violet-900/40 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"

const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-300"

const textareaClass =
  "min-h-24 w-full rounded-lg border border-violet-100 bg-violet-50/60 px-3 py-2 text-sm outline-none transition hover:bg-violet-50 focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/50 dark:border-violet-900/40 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"

/**
 * Create-event form used by /account/events/new.
 *
 * The event type comes from the backend categories list. The date must be in
 * the future; the server action re-validates before calling the backend.
 */
export function CreateEventForm() {
  const { categories, loading } = useAppData()
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(createManagedEvent, null)

  const error = state?.ok === false ? state.error : null

  React.useEffect(() => {
    if (state?.ok) {
      toast.success("Event created successfully!")
      router.push("/events")
    }
  }, [state, router])

  const categoryOptions =
    categories.length > 0 ? categories : ["Cleanup", "Plantation", "Donation"]

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8 dark:border-violet-900/40 dark:bg-slate-900"
    >
      <div className="space-y-2">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <Input
          id="title"
          name="title"
          required
          placeholder="e.g. Winter Clothes Distribution"
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
          placeholder="Tell volunteers what this event is about..."
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
            disabled={loading}
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {loading ? "Loading..." : "Select a type"}
            </option>
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
          placeholder="e.g. Mirpur 10, Dhaka"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="thumbnail" className={labelClass}>
          Thumbnail image <span className="font-normal text-slate-400">(optional)</span>
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
          {isPending ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  )
}
