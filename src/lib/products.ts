import { db } from "@/db";
import { categories, products, toppings } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import type { Category, Product, Topping } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const rows = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder));
  return rows;
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await db
    .select({
      id: products.id,
      slug: products.slug,
      categoryId: products.categoryId,
      categorySlug: categories.slug,
      categoryName: categories.name,
      name: products.name,
      description: products.description,
      price: products.price,
      imageUrl: products.imageUrl,
      active: products.active,
      featured: products.featured,
      isPromo: products.isPromo,
      promoPrice: products.promoPrice,
      isNew: products.isNew,
      popular: products.popular,
      sortOrder: products.sortOrder,
      customizationType: products.customizationType,
      maxFlavors: products.maxFlavors,
      maxToppings: products.maxToppings,
      flavorOptions: products.flavorOptions,
      sizeOptions: products.sizeOptions,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(asc(categories.sortOrder), asc(products.sortOrder));

  return rows.map((row) => ({
    ...row,
    categorySlug: row.categorySlug ?? "",
    categoryName: row.categoryName ?? "",
    flavorOptions: (row.flavorOptions as string[]) ?? [],
    sizeOptions: (row.sizeOptions as Product["sizeOptions"]) ?? [],
    customizationType:
      (row.customizationType as Product["customizationType"]) ?? "none",
  }));
}

export async function getActiveProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.active);
}

export async function getActiveToppings(): Promise<Topping[]> {
  const rows = await db
    .select()
    .from(toppings)
    .where(eq(toppings.active, true))
    .orderBy(asc(toppings.sortOrder));
  return rows;
}

export async function getAllToppings(): Promise<Topping[]> {
  const rows = await db.select().from(toppings).orderBy(asc(toppings.sortOrder));
  return rows;
}
