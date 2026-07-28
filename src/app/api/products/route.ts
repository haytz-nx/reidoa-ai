import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  const rows = await getAllProducts();
  return NextResponse.json({ ok: true, products: rows });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();

  try {
    const [created] = await db
      .insert(products)
      .values({
        slug: body.slug,
        categoryId: Number(body.categoryId),
        name: body.name,
        description: body.description ?? "",
        price: Number(body.price),
        imageUrl: body.imageUrl ?? "",
        active: body.active ?? true,
        featured: body.featured ?? false,
        isPromo: body.isPromo ?? false,
        promoPrice: body.promoPrice ? Number(body.promoPrice) : null,
        isNew: body.isNew ?? false,
        popular: body.popular ?? false,
        sortOrder: body.sortOrder ?? 0,
        customizationType: body.customizationType ?? "none",
        maxFlavors: body.maxFlavors ?? 0,
        maxToppings: body.maxToppings ?? 0,
        flavorOptions: body.flavorOptions ?? [],
        sizeOptions: body.sizeOptions ?? [],
      })
      .returning();

    return NextResponse.json({ ok: true, product: created });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erro ao criar produto." },
      { status: 400 },
    );
  }
}
