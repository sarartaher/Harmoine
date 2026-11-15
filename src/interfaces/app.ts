// Shape of the data shared through `useAppData()`.

import type { AccountProfile } from "@/interfaces/account";
import type { EventSummary } from "@/interfaces/event";
import type { GalleryImage } from "@/interfaces/gallery";

export type AppData = {
  events: EventSummary[];
  recentEvents: EventSummary[];
  categories: string[];
  gallery: GalleryImage[];
  profile: AccountProfile | null;
  /** True until the first fetch finishes (or fails). */
  loading: boolean;
};
