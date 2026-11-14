"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccountError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex-1 bg-slate-50 px-6 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-lg rounded-2xl border border-violet-100 bg-white p-10 text-center shadow-sm dark:border-violet-900/40 dark:bg-slate-900">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="size-7" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          We could not load your events. Check the backend and try again.
        </p>
        <Button
          type="button"
          onClick={reset}
          className="mt-8 h-11 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-base text-white shadow-lg shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500"
        >
          Try again
        </Button>
      </div>
    </main>
  )
}
