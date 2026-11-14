"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function EventsToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
}: {
  query: string
  onQueryChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm dark:border-violet-900/40 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
      <form
        role="search"
        className="flex items-center gap-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-violet-500" />
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search events..."
            aria-label="Search events"
            className="h-10 w-full rounded-lg border-violet-100 bg-violet-50/60 pr-3 pl-9 sm:w-72 dark:border-violet-900/40 dark:bg-violet-950/30"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          aria-label="Search"
          className="size-10 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md hover:from-violet-400 hover:to-indigo-500"
        >
          <Search />
        </Button>
      </form>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((value) => {
          const active = category === value
          return (
            <Button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(value)}
              variant="outline"
              className={cn(
                "h-9 rounded-full px-4",
                active
                  ? "border-transparent bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  : "border-violet-100 bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700 dark:border-violet-900/40 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
              )}
            >
              {value}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
