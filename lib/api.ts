import { NextResponse } from "next/server";
import { SECURITY_HEADERS } from "./security";

export function ok<T extends Record<string, unknown>>(data: T, status = 200) {
  const res = NextResponse.json({ ok: true, ...data }, { status });
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export function fail(error: string, status = 400, code?: string) {
  const res = NextResponse.json({ ok: false, error, code }, { status });
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export function unauthorized(msg = "Unauthorized") {
  return fail(msg, 401, "UNAUTHORIZED");
}

export function forbidden(msg = "Forbidden") {
  return fail(msg, 403, "FORBIDDEN");
}

export function notFound(msg = "Not found") {
  return fail(msg, 404, "NOT_FOUND");
}

export function serverError(msg = "Internal error") {
  return fail(msg, 500, "INTERNAL");
}
