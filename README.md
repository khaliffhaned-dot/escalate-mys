# Escalate MY™ — Crisis Governance Platform

Enterprise-grade Next.js 15 application for Cloudflare Workers + D1.

## Enterprise standards applied

| Area | Standard |
|------|----------|
| Authentication | PBKDF2-SHA256 (100k), httpOnly + secure + SameSite=strict cookies, 8h session |
| Authorization | Role checks (admin / operator / viewer) on mutating endpoints |
| Tenant isolation | Every query filtered by `tenant_id` (dedicated deployment model) |
| Audit | Immutable audit_log on incident create and decision record |
| Input validation | Type, length, and enum checks on all write endpoints |
| Rate limiting | Durable Object (`RateLimiter`) — login 10/min, signal 60/min |
| Security headers | HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy on all responses |
| Error handling | Consistent `{ ok, error, code }` API responses; structured logging |
| Health check | `GET /api/health` returns DB connectivity status |
| Data sovereignty | D1 created in preferred region (recommend Singapore for Malaysia) |
| Configuration | Secrets via Cloudflare environment variables |

## Stack

- Next.js 15 App Router + React 19 + TypeScript
- OpenNext for Cloudflare
- D1 with tenant isolation
- Durable Objects (rate limiting)
- Tailwind CSS

## Features

- Landing page with crisis governance positioning
- Situation Room (Field Manual severity + SLA)
- Regulatory Clocks reference (BNM RMiT, PDPA, Bursa, etc.)
- Decision recording
- BoardBrief (print-ready)
- Signal intake webhook (`POST /api/signals`, requires `x-signal-secret`)
- Health endpoint

Demo: `demo@escalate.local` / `demo`

## Deploy

```bash
npm install
npx wrangler login

# Create D1 in preferred region (Singapore recommended)
npx wrangler d1 create escalate_db
# Paste database_id into wrangler.jsonc

npm run db:migrate:remote

# Set production secret
npx wrangler secret put SIGNAL_WEBHOOK_SECRET

# Deploy (Durable Object migration is applied automatically)
npm run deploy
```

## Local

```bash
npm install
npm run db:migrate:local
npm run dev
```

## Positioning

**Category:** Crisis Governance Platform for Malaysian Organisations

Media-intelligence platforms help organisations understand what is happening. Escalate MY helps organisations govern what happens next.
