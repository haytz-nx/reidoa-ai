import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidToken } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return NextResponse.json({ ok: isValidToken(token) });
}
