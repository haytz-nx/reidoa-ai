"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrencyBRL } from "@/lib/utils";

export function FloatingCartButton() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (pathname?.startsWith("/admin")) return null;
  if (pathname === "/carrinho") return null;
  if (!mounted || items.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
      <Link
        href="/carrinho"
        className="flex items-center justify-between gap-3 rounded-2xl bg-[#6A1B9A] px-5 py-4 text-white shadow-2xl shadow-purple-900/40 animate-fade-up"
      >
        <span className="flex items-center gap-2 font-semibold">
          <span className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-black">
              {totalItems}
            </span>
          </span>
          Ver Carrinho
        </span>
        <span className="font-bold">{formatCurrencyBRL(subtotal)}</span>
      </Link>
    </div>
  );
}
