import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SECURITY_HEADERS } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, string> = { status: "ok", timestamp: new Date().toISOString() };

  try {
    const db = await getDb();
    await db.prepare("SELECT 1").first();
    checks.database = "ok";
  } catch {
    checks.database = "unavailable";
    checks.status = "degraded";
  }

  const status = checks.status === "ok" ? 200 : 503;
  const res = NextResponse.json(checks, { status });
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}
