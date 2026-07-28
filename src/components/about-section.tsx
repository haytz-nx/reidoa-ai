import { Sparkles, Leaf, Timer, Star } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Sparkles, title: "Feito na hora", desc: "Cada pedido é montado fresquinho, do seu jeito." },
  { icon: Leaf, title: "Ingredientes selecionados", desc: "Frutas frescas e coberturas de primeira linha." },
  { icon: Timer, title: "Entrega rápida", desc: "Pedido pronto em 20 a 40 minutos." },
  { icon: Star, title: "Nota 4,9", desc: "Mais de 470 avaliações de clientes satisfeitos." },
];

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#8E24AA]">
            Sobre nós
          </p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Uma paixão por açaí, sorvetes e sobremesas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/65 dark:text-white/65">
            O <strong>Rei do Açaí</strong> oferece açaís, sorvetes e
            sobremesas preparados na hora, com dezenas de combinações para
            você montar exatamente do seu jeito. Aqui em Cerquilho, somos
            referência em qualidade, sabor e agilidade — sempre com
            ingredientes selecionados e muito carinho em cada copo.
          </p>
          <p className="mt-3 text-base leading-relaxed text-black/65 dark:text-white/65">
            Desde garrafas recheadas até bandejas para compartilhar, temos a
            opção perfeita para qualquer momento do seu dia.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:bg-[#1c1224]"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6A1B9A]/10 text-[#6A1B9A] dark:text-purple-300">
                <h.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-sm font-bold">{h.title}</p>
              <p className="mt-1 text-[13px] text-black/55 dark:text-white/55">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
