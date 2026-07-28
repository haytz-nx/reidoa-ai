import { formatCurrencyBRL } from "@/lib/utils";
import type { CartItem, DeliveryInfo, PaymentMethod } from "@/lib/types";

export const WHATSAPP_NUMBER = "5515997451969";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  credito: "Cartão de Crédito",
  debito: "Cartão de Débito",
};

export function paymentLabel(method: PaymentMethod): string {
  return PAYMENT_LABELS[method];
}

const DIVIDER = "━━━━━━━━━━";

export function buildOrderMessage({
  delivery,
  payment,
  changeFor,
  items,
  subtotal,
  deliveryFee,
}: {
  delivery: DeliveryInfo;
  payment: PaymentMethod;
  changeFor?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
}): string {
  const lines: string[] = [];

  lines.push("🍧 *NOVO PEDIDO* — Rei do Açaí");
  lines.push(DIVIDER);
  lines.push(`*Nome:* ${delivery.name}`);
  lines.push(`*Telefone:* ${delivery.phone}`);
  lines.push(`*Endereço:* ${delivery.street}`);
  lines.push(`*Número:* ${delivery.number}`);
  if (delivery.complement) lines.push(`*Complemento:* ${delivery.complement}`);
  lines.push(`*Bairro:* ${delivery.neighborhood}`);
  if (delivery.reference) lines.push(`*Referência:* ${delivery.reference}`);
  lines.push(`*Pagamento:* ${paymentLabel(payment)}`);
  if (payment === "dinheiro" && changeFor) {
    lines.push(`*Troco para:* R$ ${changeFor}`);
  }
  lines.push(DIVIDER);
  lines.push("*Pedido*");
  for (const item of items) {
    lines.push(`${item.quantity}x ${item.name}${item.size ? ` (${item.size.label})` : ""}`);
    if (item.flavors.length) {
      for (const flavor of item.flavors) lines.push(`   • ${flavor}`);
    }
    if (item.toppings.length) {
      for (const topping of item.toppings) lines.push(`   • ${topping}`);
    }
    if (item.notes) {
      lines.push(`   _Obs: ${item.notes}_`);
    }
  }
  lines.push(DIVIDER);
  lines.push("*Subtotal*");
  lines.push(formatCurrencyBRL(subtotal));
  if (deliveryFee > 0) {
    lines.push("*Taxa de entrega*");
    lines.push(formatCurrencyBRL(deliveryFee));
  }
  lines.push(DIVIDER);
  lines.push("*Total*");
  lines.push(formatCurrencyBRL(subtotal + deliveryFee));
  lines.push(DIVIDER);
  lines.push("Mensagem pronta para envio ✅");

  return lines.join("\n");
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
