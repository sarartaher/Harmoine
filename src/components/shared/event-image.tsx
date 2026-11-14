import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Shows the backend image when there is one.
 * When there is no image, it draws a simple gradient box with a calendar icon,
 * so we do not need any local placeholder files.
 */
export function EventImage({
  src,
  alt,
  className,
  iconClassName = "size-10",
}: {
  src?: string
  alt: string
  className?: string
  iconClassName?: string
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- backend image URL; swap for next/image if the host is configured
      <img src={src} alt={alt} loading="lazy" className={className} />
    )
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600",
        className
      )}
    >
      <CalendarDays className={cn("text-white/80", iconClassName)} />
    </div>
  )
}
