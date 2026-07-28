import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu-explorer";
import { getActiveProducts, getActiveToppings, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Monte seu açaí, sorvete ou sobremesa e peça online pelo WhatsApp.",
};

export default async function CardapioPage() {
  const [products, toppings, categories] = await Promise.all([
    getActiveProducts(),
    getActiveToppings(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8E24AA]">Cardápio</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Monte seu pedido 🍧
        </h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Escolha entre açaís, sorvetes, milk shakes e muito mais. Adicione ao
          carrinho e finalize pelo WhatsApp.
        </p>
      </div>

      <MenuExplorer categories={categories} products={products} toppings={toppings} />
    </div>
  );
}
