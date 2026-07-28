"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { usePreferencesStore } from "@/store/preferences-store";
import { cn } from "@/lib/utils";
import type { Category, Product, Topping } from "@/lib/types";

type QuickFilter = "all" | "promo" | "popular" | "new" | "favorites";
type SortOption = "relevance" | "price-asc" | "price-desc" | "name";

export function MenuExplorer({
  categories,
  products,
  toppings,
  initialQuickFilter = "all",
  hideQuickFilters = false,
  title,
}: {
  categories: Category[];
  products: Product[];
  toppings: Topping[];
  initialQuickFilter?: QuickFilter;
  hideQuickFilters?: boolean;
  title?: string;
}) {
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState<string>("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(initialQuickFilter);
  const [sort, setSort] = useState<SortOption>("relevance");
  const favorites = usePreferencesStore((s) => s.favorites);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.active);

    if (categorySlug !== "all") {
      list = list.filter((p) => p.categorySlug === categorySlug);
    }

    if (quickFilter === "promo") list = list.filter((p) => p.isPromo);
    if (quickFilter === "popular") list = list.filter((p) => p.popular);
    if (quickFilter === "new") list = list.filter((p) => p.isNew);
    if (quickFilter === "favorites") list = list.filter((p) => favorites.includes(p.id));

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.categoryName ?? "").toLowerCase().includes(q),
      );
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    return sorted;
  }, [products, categorySlug, quickFilter, search, sort, favorites]);

  const grouped = useMemo(() => {
    if (categorySlug !== "all" || sort !== "relevance") return null;
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      const key = p.categoryName ?? "Outros";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return map;
  }, [filtered, categorySlug, sort]);

  return (
    <div>
      {title && (
        <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      )}

      <div className="sticky top-16 z-30 -mx-4 space-y-3 bg-[#F5F5F5]/95 px-4 py-3 backdrop-blur-md dark:bg-[#120a19]/95 sm:mx-0 sm:rounded-2xl sm:px-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 dark:text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar açaí, sorvete, milk shake..."
              className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm shadow-sm outline-none focus:border-[#6A1B9A] focus:ring-2 focus:ring-[#6A1B9A]/20 dark:bg-[#1c1224] dark:border-white/10"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Ordenar"
              className="h-12 appearance-none rounded-2xl border border-black/10 bg-white pl-10 pr-4 text-sm shadow-sm outline-none focus:border-[#6A1B9A] dark:bg-[#1c1224] dark:border-white/10"
            >
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="name">Nome A-Z</option>
            </select>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40" />
          </div>
        </div>

        {!hideQuickFilters && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {[
              { id: "all", label: "Tudo" },
              { id: "promo", label: "🔥 Promoções" },
              { id: "popular", label: "⭐ Mais Pedidos" },
              { id: "new", label: "🆕 Novidades" },
              { id: "favorites", label: "❤️ Favoritos" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setQuickFilter(f.id as QuickFilter)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  quickFilter === f.id
                    ? "border-[#6A1B9A] bg-[#6A1B9A] text-white"
                    : "border-black/10 bg-white text-black/70 dark:border-white/10 dark:bg-[#1c1224] dark:text-white/70",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <button
            onClick={() => setCategorySlug("all")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium transition",
              categorySlug === "all"
                ? "border-[#8E24AA] bg-[#8E24AA]/10 text-[#8E24AA]"
                : "border-black/10 text-black/60 dark:border-white/10 dark:text-white/60",
            )}
          >
            Todas Categorias
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategorySlug(c.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium transition",
                categorySlug === c.slug
                  ? "border-[#8E24AA] bg-[#8E24AA]/10 text-[#8E24AA]"
                  : "border-black/10 text-black/60 dark:border-white/10 dark:text-white/60",
              )}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {filtered.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center text-black/50 shadow-sm dark:bg-[#1c1224] dark:text-white/50">
            Nenhum produto encontrado. Tente outro termo de busca ou filtro.
          </div>
        )}

        {grouped ? (
          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([categoryName, items]) => (
              <section key={categoryName}>
                <h3 className="mb-4 font-display text-xl font-bold">{categoryName}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} toppings={toppings} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} toppings={toppings} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
