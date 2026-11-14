const skeletonCards = [1, 2, 3, 4, 5, 6]

export function JoinedEventsSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading joined events">
      <div className="h-20 animate-pulse rounded-2xl bg-white dark:bg-slate-900" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((card) => (
          <div
            key={card}
            className="overflow-hidden rounded-2xl border border-violet-100 bg-white dark:border-violet-900/40 dark:bg-slate-900"
          >
            <div className="aspect-[16/10] animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
