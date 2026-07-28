"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCustomizeModal } from "@/components/product-customize-modal";
import { formatCurrencyBRL, cn } from "@/lib/utils";
import { getProductImage } from "@/lib/category-images";
import { useCartStore } from "@/store/cart-store";
import { usePreferencesStore } from "@/store/preferences-store";
import type { Product, Topping } from "@/lib/types";
import { toast } from "sonner";

export function ProductCard({
  product,
  toppings,
}: {
  product: Product;
  toppings: Topping[];
}) {
  const [qty, setQty] = useState(1);
  const [showCustomize, setShowCustomize] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = usePreferencesStore((s) => s.isFavorite(product.id));
  const toggleFavorite = usePreferencesStore((s) => s.toggleFavorite);

  const isCustomizable = product.customizationType !== "none";
  const price = product.isPromo && product.promoPrice ? product.promoPrice : product.price;
  const image = getProductImage(product.imageUrl, product.categorySlug);

  const handleAdd = () => {
    if (isCustomizable) {
      setShowCustomize(true);
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.imageUrl,
      basePrice: price,
      unitPrice: price,
      quantity: qty,
      size: null,
      flavors: [],
      toppings: [],
      notes: "",
    });
    toast.success("Adicionado ao carrinho! 🍧");
    setQty(1);
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(106,27,154,0.15)] dark:bg-[#1c1224]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {product.isPromo && <Badge variant="promo">Promoção</Badge>}
          {product.isNew && <Badge variant="new">Novo</Badge>}
          {product.popular && <Badge variant="popular">Popular</Badge>}
        </div>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="Favoritar"
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 dark:bg-black/50"
        >
          <Heart
            className={cn(
              "h-4.5 w-4.5",
              isFavorite ? "fill-red-500 text-red-500" : "text-black/50 dark:text-white/70",
            )}
          />
        </button>
        {!product.active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[15px] font-bold leading-snug">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-[13px] text-black/55 dark:text-white/55">
            {product.description}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          {product.isPromo && product.promoPrice ? (
            <>
              <span className="text-sm text-black/40 line-through">
                {formatCurrencyBRL(product.price)}
              </span>
              <span className="font-display text-lg font-extrabold text-[#6A1B9A] dark:text-purple-300">
                {formatCurrencyBRL(product.promoPrice)}
              </span>
            </>
          ) : (
            <span className="font-display text-lg font-extrabold text-[#6A1B9A] dark:text-purple-300">
              {formatCurrencyBRL(product.price)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          {!isCustomizable && (
            <div className="flex items-center gap-1 rounded-full border border-black/10 px-1.5 py-1 dark:border-white/10">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-4 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <Button
            onClick={handleAdd}
            disabled={!product.active}
            size="sm"
            className="flex-1 !text-[13px]"
          >
            {isCustomizable ? "Personalizar" : "Adicionar"}
          </Button>
        </div>
      </div>

      {isCustomizable && (
        <ProductCustomizeModal
          product={product}
          toppings={toppings}
          open={showCustomize}
          onOpenChange={setShowCustomize}
        />
      )}
    </div>
  );
}