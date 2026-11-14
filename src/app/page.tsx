import { Gallery } from "@/components/home/gallery"
import { Hero } from "@/components/home/hero"
import { Newsletter } from "@/components/home/newsletter"
import { UpcomingEvents } from "@/components/home/upcoming-events"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <UpcomingEvents />
      <Gallery />
      <Newsletter />
    </main>
  )
}
