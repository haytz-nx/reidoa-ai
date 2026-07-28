import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ToppingsShowcase } from "@/components/toppings-showcase";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getActiveProducts, getActiveToppings, getCategories } from "@/lib/products";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, toppings, categories] = await Promise.all([
    getActiveProducts(),
    getActiveToppings(),
    getCategories(),
  ]);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const promos = products.filter((p) => p.isPromo).slice(0, 4);

  return (
    <>
      <HeroSection />

      <AboutSection />

      {promos.length > 0 && (
        <section className="bg-gradient-to-r from-orange-50 to-red-50 py-16 dark:from-[#1c1224] dark:to-[#1c1224]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                🔥 Promoções em Destaque
              </h2>
              <Link href="/promocoes" className="text-sm font-bold text-[#6A1B9A] dark:text-purple-300">
                Ver todas
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {promos.map((p) => (
                <ProductCard key={p.id} product={p} toppings={toppings} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            ⭐ Destaques do Cardápio
          </h2>
          <Link href="/cardapio" className="text-sm font-bold text-[#6A1B9A] dark:text-purple-300">
            Ver cardápio completo
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} toppings={toppings} />
          ))}
        </div>
      </section>

      <ToppingsShowcase toppings={toppings} />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#6A1B9A] p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Pronto para pedir o seu açaí?
          </h2>
          <p className="max-w-md text-white/85">
            Monte seu pedido em poucos cliques e finalize direto pelo
            WhatsApp. Rápido, fácil e sem complicação.
          </p>
          <Link href="/cardapio">
            <Button size="lg" className="!bg-white !text-[#6A1B9A] hover:!bg-white/90">
              🛒 Fazer Pedido Agora
            </Button>
          </Link>
        </div>
      </section>

      <p className="sr-only">Categorias disponíveis: {categories.map((c) => c.name).join(", ")}</p>
    </>
  );
}
