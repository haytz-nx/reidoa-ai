import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { toppings } from "@/db/schema";
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
  const [updated] = await db
    .update(toppings)
    .set({
      name: body.name,
      group: body.group,
      active: body.active,
      sortOrder: body.sortOrder,
    })
    .where(eq(toppings.id, Number(id)))
    .returning();

  return NextResponse.json({ ok: true, topping: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await db.delete(toppings).where(eq(toppings.id, Number(id)));
  return NextResponse.json({ ok: true });
}
