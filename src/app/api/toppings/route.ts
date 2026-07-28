import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { toppings } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { asc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(toppings).orderBy(asc(toppings.sortOrder));
  return NextResponse.json({ ok: true, toppings: rows });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const [created] = await db
    .insert(toppings)
    .values({
      name: body.name,
      group: body.group ?? "Coberturas",
      active: body.active ?? true,
      sortOrder: body.sortOrder ?? 0,
    })
    .returning();

  return NextResponse.json({ ok: true, topping: created });
}
