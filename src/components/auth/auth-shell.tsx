import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Two-panel auth layout: form on the left, simple gradient panel on the right
 * (hidden below lg). The panel only needs an icon, a title, and a description,
 * so there is no hand-drawn artwork to maintain. `className` can override the
 * grid ratio.
 */
export function AuthShell({
  children,
  icon,
  title,
  description,
  className,
}: {
  children: ReactNode
  icon: ReactNode
  title: string
  description: string
  className?: string
}) {
  return (
    <main className="flex-1">
      <section className={cn("grid min-h-[75vh] lg:grid-cols-2", className)}>
        <div className="flex items-center justify-center px-6 py-14 sm:px-10">
          {children}
        </div>

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12 lg:text-center dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-0 size-72 rounded-full bg-fuchsia-400/20 blur-3xl"
          />

          <div className="relative flex size-20 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
            {icon}
          </div>
          <h2 className="relative mt-6 text-3xl font-bold text-white">
            {title}
          </h2>
          <p className="relative mt-3 max-w-sm text-white/80">{description}</p>
        </div>
      </section>
    </main>
  )
}
