import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu-explorer";
import { getActiveProducts, getActiveToppings, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Promoções",
  description: "Confira as promoções do Rei do Açaí em Cerquilho.",
};

export default async function PromocoesPage() {
  const [products, toppings, categories] = await Promise.all([
    getActiveProducts(),
    getActiveToppings(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8E24AA]">🔥 Ofertas</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Promoções</h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Aproveite os melhores preços por tempo limitado.
        </p>
      </div>

      <MenuExplorer
        categories={categories}
        products={products}
        toppings={toppings}
        initialQuickFilter="promo"
        hideQuickFilters
      />
    </div>
  );
}
