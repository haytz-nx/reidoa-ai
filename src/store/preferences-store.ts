"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  recentlyViewed: number[];
  addRecentlyViewed: (productId: number) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
      isFavorite: (productId) => get().favorites.includes(productId),
      recentlyViewed: [],
      addRecentlyViewed: (productId) =>
        set((state) => ({
          recentlyViewed: [
            productId,
            ...state.recentlyViewed.filter((id) => id !== productId),
          ].slice(0, 12),
        })),
    }),
    { name: "rei-do-acai-preferences" },
  ),
);
