import type { Metadata } from "next"
import { EventBrowser } from "@/components/events/event-browser"

export const metadata: Metadata = {
  title: "Upcoming Events — Hermone",
  description: "Find and join exciting events in your community.",
}

export default function EventsPage() {
  return <EventBrowser />
}
