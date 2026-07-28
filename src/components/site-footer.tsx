"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Clock, AtSign } from "lucide-react";
import { DAY_LABELS, BUSINESS_HOURS } from "@/lib/store-hours";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-16 border-t border-black/5 bg-white pb-28 pt-12 dark:border-white/5 dark:bg-[#160d1f] md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold text-[#6A1B9A] dark:text-purple-300">
            Rei do Açaí 🍧
          </h3>
          <p className="mt-3 text-sm text-black/60 dark:text-white/60">
            Açaí, sorvetes e sobremesas preparados na hora, com dezenas de
            combinações para você montar do seu jeito.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-[#6A1B9A] dark:text-white/60"
          >
            <AtSign className="h-4 w-4" /> @reidoacai
          </a>
        </div>

        <div>
          <h4 className="font-display font-semibold">Contato</h4>
          <ul className="mt-3 space-y-3 text-sm text-black/60 dark:text-white/60">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6A1B9A]" />
              Rua Doutor Campos, nº 1078 — Nossa Senhora de Lourdes, Cerquilho
              - SP, CEP 18520-164
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[#6A1B9A]" />
              <a href="https://wa.me/5515997451969" className="hover:text-[#6A1B9A]">
                +55 15 99745-1969
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#6A1B9A]" /> Horário de
            Funcionamento
          </h4>
          <ul className="mt-3 space-y-1 text-sm text-black/60 dark:text-white/60">
            {DAY_LABELS.map((day, idx) => {
              const schedule = BUSINESS_HOURS[idx];
              return (
                <li key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span>{schedule ? `${schedule.open} - ${schedule.close}` : "Fechado"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-black/5 px-4 pt-6 text-xs text-black/50 dark:border-white/5 dark:text-white/50 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Rei do Açaí. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <Link href="/politica-de-privacidade" className="hover:text-[#6A1B9A]">
            Política de Privacidade
          </Link>
          <Link href="/admin" className="hover:text-[#6A1B9A]">
            Painel Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
