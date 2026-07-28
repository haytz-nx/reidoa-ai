"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBag, Clock3, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { CartItemRow } from "@/components/cart-item-row";
import { CheckoutForm } from "@/components/checkout-form";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "sonner";

export default function CarrinhoPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const { delivery, payment, changeFor } = useCheckoutStore();
  const [submitting, setSubmitting] = useState(false);

  const prepTime = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const min = Math.min(35, 20 + Math.max(0, totalItems - 2) * 2);
    const max = Math.min(40, min + 10);
    return `${min}–${max} min`;
  }, [items]);

  const handleFinish = () => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }
    if (!delivery.name || !delivery.phone || !delivery.street || !delivery.number || !delivery.neighborhood) {
      toast.error("Preencha todos os campos obrigatórios de entrega.");
      return;
    }

    setSubmitting(true);
    const message = buildOrderMessage({
      delivery,
      payment,
      changeFor,
      items,
      subtotal,
      deliveryFee: 0,
    });
    const link = buildWhatsAppLink(message);
    window.open(link, "_blank");
    toast.success("Pedido pronto! Finalize o envio no WhatsApp que abriu.");
    setTimeout(() => {
      clearCart();
      setSubmitting(false);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#6A1B9A]/10 text-4xl">
          🛒
        </div>
        <h1 className="font-display text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Explore nosso cardápio e monte o açaí perfeito para você.
        </p>
        <Link href="/cardapio" className="mt-6">
          <Button size="lg">Ver Cardápio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link href="/cardapio" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-black/60 hover:text-[#6A1B9A] dark:text-white/60">
        <ArrowLeft className="h-4 w-4" /> Continuar comprando
      </Link>

      <h1 className="mb-1 flex items-center gap-2 font-display text-3xl font-extrabold">
        <ShoppingBag className="h-7 w-7 text-[#6A1B9A]" /> Seu Carrinho
      </h1>
      <p className="mb-6 flex items-center gap-1.5 text-sm text-black/50 dark:text-white/50">
        <Clock3 className="h-4 w-4" /> Tempo estimado de preparo: {prepTime}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartItemRow key={item.cartId} item={item} />
          ))}

          <div className="hidden lg:block">
            <CheckoutForm />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1c1224]">
            <h2 className="mb-4 font-display text-lg font-bold">Resumo do Pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Subtotal</span>
                <span className="font-semibold">{formatCurrencyBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60 dark:text-white/60">Taxa de entrega</span>
                <span className="font-semibold">A combinar</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-base dark:border-white/10">
                <span className="font-display font-bold">Total</span>
                <span className="font-display font-extrabold text-[#6A1B9A] dark:text-purple-300">
                  {formatCurrencyBRL(subtotal)}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <CheckoutForm />
          </div>

          <Button
            size="lg"
            className="w-full"
            variant="whatsapp"
            onClick={handleFinish}
            disabled={submitting}
          >
            📱 {submitting ? "Enviando..." : "Finalizar Pedido"}
          </Button>
          <p className="text-center text-xs text-black/40 dark:text-white/40">
            Ao finalizar, o WhatsApp abrirá com sua mensagem de pedido pronta
            para envio.
          </p>
        </div>
      </div>
    </div>
  );
}
