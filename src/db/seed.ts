import "dotenv/config";
import { db, pool } from "@/db";
import { categories, products, toppings } from "@/db/schema";
import type { SizeOption } from "@/db/schema";

type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  isPromo?: boolean;
  isNew?: boolean;
  popular?: boolean;
  featured?: boolean;
  imageUrl?: string;
  customizationType?: "none" | "flavors_toppings" | "size_flavors_toppings";
  maxFlavors?: number;
  maxToppings?: number;
  flavorOptions?: string[];
  sizeOptions?: SizeOption[];
};

const ACAI_SORVETE_FLAVORS = [
  "Açaí Tradicional",
  "Açaí Zero Açúcar",
  "Chocolate",
  "Baunilha",
  "Flocos",
  "Morango",
  "Ninho",
  "Ovomaltine",
  "Doce de Leite",
  "Uva",
  "Coco",
  "Sensação",
  "Sonho de Valsa",
];

const CATEGORY_SEED: Array<{
  slug: string;
  name: string;
  description: string;
  icon: string;
  products: SeedProduct[];
}> = [
  {
    slug: "garrafas",
    name: "Açaí na Garrafa",
    description: "Garrafas geladas de 500ml, prontas para levar.",
    icon: "🍾",
    products: [
      { slug: "garrafa-1", name: "Garrafa 1", price: 1999, description: "Açaí, leite em pó e leite condensado" },
      { slug: "garrafa-2", name: "Garrafa 2", price: 2299, description: "Açaí, creme de avelã, leite condensado e leite em pó" },
      { slug: "garrafa-3", name: "Garrafa 3", price: 2299, description: "Açaí, creme de ninho, leite condensado e leite em pó" },
      { slug: "garrafa-4", name: "Garrafa 4", price: 2299, description: "Açaí, creme de Ovomaltine, leite condensado e leite em pó" },
      { slug: "garrafa-5", name: "Garrafa 5", price: 2299, description: "Açaí, creme de amendoim, leite condensado e leite em pó" },
      { slug: "garrafa-6", name: "Garrafa 6", price: 2299, description: "Açaí, trufa ao leite, leite condensado e leite em pó" },
      { slug: "garrafa-7", name: "Garrafa 7", price: 2299, description: "Açaí, creme de avelã, farofa de paçoca e leite em pó" },
      { slug: "garrafa-8", name: "Garrafa 8", price: 2299, description: "Açaí, creme de ninho, farinha láctea e leite em pó" },
      { slug: "garrafa-9", name: "Garrafa 9", price: 2499, description: "Açaí, creme de Ovomaltine, Ovomaltine em flocos e leite condensado", popular: true },
      { slug: "garrafa-10", name: "Garrafa 10", price: 2299, description: "Açaí, doce de leite e leite em pó" },
      { slug: "garrafa-11", name: "Garrafa 11", price: 2299, description: "Açaí, creme de ninho, amendoim granulado e leite em pó" },
      { slug: "garrafa-12", name: "Garrafa 12", price: 2299, description: "Açaí, leite condensado, leite em pó e amendoim granulado" },
      { slug: "garrafa-13", name: "Garrafa 13", price: 2599, description: "Açaí de morango, leite em pó e whey", isNew: true },
      { slug: "garrafa-14", name: "Garrafa 14", price: 2499, description: "Açaí de morango, leite em pó e aveia", isNew: true },
      {
        slug: "monte-sua-garrafa",
        name: "Monte sua Garrafa",
        price: 2599,
        description: "Monte com os acompanhamentos desejados",
        customizationType: "flavors_toppings",
        maxFlavors: 0,
        maxToppings: 4,
        featured: true,
      },
    ],
  },
  {
    slug: "monte-copo",
    name: "Personalize seu Copo",
    description: "Copo de 400ml montado do seu jeito.",
    icon: "🥤",
    products: [
      {
        slug: "monte-seu-copo-400",
        name: "Monte seu Copo (400ml)",
        price: 3390,
        description: "Monte como desejar com diversos acompanhamentos",
        customizationType: "flavors_toppings",
        maxFlavors: 3,
        maxToppings: 5,
        flavorOptions: ACAI_SORVETE_FLAVORS,
        featured: true,
        popular: true,
      },
    ],
  },
  {
    slug: "monte-acai-sorvete",
    name: "Monte seu Açaí ou Sorvete",
    description: "Escolha o tamanho e monte com seus sabores e acompanhamentos favoritos.",
    icon: "🍨",
    products: [
      { slug: "monte-pequeno-300g", name: "Pequeno (300g)", price: 3199, description: "Até 3 sabores + 3 acompanhamentos", customizationType: "flavors_toppings", maxFlavors: 3, maxToppings: 3, flavorOptions: ACAI_SORVETE_FLAVORS },
      { slug: "monte-medio-400g", name: "Médio (400g)", price: 3399, description: "Até 3 sabores + 4 acompanhamentos", customizationType: "flavors_toppings", maxFlavors: 3, maxToppings: 4, flavorOptions: ACAI_SORVETE_FLAVORS, popular: true },
      { slug: "monte-grande-500g", name: "Grande (500g)", price: 3999, description: "Até 4 sabores + 5 acompanhamentos", customizationType: "flavors_toppings", maxFlavors: 4, maxToppings: 5, flavorOptions: ACAI_SORVETE_FLAVORS, featured: true },
      { slug: "monte-extra-grande-1kg", name: "Extra Grande (1kg)", price: 6990, description: "Até 4 sabores + 5 acompanhamentos", customizationType: "flavors_toppings", maxFlavors: 4, maxToppings: 5, flavorOptions: ACAI_SORVETE_FLAVORS },
    ],
  },
  {
    slug: "copo-400",
    name: "Açaí no Copo (400ml)",
    description: "Combinações prontas, geladinhas e cremosas.",
    icon: "🍓",
    products: [
      { slug: "avela-banana-400", name: "Avelã com Banana", price: 3090, description: "Açaí, creme de avelã, banana, leite em pó e leite condensado" },
      { slug: "avela-morango-400", name: "Avelã com Morango", price: 3090, description: "Açaí, creme de avelã, morango, leite em pó e leite condensado" },
      { slug: "avela-uva-400", name: "Avelã com Uva", price: 3090, description: "Açaí, creme de avelã, uva, leite em pó e leite condensado" },
      { slug: "ninho-banana-400", name: "Ninho com Banana", price: 3090, description: "Açaí, creme de ninho, banana, leite em pó e leite condensado" },
      { slug: "ninho-morango-400", name: "Ninho com Morango", price: 3090, description: "Açaí, creme de ninho, morango, leite em pó e leite condensado", popular: true },
      { slug: "ninho-uva-400", name: "Ninho com Uva", price: 3090, description: "Açaí, creme de ninho, uva, leite em pó e leite condensado" },
    ],
  },
  {
    slug: "copo-500",
    name: "Açaí no Copo (500ml)",
    description: "As mesmas combinações queridinhas, em versão maior.",
    icon: "🍓",
    products: [
      { slug: "avela-banana-500", name: "Avelã com Banana", price: 3390, description: "Açaí, creme de avelã, banana, leite em pó e leite condensado" },
      { slug: "avela-morango-500", name: "Avelã com Morango", price: 3390, description: "Açaí, creme de avelã, morango, leite em pó e leite condensado" },
      { slug: "avela-uva-500", name: "Avelã com Uva", price: 3390, description: "Açaí, creme de avelã, uva, leite em pó e leite condensado" },
      { slug: "ninho-banana-500", name: "Ninho com Banana", price: 3390, description: "Açaí, creme de ninho, banana, leite em pó e leite condensado" },
      { slug: "ninho-morango-500", name: "Ninho com Morango", price: 3390, description: "Açaí, creme de ninho, morango, leite em pó e leite condensado" },
      { slug: "ninho-uva-500", name: "Ninho com Uva", price: 3390, description: "Açaí, creme de ninho, uva, leite em pó e leite condensado" },
    ],
  },
  {
    slug: "zero-acucar",
    name: "Linha Zero Açúcar",
    description: "Sabor completo, sem adição de açúcar.",
    icon: "🍃",
    products: [
      { slug: "acai-zero-banana", name: "Copo de Açaí Zero + Banana", price: 3199, description: "Açaí zero açúcar com banana fresca" },
      { slug: "acai-zero-morango", name: "Copo de Açaí Zero + Morango", price: 3199, description: "Açaí zero açúcar com morango fresco" },
      { slug: "acai-zero-granola-banana", name: "Copo de Açaí Zero + Granola + Banana", price: 3199, description: "Açaí zero açúcar, granola crocante e banana" },
      { slug: "acai-zero-granola-morango", name: "Copo de Açaí Zero + Granola + Morango", price: 3199, description: "Açaí zero açúcar, granola crocante e morango" },
      { slug: "milkshake-ninho-zero", name: "Milk Shake Ninho Zero", price: 2790, description: "Milk shake cremoso sabor ninho, zero açúcar" },
      { slug: "milkshake-chocolate-zero", name: "Milk Shake Chocolate Zero", price: 2790, description: "Milk shake cremoso de chocolate, zero açúcar" },
      { slug: "vitamina-zero-morango", name: "Vitamina Zero com Morango", price: 2790, description: "Vitamina de morango, zero açúcar" },
      { slug: "vitamina-zero-banana", name: "Vitamina Zero com Banana", price: 2790, description: "Vitamina de banana, zero açúcar" },
    ],
  },
  {
    slug: "vitaminas",
    name: "Vitaminas de Açaí",
    description: "Vitaminas geladas de 500ml, nutritivas e saborosas.",
    icon: "🥤",
    products: [
      { slug: "vitamina-morango", name: "Morango", price: 2599, description: "Vitamina de açaí com morango" },
      { slug: "vitamina-banana", name: "Banana", price: 2599, description: "Vitamina de açaí com banana" },
      { slug: "vitamina-abacaxi", name: "Abacaxi", price: 2599, description: "Vitamina de açaí com abacaxi" },
      { slug: "vitamina-mel-granola", name: "Mel + Granola", price: 2599, description: "Vitamina de açaí com mel e granola" },
      { slug: "vitamina-aveia-mel", name: "Aveia + Mel", price: 2599, description: "Vitamina de açaí com aveia e mel" },
      { slug: "vitamina-whey-morango", name: "Whey Morango", price: 2699, description: "Vitamina de açaí com whey protein e morango", isNew: true },
      { slug: "vitamina-condensado-morango", name: "Leite Condensado + Morango", price: 2599, description: "Vitamina de açaí com leite condensado e morango" },
      { slug: "vitamina-condensado-banana", name: "Leite Condensado + Banana", price: 2599, description: "Vitamina de açaí com leite condensado e banana" },
    ],
  },
  {
    slug: "milkshakes",
    name: "Milk Shakes",
    description: "Milk shakes cremosos de 400ml em 16 sabores.",
    icon: "🥤",
    products: [
      "Morango", "Chocolate", "Ovomaltine", "Ninho", "Flocos", "Ferrero Rocher",
      "Uva", "Moça Trufado", "Sonho de Valsa", "Blue Ice", "Laka", "Pistache",
      "Ninho com Morango", "Ninho com Avelã", "Prestígio", "Doce de Leite",
    ].map((flavor) => ({
      slug: `milkshake-${flavor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`,
      name: `Milk Shake ${flavor}`,
      price: 2590,
      description: `Milk shake cremoso sabor ${flavor.toLowerCase()}`,
    })),
  },
  {
    slug: "bandejas",
    name: "Bandeja Açaí ou Sorvete",
    description: "Bandejas para compartilhar em família.",
    icon: "📦",
    products: [
      {
        slug: "bandeja-1kg-leve-1-5kg",
        name: "Bandeja Promocional — Compre 1kg e Leve 1,5kg",
        price: 7190,
        description: "Escolha entre Açaí Natural, Ninho ou Trufado (ou Natural, Banana, Morango) e sorvetes: Morango, Chocolate, Flocos, Ninho, Ninho Trufado, Sonho de Valsa, Sensação ou Ovomaltine.",
        isPromo: true,
        featured: true,
        customizationType: "flavors_toppings",
        maxFlavors: 3,
        maxToppings: 0,
        flavorOptions: [
          "Açaí Natural", "Açaí Ninho", "Açaí Trufado", "Açaí Banana", "Açaí Morango",
          "Sorvete Morango", "Sorvete Chocolate", "Sorvete Flocos", "Sorvete Ninho",
          "Sorvete Ninho Trufado", "Sorvete Sonho de Valsa", "Sorvete Sensação", "Sorvete Ovomaltine",
        ],
      },
    ],
  },
  {
    slug: "fondue",
    name: "Fondue",
    description: "Fondue de chocolate com frutas frescas.",
    icon: "🍫",
    products: [
      { slug: "fondue-individual", name: "Fondue Individual (400ml)", price: 2390, description: "Acompanha frutas com chocolate" },
      { slug: "fondue-medio", name: "Fondue Médio (550g)", price: 3290, description: "Acompanha frutas com chocolate", popular: true },
    ],
  },
  {
    slug: "promo-dia",
    name: "Promoção do Dia",
    description: "Ofertas especiais por tempo limitado.",
    icon: "🔥",
    products: [
      {
        slug: "promo-2-copos-400",
        name: "2 Copos de 400ml",
        price: 4490,
        description: "Acompanha: açaí, leite em pó, leite condensado, banana e amendoim granulado",
        isPromo: true,
        featured: true,
      },
    ],
  },
  {
    slug: "sobremesas",
    name: "Sobremesas",
    description: "Doces irresistíveis para fechar com chave de ouro.",
    icon: "🍰",
    products: [
      { slug: "petit-gateau", name: "Petit Gateau", price: 2699, description: "Bolo quente com recheio cremoso de chocolate e sorvete", popular: true },
      { slug: "brownie", name: "Brownie", price: 2699, description: "Acompanha 1 fatia de brownie, 1 bola de sorvete, 1 fruta e 1 calda" },
      {
        slug: "copo-da-felicidade",
        name: "Copo da Felicidade",
        price: 2999,
        description: "Escolha um sabor: Kinder Bueno, Suflair, Brownie ou Bis",
        customizationType: "flavors_toppings",
        maxFlavors: 1,
        maxToppings: 0,
        flavorOptions: ["Kinder Bueno", "Suflair", "Brownie", "Bis"],
        featured: true,
      },
    ],
  },
  {
    slug: "picoles",
    name: "Picolés",
    description: "Refrescantes e cremosos, para todos os gostos.",
    icon: "🍦",
    products: [
      { slug: "picole-abacaxi", name: "Picolé de Abacaxi", price: 600, description: "Picolé de fruta" },
      { slug: "picole-limao", name: "Picolé de Limão", price: 600, description: "Picolé de fruta" },
      { slug: "picole-maracuja", name: "Picolé de Maracujá", price: 600, description: "Picolé de fruta" },
      { slug: "picole-uva", name: "Picolé de Uva", price: 600, description: "Picolé de fruta" },
      { slug: "picole-abacaxi-suico", name: "Picolé Abacaxi Suíço", price: 650, description: "Picolé de fruta com leite" },
      { slug: "picole-coco", name: "Picolé de Coco", price: 650, description: "Picolé de fruta com leite" },
      { slug: "picole-limao-suico", name: "Picolé Limão Suíço", price: 650, description: "Picolé de fruta com leite" },
      { slug: "picole-morango", name: "Picolé de Morango", price: 650, description: "Picolé de fruta com leite" },
      { slug: "picole-chocolate", name: "Picolé de Chocolate", price: 700, description: "Picolé especial" },
      { slug: "picole-doce-leite", name: "Picolé de Doce de Leite", price: 700, description: "Picolé especial" },
      { slug: "picole-leitinho", name: "Picolé Leitinho", price: 700, description: "Picolé especial" },
      { slug: "picole-leite-condensado", name: "Picolé de Leite Condensado", price: 700, description: "Picolé especial" },
      { slug: "picole-milho-verde", name: "Picolé de Milho Verde", price: 700, description: "Picolé especial" },
    ],
  },
  {
    slug: "extras",
    name: "Acompanhamentos Extras",
    description: "Para completar seu pedido.",
    icon: "🍦",
    products: [
      { slug: "casquinha", name: "Casquinha (Cestinha)", price: 300, description: "Casquinha crocante" },
      { slug: "cascao", name: "Cascão (Cone Grande)", price: 300, description: "Cone grande crocante" },
    ],
  },
];

