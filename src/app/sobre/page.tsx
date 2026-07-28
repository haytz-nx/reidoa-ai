import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { AboutSection } from "@/components/about-section";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história do Rei do Açaí em Cerquilho.",
};

export default function SobrePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#6A1B9A] py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <Image
            src="/images/logo.png"
            alt="Logo Rei do Açaí"
            width={80}
            height={80}
            className="mx-auto mb-4 h-20 w-20 rounded-full ring-4 ring-white/30"
          />
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            A doce história do Rei do Açaí
          </h1>
          <div className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" /> 4,9 · +470
            avaliações no Google
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1c1224] sm:p-10">
          <h2 className="font-display text-2xl font-bold">Nossa missão</h2>
          <p className="mt-3 leading-relaxed text-black/65 dark:text-white/65">
            Levar alegria em forma de açaí, sorvete e sobremesa para cada
            cliente de Cerquilho e região. Trabalhamos todos os dias para
            oferecer produtos frescos, atendimento rápido e um cardápio cheio
            de opções para todos os gostos — do tradicional ao mais criativo.
          </p>
          <h2 className="mt-6 font-display text-2xl font-bold">Por que nos escolher?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-black/65 dark:text-white/65">
            <li>Ingredientes selecionados e produtos preparados na hora</li>
            <li>Dezenas de combinações personalizáveis</li>
            <li>Pedido 100% online, finalizado direto pelo WhatsApp</li>
            <li>Avaliação 4,9★ com mais de 470 avaliações públicas</li>
            <li>Entrega rápida, em média de 20 a 40 minutos</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
