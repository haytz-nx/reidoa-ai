export const CATEGORY_IMAGES: Record<string, string> = {
  garrafas: "/images/garrafa-acai.jpg",
  "monte-copo": "/images/hero-acai.jpg",
  "monte-acai-sorvete": "/images/hero-acai.jpg",
  "copo-400": "/images/hero-acai.jpg",
  "copo-500": "/images/hero-acai.jpg",
  "zero-acucar": "/images/hero-acai.jpg",
  vitaminas: "/images/hero-acai.jpg",
  milkshakes: "/images/milkshake.jpg",
  bandejas: "/images/hero-acai.jpg",
  fondue: "/images/fondue.jpg",
  "promo-dia": "/images/hero-acai.jpg",
  sobremesas: "/images/sobremesas.jpg",
  picoles: "/images/picole.jpg",
  extras: "/images/picole.jpg",
};

export function getProductImage(
  imageUrl: string | null | undefined,
  categorySlug: string | undefined,
): string {
  if (imageUrl && imageUrl.trim().length > 0) return imageUrl;
  return CATEGORY_IMAGES[categorySlug ?? ""] ?? "/images/hero-acai.jpg";
}
