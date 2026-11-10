import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext();
  if (!env.DB) throw new Error("D1 binding DB not available");
  return env.DB;
}

export async function getSession(token: string | undefined) {
  if (!token) return null;
  const db = await getDb();
  const row = await db
    .prepare(
      `SELECT s.id, s.user_id, s.tenant_id, u.email, u.role
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.id = ? AND s.expires_at > datetime('now')`
    )
    .bind(token)
    .first<{ id: string; user_id: string; tenant_id: string; email: string; role: string }>();
  return row ?? null;
}
