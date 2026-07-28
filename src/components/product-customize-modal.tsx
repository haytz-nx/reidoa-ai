"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { formatCurrencyBRL, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product, Topping } from "@/lib/types";
import { toast } from "sonner";

export function ProductCustomizeModal({
  product,
  toppings,
  open,
  onOpenChange,
}: {
  product: Product;
  toppings: Topping[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [size, setSize] = useState(product.sizeOptions[0] ?? null);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Garante que o portal só monta no cliente (necessário para SSR do Next.js)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloqueia o scroll do body quando o modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fecha ao pressionar Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const groupedToppings = useMemo(() => {
    const groups: Record<string, Topping[]> = {};
    for (const t of toppings) {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    }
    return groups;
  }, [toppings]);

  const basePrice = product.isPromo && product.promoPrice ? product.promoPrice : product.price;
  const unitPrice = basePrice + (size?.priceDelta ?? 0);

  const toggleFlavor = (flavor: string) => {
    setFlavors((prev) => {
      if (prev.includes(flavor)) return prev.filter((f) => f !== flavor);
      if (product.maxFlavors > 0 && prev.length >= product.maxFlavors) {
        toast.warning(`Você pode escolher até ${product.maxFlavors} sabor(es).`);
        return prev;
      }
      return [...prev, flavor];
    });
  };

  const toggleTopping = (name: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(name)) return prev.filter((t) => t !== name);
      if (product.maxToppings > 0 && prev.length >= product.maxToppings) {
        toast.warning(`Você pode escolher até ${product.maxToppings} acompanhamento(s).`);
        return prev;
      }
      return [...prev, name];
    });
  };

  const handleConfirm = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.imageUrl,
      basePrice,
      unitPrice,
      quantity,
      size,
      flavors,
      toppings: selectedToppings,
      notes,
    });
    toast.success("Adicionado ao carrinho! 🍧");
    onOpenChange(false);
    setFlavors([]);
    setSelectedToppings([]);
    setNotes("");
    setQuantity(1);
  };

  // Não renderiza nada se o modal está fechado ou ainda não montou no cliente
  if (!mounted || !open) return null;

  // Renderiza diretamente no document.body via portal,
  // escapando qualquer overflow:hidden ou transform de elementos pai
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        // Fecha ao clicar no backdrop (fundo escuro), não no conteúdo
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-3xl bg-white shadow-2xl dark:bg-[#1c1224] sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/10">
          <div>
            <h3 className="font-display text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-black/50 dark:text-white/50">{formatCurrencyBRL(basePrice)}</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {product.description && (
            <p className="mb-4 text-sm text-black/60 dark:text-white/60">{product.description}</p>
          )}

          {product.sizeOptions.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
                Tamanho
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSize(opt)}
                    className={cn(
                      "rounded-xl border-2 px-4 py-2 text-sm font-medium transition",
                      size?.id === opt.id
                        ? "border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A]"
                        : "border-black/10 dark:border-white/10",
                    )}
                  >
                    {opt.label}
                    {opt.priceDelta > 0 ? ` (+${formatCurrencyBRL(opt.priceDelta)})` : ""}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.flavorOptions.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-2 flex items-center justify-between font-display text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
                <span>Sabores</span>
                <span className="text-xs font-normal normal-case text-black/40 dark:text-white/40">
                  {flavors.length}/{product.maxFlavors || "∞"} selecionados
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.flavorOptions.map((flavor) => {
                  const active = flavors.includes(flavor);
                  return (
                    <button
                      key={flavor}
                      onClick={() => toggleFlavor(flavor)}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm transition",
                        active
                          ? "border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A]"
                          : "border-black/10 dark:border-white/10",
                      )}
                    >
                      {flavor}
                      {active && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.maxToppings > 0 && (
            <div className="mb-5">
              <h4 className="mb-2 flex items-center justify-between font-display text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
                <span>Acompanhamentos</span>
                <span className="text-xs font-normal normal-case text-black/40 dark:text-white/40">
                  {selectedToppings.length}/{product.maxToppings} selecionados
                </span>
              </h4>
              {Object.entries(groupedToppings).map(([group, items]) => (
                <div key={group} className="mb-3">
                  <p className="mb-1.5 text-xs font-semibold text-black/40 dark:text-white/40">{group}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {items.map((topping) => {
                      const active = selectedToppings.includes(topping.name);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => toggleTopping(topping.name)}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm transition",
                            active
                              ? "border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A]"
                              : "border-black/10 dark:border-white/10",
                          )}
                        >
                          {topping.name}
                          {active && <Check className="h-4 w-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
              Observações
            </h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem açúcar, capricha na cobertura..."
              rows={2}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-black/5 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3 rounded-full border border-black/10 px-2 py-1 dark:border-white/10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button onClick={handleConfirm} size="lg" className="flex-1">
            Adicionar · {formatCurrencyBRL(unitPrice * quantity)}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
