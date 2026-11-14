export function ManagedEventsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading your events">
      <div className="h-20 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />

      <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white dark:border-violet-900/40 dark:bg-slate-900">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-violet-100 p-5 last:border-b-0 dark:border-violet-900/40"
          >
            <div className="size-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  )
}
