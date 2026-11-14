import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EventDetails } from "@/components/events/event-details"
import { EventDetailsSkeleton } from "@/components/events/event-details-skeleton"
import { getEventBySlug } from "@/lib/events-api"

// The shared navbar reads usePathname(), whose value is unknown for a dynamic
// slug during prerendering. Opt this route out of instant navigation so the
// page can render per request instead of blocking the build.
export const instant = false

type EventPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return { title: "Event not found — Hermone" }
  }

  const description = event.description.slice(0, 160)

  return {
    title: `${event.title} — Hermone`,
    description,
    openGraph: {
      title: event.title,
      description,
      images: event.image ? [{ url: event.image }] : undefined,
    },
  }
}

// Cache Components requires runtime params to be read inside <Suspense>.
async function EventDetailsContent({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return <EventDetails event={event} />
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetailsContent params={params} />
    </Suspense>
  )
}
