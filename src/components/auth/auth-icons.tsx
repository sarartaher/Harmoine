import { cn } from "@/lib/utils"
import type { IconProps } from "@/interfaces"

// lucide no longer ships brand logos, so each provider button uses a simple
// letter badge instead of a hand-written SVG path.

/** Blue "G" badge for the Google button. */
export function GoogleIcon({ className }: IconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-full bg-[#4285F4] text-[10px] font-bold text-white",
        className
      )}
    >
      G
    </span>
  )
}

/** Dark "GH" badge for the GitHub button. */
export function GithubIcon({ className }: IconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white dark:bg-white dark:text-slate-900",
        className
      )}
    >
      GH
    </span>
  )
}
