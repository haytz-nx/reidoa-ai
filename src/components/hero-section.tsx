"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock3, MapPin } from "lucide-react";
import { StoreStatusBadge } from "@/components/store-status-badge";
import { Button } from "@/components/ui/button";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Doutor+Campos+1078+Cerquilho+SP";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#6A1B9A] via-[#6A1B9A] to-[#8E24AA]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-fuchsia-300 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="animate-fade-up text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <StoreStatusBadge className="bg-white/15 text-white [&>span]:bg-white" />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold">
              <Clock3 className="h-4 w-4" /> 20–40 min
            </span>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo Rei do Açaí"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full shadow-lg ring-4 ring-white/30"
              priority
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-white/80">
                Rei do Açaí · Cerquilho
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                4,9 · +470 avaliações
              </div>
            </div>
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
            O melhor açaí de Cerquilho.
          </h1>
          <p className="mt-4 max-w-md text-base text-white/85 sm:text-lg">
            Açaí, sorvetes e sobremesas montados na hora, do seu jeito. Peça
            online e receba rapidinho em casa.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cardapio">
              <Button size="lg" variant="secondary" className="!bg-white !text-[#6A1B9A] hover:!bg-white/90">
                🟣 Fazer Pedido
              </Button>
            </Link>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="!border-white !text-white hover:!bg-white/10">
                <MapPin className="h-5 w-5" /> Como Chegar
              </Button>
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-2xl ring-8 ring-white/10">
            <Image
              src="/images/hero-acai.jpg"
              alt="Açaí cremoso do Rei do Açaí"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl dark:bg-[#1c1224] sm:-bottom-6">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-display font-bold text-[#6A1B9A] dark:text-purple-300">
                  🍧 Promoção do Dia
                </p>
                <p className="text-black/60 dark:text-white/60">
                  2 Copos de 400ml por R$ 44,90
                </p>
              </div>
              <Link
                href="/promocoes"
                className="shrink-0 rounded-full bg-[#6A1B9A]/10 px-3 py-1.5 text-xs font-bold text-[#6A1B9A] dark:text-purple-300"
              >
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
