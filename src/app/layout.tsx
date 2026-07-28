import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWhatsappButton } from "@/components/floating-whatsapp-button";
import { FloatingCartButton } from "@/components/floating-cart-button";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://reidoacai-cerquilho.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rei do Açaí | Cerquilho",
    template: "%s | Rei do Açaí",
  },
  description:
    "O melhor açaí de Cerquilho. Monte seu pedido online e finalize diretamente pelo WhatsApp.",
  keywords: [
    "açaí Cerquilho",
    "sorvete Cerquilho",
    "sobremesas Cerquilho",
    "Rei do Açaí",
    "açaí delivery",
  ],
  authors: [{ name: "Rei do Açaí" }],
  openGraph: {
    title: "Rei do Açaí | Cerquilho",
    description:
      "O melhor açaí de Cerquilho. Monte seu pedido online e finalize diretamente pelo WhatsApp.",
    url: siteUrl,
    siteName: "Rei do Açaí",
    images: [{ url: "/images/hero-acai.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rei do Açaí | Cerquilho",
    description:
      "O melhor açaí de Cerquilho. Monte seu pedido online e finalize diretamente pelo WhatsApp.",
    images: ["/images/hero-acai.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased bg-[#F5F5F5] dark:bg-[#120a19] text-[#1A1A1A] dark:text-[#F5F5F5]`}
      >
        <ThemeProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <FloatingCartButton />
          <FloatingWhatsappButton />
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
