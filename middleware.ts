import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_HOST = "dashboard.buildwithai.digital";
const MAIN_ORIGIN = "https://buildwithai.digital";
const SIGNIN_PATH = "/api/auth/signin";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0];
  const pathname = request.nextUrl.pathname;

  // Always pass through: auth endpoints, Next.js internals, static assets
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Only apply dashboard subdomain logic
  if (host !== DASHBOARD_HOST) {
    return NextResponse.next();
  }

  // Detect session via cookie presence
  const hasSession =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");

  if (!hasSession) {
    // No session: redirect to MAIN login with callbackUrl back to dashboard
    // This BREAKS the loop by leaving the subdomain entirely
    const callbackUrl = `${MAIN_ORIGIN}/dashboard`; // Or use the full dashboard URL
    const signinUrl = `${MAIN_ORIGIN}${SIGNIN_PATH}?callbackUrl=${encodeURIComponent("https://dashboard.buildwithai.digital/")}`;
    return NextResponse.redirect(signinUrl, 302);
  }

  // Session present: rewrite root "/" to "/dashboard"
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  // Any other non-asset path on dashboard host also rewrites to /dashboard
  // (Dashboard app handles its own routing from /dashboard/*)
  if (!pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};