import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { StoreStatusBadge } from "@/components/store-status-badge";
import { Button } from "@/components/ui/button";
import { DAY_LABELS, BUSINESS_HOURS } from "@/lib/store-hours";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Rei do Açaí pelo WhatsApp ou venha nos visitar em Cerquilho - SP.",
};

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Campos+1078+Cerquilho+SP";

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8E24AA]">Contato</p>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Fale Conosco</h1>
        <div className="mt-3 flex justify-center">
          <StoreStatusBadge />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1c1224]">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-purple-300">
            <MapPin className="h-5 w-5" />
          </div>
          <h2 className="font-display font-bold">Endereço</h2>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Rua Doutor Campos, nº 1078
            <br />
            Nossa Senhora de Lourdes
            <br />
            Cerquilho - SP, CEP 18520-164
          </p>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-4 block">
            <Button variant="outline" size="sm" className="w-full">
              📍 Como Chegar
            </Button>
          </a>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1c1224]">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-purple-300">
            <Phone className="h-5 w-5" />
          </div>
          <h2 className="font-display font-bold">WhatsApp</h2>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            +55 15 99745-1969
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block"
          >
            <Button variant="whatsapp" size="sm" className="w-full">
              📱 Chamar no WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1c1224]">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#6A1B9A]" />
          <h2 className="font-display font-bold">Horário de Funcionamento</h2>
        </div>
        <ul className="divide-y divide-black/5 text-sm dark:divide-white/10">
          {DAY_LABELS.map((day, idx) => {
            const schedule = BUSINESS_HOURS[idx];
            return (
              <li key={day} className="flex justify-between py-2">
                <span className="text-black/70 dark:text-white/70">{day}</span>
                <span className="font-semibold">
                  {schedule ? `${schedule.open} - ${schedule.close}` : "Fechado"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl shadow-sm">
        <iframe
          title="Mapa Rei do Açaí"
          src="https://www.google.com/maps?q=Rua+Doutor+Campos+1078+Cerquilho+SP&output=embed"
          width="100%"
          height="320"
          loading="lazy"
          className="border-0"
        />
      </div>
    </div>
  );
}
