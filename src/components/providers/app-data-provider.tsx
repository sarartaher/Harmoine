"use client";

import * as React from "react";
import type {
  AppData,
  EventSummary,
  GalleryImage,
} from "@/interfaces";
import { apiUrl } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

// Default data before the backend responds
const emptyData: AppData = {
  events: [],
  recentEvents: [],
  categories: [],
  gallery: [],
  profile: null,
  loading: true,
};

// Placeholder photos until the backend has a real gallery endpoint.
// One stable image per event shown in the gallery carousel.
const placeholderGallery: GalleryImage[] = [
  { id: "g1", src: "https://placehold.co/400x300/7c3aed/ffffff?text=Community+Clean-Up", alt: "Community clean-up event" },
  { id: "g2", src: "https://placehold.co/400x300/4f46e5/ffffff?text=Tree+Planting", alt: "Tree planting day" },
  { id: "g3", src: "https://placehold.co/400x300/8b5cf6/ffffff?text=Food+Drive", alt: "Food drive for families" },
  { id: "g4", src: "https://placehold.co/400x300/6d28d9/ffffff?text=Health+Camp", alt: "Free health camp" },
  { id: "g5", src: "https://placehold.co/400x300/5b21b6/ffffff?text=School+Fundraiser", alt: "School fundraiser fair" },
  { id: "g6", src: "https://placehold.co/400x300/4338ca/ffffff?text=Youth+Mentorship", alt: "Youth mentorship workshop" },
];

// Create a place to share data with other components
const AppDataContext = React.createContext<AppData>(emptyData);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<AppData>(emptyData);

  React.useEffect(() => {
    async function loadData() {
      try {
        // Get data from the backend
        const [eventsResponse, recentEventsResponse] = await Promise.all([
          fetch(apiUrl(endpoints.events)),
          fetch(apiUrl(endpoints.recentEvents)),
        ]);

        // Convert the responses into JavaScript data
        const events: EventSummary[] = eventsResponse.ok
          ? await eventsResponse.json()
          : [];

        const recentEvents: EventSummary[] = recentEventsResponse.ok
          ? await recentEventsResponse.json()
          : [];

        // Categories come from the unique event types in the events list
        // (the backend has no dedicated categories endpoint).
        const categories: string[] = [
          ...new Set(events.map((e) => e.eventType).filter(Boolean)),
        ];

        // Save all the data in React state
        setData({
          events,
          recentEvents,
          categories,
          gallery: placeholderGallery,
          profile: null,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to load app data:", error);

        // Stop loading even if the backend request fails
        setData({
          ...emptyData,
          loading: false,
        });
      }
    }

    loadData();
  }, []);

  return (
    <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>
  );
}

// Use this function to access shared data
export function useAppData() {
  return React.useContext(AppDataContext);
}
