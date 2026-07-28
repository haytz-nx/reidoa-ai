import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { asc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(categories).orderBy(asc(categories.sortOrder));
  return NextResponse.json({ ok: true, categories: rows });
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const [created] = await db
    .insert(categories)
    .values({
      slug: body.slug,
      name: body.name,
      description: body.description ?? "",
      icon: body.icon ?? "🍧",
      sortOrder: body.sortOrder ?? 0,
    })
    .returning();

  return NextResponse.json({ ok: true, category: created });
}
