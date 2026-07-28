"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function FloatingWhatsappButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Olá! Vim pelo site e gostaria de saber mais sobre o cardápio 🍧",
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition hover:scale-105 md:bottom-8"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </a>
  );
}