const TOPPINGS_SEED: Array<{ name: string; group: string }> = [
  { name: "Granola", group: "Crocantes" },
  { name: "Castanhas", group: "Crocantes" },
  { name: "Amendoim", group: "Crocantes" },
  { name: "Amendoim granulado", group: "Crocantes" },
  { name: "Coco ralado", group: "Crocantes" },
  { name: "Leite em pó", group: "Cremes e Doces" },
  { name: "Leite condensado", group: "Cremes e Doces" },
  { name: "Nutella", group: "Cremes e Doces" },
  { name: "Paçoca", group: "Cremes e Doces" },
  { name: "Ovomaltine", group: "Cremes e Doces" },
  { name: "Chocolate", group: "Cremes e Doces" },
  { name: "Granulado", group: "Cremes e Doces" },
  { name: "Confete", group: "Cremes e Doces" },
  { name: "Marshmallow", group: "Cremes e Doces" },
  { name: "Chantilly", group: "Cremes e Doces" },
  { name: "Doce de leite", group: "Cremes e Doces" },
  { name: "Banana", group: "Frutas" },
  { name: "Morango", group: "Frutas" },
  { name: "Kiwi", group: "Frutas" },
  { name: "Uva", group: "Frutas" },
  { name: "Abacaxi", group: "Frutas" },
  { name: "Manga", group: "Frutas" },
  { name: "Calda de chocolate", group: "Caldas" },
  { name: "Calda de caramelo", group: "Caldas" },
  { name: "Calda de morango", group: "Caldas" },
];

