import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "reidoacai_admin_session";

export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "reidoacai2024";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "rei-do-acai-secret";
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "reidoacai2024";
  return password === expected;
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  return token === getExpectedToken();
}
