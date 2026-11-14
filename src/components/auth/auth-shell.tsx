import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Two-panel auth layout: form on the left, decorative illustration panel on
 * the right (hidden below lg). `className` can override the grid ratio.
 */
export function AuthShell({
  children,
  illustration,
  className,
}: {
  children: ReactNode
  illustration: ReactNode
  className?: string
}) {
  return (
    <main className="flex-1">
      <section className={cn("grid min-h-[75vh] lg:grid-cols-2", className)}>
        <div className="flex items-center justify-center px-6 py-14 sm:px-10">
          {children}
        </div>
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#efeaff] via-[#f4f1ff] to-[#e8e3ff] lg:block dark:from-violet-950/40 dark:via-slate-900 dark:to-indigo-950/40">
          {illustration}
        </div>
      </section>
    </main>
  )
}