async function main() {
  console.log("Seeding database...");
  await db.delete(products);
  await db.delete(categories);
  await db.delete(toppings);

  for (let ci = 0; ci < CATEGORY_SEED.length; ci++) {
    const cat = CATEGORY_SEED[ci];
    const [inserted] = await db
      .insert(categories)
      .values({
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        sortOrder: ci,
      })
      .returning();

    for (let pi = 0; pi < cat.products.length; pi++) {
      const p = cat.products[pi];
      await db.insert(products).values({
        slug: p.slug,
        categoryId: inserted.id,
        name: p.name,
        description: p.description,
        price: p.price,
        promoPrice: p.promoPrice ?? null,
        imageUrl: p.imageUrl ?? "",
        isPromo: p.isPromo ?? false,
        isNew: p.isNew ?? false,
        popular: p.popular ?? false,
        featured: p.featured ?? false,
        sortOrder: pi,
        customizationType: p.customizationType ?? "none",
        maxFlavors: p.maxFlavors ?? 0,
        maxToppings: p.maxToppings ?? 0,
        flavorOptions: p.flavorOptions ?? [],
        sizeOptions: p.sizeOptions ?? [],
      });
    }
  }

  for (let ti = 0; ti < TOPPINGS_SEED.length; ti++) {
    const t = TOPPINGS_SEED[ti];
    await db.insert(toppings).values({
      name: t.name,
      group: t.group,
      sortOrder: ti,
    });
  }

  console.log("Seed completed.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
