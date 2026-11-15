// The single empty state used wherever a list has no data (or is still
// loading). Keeping it shared means the "No data found" markup lives here
// only, instead of being repeated in every section.

import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmptyState({
  title = "No data found",
  message,
  tone = "dark",
  className,
}: {
  title?: string
  message?: string
  /** "light" for use on colored/gradient sections (e.g. the gallery). */
  tone?: "dark" | "light"
  className?: string
}) {
  const isLight = tone === "light"

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center",
        isLight
          ? "border-white/30 bg-white/10 backdrop-blur"
          : "border-violet-200 bg-white dark:border-violet-900/50 dark:bg-slate-900",
        className
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          isLight
            ? "bg-white/15 text-white"
            : "bg-violet-50 text-violet-500 dark:bg-violet-500/10 dark:text-violet-300"
        )}
      >
        <Inbox className="size-6" />
      </span>
      <p className={cn("font-medium", isLight ? "text-white" : "text-slate-900 dark:text-white")}>
        {title}
      </p>
      {message ? (
        <p
          className={cn(
            "text-sm",
            isLight
              ? "text-white/80"
              : "text-slate-500 dark:text-slate-400"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
