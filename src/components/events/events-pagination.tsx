"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function EventsPagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
}) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="size-9 rounded-full bg-white dark:bg-slate-900"
      >
        <ChevronLeft />
      </Button>

      {pages.map((value) => {
        const active = value === page
        return (
          <Button
            key={value}
            type="button"
            aria-label={`Page ${value}`}
            aria-current={active ? "page" : undefined}
            onClick={() => onChange(value)}
            className={cn(
              "size-9 rounded-full",
              active
                ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md"
                : "border-border bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-violet-950/40"
            )}
          >
            {value}
          </Button>
        )
      })}

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        className="size-9 rounded-full bg-white dark:bg-slate-900"
      >
        <ChevronRight />
      </Button>
    </nav>
  )
}
