// All backend routes live here so there is one place to fill in / change.
//
// The global data provider fetches `events`, `categories`, `gallery`, and
// `profile` in the browser. The server helpers use the same paths.
//
// Replace these values with your real backend routes.

export const endpoints = {
  /** List of event cards: GET -> EventSummary[] */
  events: "/events",
  recentEvents: "/events/recent",
  /** Gallery photos: GET -> GalleryImage[] */
  gallery: "/gallery",
  /** Filter pills for /events: GET -> string[] */
  categories: "/event-categories",
  /** Signed-in user: GET -> AccountProfile */
  profile: "/account/profile",

  /** One event's details: GET -> EventDetail */
  event: (slug: string) => `/events/${encodeURIComponent(slug)}`,

  /** Events the user manages: GET -> ManagedEvent[] */
  managedEvents: "/account/events",
  /** Events the user joined: GET -> JoinedEvent[] */
  joinedEvents: "/account/joined",
  /** Update or delete one managed event: PATCH / DELETE */
  managedEvent: (slug: string) => `/account/events/${encodeURIComponent(slug)}`,

  /** Create a new event: POST /account/events -> ManagedEvent */
  createEvent: "/events",

  /** Join an event: POST /events/{slug}/join */
  eventJoin: (slug: string) => `/events/${encodeURIComponent(slug)}/join`,
};
