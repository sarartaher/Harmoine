// Central content for the home page — swap image paths here when you have real photos.

export type EventItem = {
  id: string
  title: string
  /** ISO date, e.g. "2026-01-25" */
  date: string
  location: string
  /** Path under /public */
  image: string
}

export const events: EventItem[] = [
  {
    id: "tech-career-workshop",
    title: "Tech Career Workshop",
    date: "2026-01-25",
    location: "Central Library",
    image: "/events/event-1.svg",
  },
  {
    id: "design-meetup",
    title: "Design Meetup",
    date: "2026-01-28",
    location: "Downtown",
    image: "/events/event-2.svg",
  },
  {
    id: "book-club",
    title: "Book Club",
    date: "2026-02-02",
    location: "Riverside Library",
    image: "/events/event-3.svg",
  },
  {
    id: "health-wellness-workshop",
    title: "Health & Wellness Workshop",
    date: "2026-02-05",
    location: "City Garden",
    image: "/events/event-4.svg",
  },
  {
    id: "food-festival",
    title: "Food Festival",
    date: "2026-02-10",
    location: "Central Park",
    image: "/events/event-5.svg",
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    date: "2026-02-14",
    location: "Hub",
    image: "/events/event-6.svg",
  },
]

export type GalleryImage = {
  id: string
  /** Path under /public */
  src: string
  alt: string
}

export const galleryImages: GalleryImage[] = [
  { id: "gallery-1", src: "/gallery/gallery-1.svg", alt: "Event moment 1" },
  { id: "gallery-2", src: "/gallery/gallery-2.svg", alt: "Event moment 2" },
  { id: "gallery-3", src: "/gallery/gallery-3.svg", alt: "Event moment 3" },
  { id: "gallery-4", src: "/gallery/gallery-4.svg", alt: "Event moment 4" },
  { id: "gallery-5", src: "/gallery/gallery-5.svg", alt: "Event moment 5" },
  { id: "gallery-6", src: "/gallery/gallery-6.svg", alt: "Event moment 6" },
]

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
]

/** Splits an ISO date without Date() to avoid timezone shifting the day. */
export function dateBadge(date: string): { month: string; day: string } {
  const [, month, day] = date.split("-")
  return {
    month: MONTHS[Number(month) - 1] ?? "",
    day: String(Number(day)),
  }
}

// ---------------------------------------------------------------------------
// /events page
// ---------------------------------------------------------------------------

export type EventListing = {
  id: string
  title: string
  /** ISO date, e.g. "2026-08-26" */
  date: string
  location: string
  /** Card tag. "Meetup"/"Community"/"Business" are shown under the "Other" filter pill. */
  category: string
  /** Path under /public */
  image: string
}

/** Filter pills on the events page (in display order). */
export const eventCategories = [
  "All",
  "Workshop",
  "Conference",
  "Festival",
  "Expo",
  "Other",
]

export const eventListings: EventListing[] = [
  {
    id: "tech-career-workshop",
    title: "Tech Career Workshop",
    date: "2026-08-26",
    location: "Central Park",
    category: "Workshop",
    image: "/events/event-1.svg",
  },
  {
    id: "design-meetup",
    title: "Design Meetup",
    date: "2026-08-28",
    location: "Downtown",
    category: "Meetup",
    image: "/events/event-2.svg",
  },
  {
    id: "book-club",
    title: "Book Club",
    date: "2026-08-02",
    location: "Riverside Library",
    category: "Community",
    image: "/events/event-3.svg",
  },
  {
    id: "health-wellness-workshop",
    title: "Health & Wellness Workshop",
    date: "2026-08-05",
    location: "Central Park",
    category: "Workshop",
    image: "/events/event-4.svg",
  },
  {
    id: "food-festival",
    title: "Food Festival",
    date: "2026-08-10",
    location: "Central Park",
    category: "Festival",
    image: "/events/event-5.svg",
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch",
    date: "2026-08-14",
    location: "Innovation Hub",
    category: "Business",
    image: "/events/event-6.svg",
  },
  {
    id: "photography-walk",
    title: "Photography Walk",
    date: "2026-08-16",
    location: "Old Town",
    category: "Meetup",
    image: "/events/event-7.svg",
  },
  {
    id: "coding-bootcamp",
    title: "Coding Bootcamp",
    date: "2026-08-18",
    location: "Tech Park",
    category: "Workshop",
    image: "/events/event-8.svg",
  },
  {
    id: "music-night",
    title: "Music Night",
    date: "2026-08-20",
    location: "Riverfront",
    category: "Festival",
    image: "/events/event-9.svg",
  },
  {
    id: "art-exhibition",
    title: "Art Exhibition",
    date: "2026-08-22",
    location: "City Gallery",
    category: "Expo",
    image: "/events/event-10.svg",
  },
  {
    id: "yoga-in-the-park",
    title: "Yoga in the Park",
    date: "2026-08-24",
    location: "Central Park",
    category: "Workshop",
    image: "/events/event-11.svg",
  },
  {
    id: "charity-run",
    title: "Charity Run",
    date: "2026-08-30",
    location: "Lakeside",
    category: "Other",
    image: "/events/event-12.svg",
  },
  {
    id: "film-screening",
    title: "Film Screening",
    date: "2026-09-01",
    location: "Cinema Hall",
    category: "Other",
    image: "/events/event-13.svg",
  },
  {
    id: "language-exchange",
    title: "Language Exchange",
    date: "2026-09-03",
    location: "Downtown",
    category: "Meetup",
    image: "/events/event-14.svg",
  },
  {
    id: "blockchain-summit",
    title: "Blockchain Summit",
    date: "2026-09-05",
    location: "Innovation Hub",
    category: "Conference",
    image: "/events/event-15.svg",
  },
  {
    id: "career-fair",
    title: "Career Fair",
    date: "2026-09-08",
    location: "Convention Center",
    category: "Expo",
    image: "/events/event-16.svg",
  },
  {
    id: "cooking-class",
    title: "Cooking Class",
    date: "2026-09-10",
    location: "Riverside",
    category: "Workshop",
    image: "/events/event-17.svg",
  },
  {
    id: "community-garden-day",
    title: "Community Garden Day",
    date: "2026-09-12",
    location: "City Garden",
    category: "Community",
    image: "/events/event-18.svg",
  },
]
