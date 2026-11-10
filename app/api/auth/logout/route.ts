import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("session")?.value;
    if (token) {
      const db = await getDb();
      await db.prepare("DELETE FROM sessions WHERE id = ?").bind(token).run();
    }
  } catch {
    // ignore
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", "", { maxAge: 0, path: "/", httpOnly: true, secure: true });
  return res;
}
