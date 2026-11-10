import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; retryAfter?: number; remaining?: number }> {
  try {
    const { env } = await getCloudflareContext();
    const ns = (env as any).RATE_LIMITER as DurableObjectNamespace | undefined;
    if (!ns) return { allowed: true };
    const id = ns.idFromName(key);
    const stub = ns.get(id);
    const res = await stub.fetch(`https://limiter/?limit=${limit}&window=${windowMs}`);
    return await res.json();
  } catch (err) {
    console.error("[rate-limit]", err);
    return { allowed: false, retryAfter: 60 };
  }
}
