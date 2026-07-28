import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = await request.json();

  try {
    const [updated] = await db
      .update(products)
      .set({
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
        updatedAt: new Date(),
      })
      .where(eq(products.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, product: updated });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erro ao atualizar produto." },
      { status: 400 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(products)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(products.id, Number(id)))
    .returning();

  return NextResponse.json({ ok: true, product: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await db.delete(products).where(eq(products.id, Number(id)));
  return NextResponse.json({ ok: true });
}
