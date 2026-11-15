"use client";

import * as React from "react";
import type {
  AccountProfile,
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

// Create a place to share data with other components
const AppDataContext = React.createContext<AppData>(emptyData);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<AppData>(emptyData);

  React.useEffect(() => {
    async function loadData() {
      try {
        // Get data from the backend
        const [
          eventsResponse,
          recentEventsResponse,
          categoriesResponse,
          galleryResponse,
          profileResponse,
        ] = await Promise.all([
          fetch(apiUrl(endpoints.events)),
          fetch(apiUrl(endpoints.recentEvents)),
          fetch(apiUrl(endpoints.categories)),
          fetch(apiUrl(endpoints.gallery)),
          fetch(apiUrl(endpoints.profile)),
        ]);

        // Convert the responses into JavaScript data
        const events: EventSummary[] = eventsResponse.ok
          ? await eventsResponse.json()
          : [];

        const recentEvents: EventSummary[] = recentEventsResponse.ok
          ? await recentEventsResponse.json()
          : [];

        const categories: string[] = categoriesResponse.ok
          ? await categoriesResponse.json()
          : [];

        const gallery: GalleryImage[] = galleryResponse.ok
          ? await galleryResponse.json()
          : [];

        const profile: AccountProfile | null = profileResponse.ok
          ? await profileResponse.json()
          : null;

        // Save all the data in React state
        setData({
          events,
          recentEvents,
          categories,
          gallery,
          profile,
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
