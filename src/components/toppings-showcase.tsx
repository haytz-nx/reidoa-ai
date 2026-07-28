import type { Topping } from "@/lib/types";

export function ToppingsShowcase({ toppings }: { toppings: Topping[] }) {
  const groups = new Map<string, Topping[]>();
  for (const t of toppings) {
    if (!groups.has(t.group)) groups.set(t.group, []);
    groups.get(t.group)!.push(t);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#8E24AA]">
          Acompanhamentos
        </p>
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          Mais de {toppings.length} coberturas para escolher
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-black/60 dark:text-white/60">
          Monte seu açaí ou sorvete com quantas combinações quiser. É doce,
          fruta, crocante e calda — tudo para deixar do seu jeito.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from(groups.entries()).map(([group, items]) => (
          <div
            key={group}
            className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:bg-[#1c1224]"
          >
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-[#6A1B9A] dark:text-purple-300">
              {group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-[#F5F5F5] px-3 py-1 text-[13px] text-black/70 dark:bg-white/5 dark:text-white/70"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
