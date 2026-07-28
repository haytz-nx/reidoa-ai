import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidToken } from "@/lib/admin-auth";

export function requireAdmin(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }
  return null;
}
