export class RateLimiter {
  private storage: DurableObjectStorage;

  constructor(state: DurableObjectState) {
    this.storage = state.storage;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") || 30);
    const windowMs = Number(url.searchParams.get("window") || 60_000);
    const now = Date.now();

    const data = (await this.storage.get<{ count: number; resetAt: number }>("window")) || {
      count: 0,
      resetAt: now + windowMs,
    };

    if (now > data.resetAt) {
      data.count = 0;
      data.resetAt = now + windowMs;
    }

    if (data.count >= limit) {
      const retryAfter = Math.max(1, Math.ceil((data.resetAt - now) / 1000));
      return new Response(
        JSON.stringify({ allowed: false, retryAfter, remaining: 0 }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    data.count += 1;
    await this.storage.put("window", data);

    return new Response(
      JSON.stringify({ allowed: true, remaining: limit - data.count }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
