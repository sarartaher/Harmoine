import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  tone = "dark",
  className,
}: {
  title: string
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span
        aria-hidden
        className={cn(
          "hidden h-px w-16 bg-gradient-to-r from-transparent sm:block",
          tone === "dark" ? "to-violet-400 dark:to-violet-600" : "to-white/70"
        )}
      />
      <h2
        className={cn(
          "text-center text-3xl font-bold tracking-tight sm:text-4xl",
          tone === "dark"
            ? "text-slate-900 dark:text-white"
            : "text-white"
        )}
      >
        {title}
      </h2>
      <span
        aria-hidden
        className={cn(
          "hidden h-px w-16 bg-gradient-to-l from-transparent sm:block",
          tone === "dark" ? "to-violet-400 dark:to-violet-600" : "to-white/70"
        )}
      />
    </div>
  )
}
