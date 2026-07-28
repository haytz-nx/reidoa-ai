"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  updateNotes: (cartId: string, notes: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, cartId: generateId() }],
        })),
      removeItem: (cartId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartId !== cartId),
        })),
      updateQuantity: (cartId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      updateNotes: (cartId, notes) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, notes } : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "rei-do-acai-cart" },
  ),
);
