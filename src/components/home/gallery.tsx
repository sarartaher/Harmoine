"use client"

import { EventImage } from "@/components/shared/event-image"
import { useAppData } from "@/components/providers/app-data-provider"
import { SectionHeading } from "@/components/home/section-heading"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { EmptyState } from "@/components/shared/empty-state"

export function Gallery() {
  const { gallery } = useAppData()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 size-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 size-72 rounded-full bg-fuchsia-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading title="Our Gallery" tone="light" />

        {gallery.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} className="mt-10">
            <CarouselContent>
              {gallery.map((image) => (
                <CarouselItem
                  key={image.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/20">
                    <EventImage
                      src={image.src}
                      alt={image.alt || "Event photo"}
                      className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 size-9 border-white/30 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white sm:-left-4 dark:border-white/20" />
            <CarouselNext className="-right-2 size-9 border-white/30 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white sm:-right-4 dark:border-white/20" />
          </Carousel>
        ) : (
          <EmptyState
            tone="light"
            className="mt-10"
            message="Photos from your backend will appear here."
          />
        )}
      </div>
    </section>
  )
}
