export function EventDetailsSkeleton() {
  return (
    <div
      className="flex-1 bg-slate-50 dark:bg-slate-950"
      aria-busy="true"
      aria-label="Loading event details"
    >
      <div className="h-80 animate-pulse bg-slate-200 sm:h-96 dark:bg-slate-800" />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
            <div className="h-40 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
          </div>
          <div className="h-96 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />
        </div>
      </div>
    </div>
  )
}
