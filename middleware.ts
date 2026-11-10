import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SECURITY_HEADERS } from "./lib/security";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = request.nextUrl.pathname === "/login";

  let res: NextResponse;

  if (isProtected && !token) {
    res = NextResponse.redirect(new URL("/login", request.url));
  } else if (isLogin && token) {
    res = NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    res = NextResponse.next();
  }

  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
