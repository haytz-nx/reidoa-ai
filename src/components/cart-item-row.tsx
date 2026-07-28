"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrencyBRL } from "@/lib/utils";
import { getProductImage } from "@/lib/category-images";
import type { CartItem } from "@/lib/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateNotes = useCartStore((s) => s.updateNotes);
  const [notes, setNotes] = useState(item.notes);

  return (
    <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-[#1c1224]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={getProductImage(item.imageUrl, undefined)} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-sm font-bold leading-tight">
              {item.name}
              {item.size ? ` · ${item.size.label}` : ""}
            </p>
            {(item.flavors.length > 0 || item.toppings.length > 0) && (
              <p className="mt-0.5 text-[12px] text-black/50 dark:text-white/50">
                {[...item.flavors, ...item.toppings].join(", ")}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.cartId)}
            aria-label="Remover item"
            className="text-black/30 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <input
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            updateNotes(item.cartId, e.target.value);
          }}
          placeholder="Observações (opcional)"
          className="mt-2 h-8 w-full rounded-lg border border-black/10 bg-transparent px-2 text-xs outline-none focus:border-[#6A1B9A] dark:border-white/10"
        />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-black/10 px-1.5 py-0.5 dark:border-white/10">
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Diminuir"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Aumentar"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="font-display text-sm font-extrabold text-[#6A1B9A] dark:text-purple-300">
            {formatCurrencyBRL(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
