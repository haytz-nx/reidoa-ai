"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-lg dark:bg-[#160d1f]/85 dark:border-white/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <Image
            src="/images/logo.png"
            alt="Rei do Açaí"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="text-[#6A1B9A] dark:text-purple-300">
            Rei do Açaí
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[#6A1B9A]/10 hover:text-[#6A1B9A]",
                pathname === link.href
                  ? "bg-[#6A1B9A]/10 text-[#6A1B9A]"
                  : "text-black/70 dark:text-white/70",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Alternar tema"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 sm:flex"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </button>

          <Link
            href="/carrinho"
            className="relative hidden h-10 items-center gap-2 rounded-full bg-[#6A1B9A] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#59148a] sm:flex"
          >
            🛒 Ver Carrinho
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 py-3 dark:bg-[#160d1f] dark:border-white/5 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium",
                  pathname === link.href
                    ? "bg-[#6A1B9A]/10 text-[#6A1B9A]"
                    : "text-black/80 dark:text-white/80",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/carrinho"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#6A1B9A] px-4 py-3 text-base font-semibold text-white"
            >
              🛒 Ver Carrinho {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-base font-medium dark:border-white/10"
            >
              <Sun className="h-5 w-5 dark:hidden" /> <Moon className="hidden h-5 w-5 dark:block" />
              Alternar tema
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
