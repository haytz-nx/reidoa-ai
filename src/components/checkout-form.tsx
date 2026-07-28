"use client";

import { useCheckoutStore } from "@/store/checkout-store";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "pix", label: "Pix", icon: "💠" },
  { id: "dinheiro", label: "Dinheiro", icon: "💵" },
  { id: "credito", label: "Cartão de Crédito", icon: "💳" },
  { id: "debito", label: "Cartão de Débito", icon: "💳" },
];

export function CheckoutForm() {
  const { delivery, setDelivery, payment, setPayment, changeFor, setChangeFor } =
    useCheckoutStore();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1c1224]">
        <h2 className="mb-4 font-display text-lg font-bold">📍 Dados de Entrega</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Nome completo"
            value={delivery.name}
            onChange={(e) => setDelivery({ name: e.target.value })}
            required
          />
          <Input
            placeholder="Telefone / WhatsApp"
            value={delivery.phone}
            onChange={(e) => setDelivery({ phone: e.target.value })}
            required
          />
          <Input
            placeholder="Rua"
            className="sm:col-span-2"
            value={delivery.street}
            onChange={(e) => setDelivery({ street: e.target.value })}
            required
          />
          <Input
            placeholder="Número"
            value={delivery.number}
            onChange={(e) => setDelivery({ number: e.target.value })}
            required
          />
          <Input
            placeholder="Complemento (opcional)"
            value={delivery.complement}
            onChange={(e) => setDelivery({ complement: e.target.value })}
          />
          <Input
            placeholder="Bairro"
            value={delivery.neighborhood}
            onChange={(e) => setDelivery({ neighborhood: e.target.value })}
            required
          />
          <Input
            placeholder="Ponto de referência (opcional)"
            value={delivery.reference}
            onChange={(e) => setDelivery({ reference: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1c1224]">
        <h2 className="mb-4 font-display text-lg font-bold">💰 Pagamento</h2>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPayment(opt.id)}
              className={cn(
                "flex items-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition",
                payment === opt.id
                  ? "border-[#6A1B9A] bg-[#6A1B9A]/10 text-[#6A1B9A]"
                  : "border-black/10 text-black/70 dark:border-white/10 dark:text-white/70",
              )}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {payment === "dinheiro" && (
          <div className="mt-4">
            <Input
              placeholder="Troco para (ex: R$ 50,00)"
              value={changeFor}
              onChange={(e) => setChangeFor(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
