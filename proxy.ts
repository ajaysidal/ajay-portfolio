import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isLoggedIn = !!request.auth;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/api/auth") || pathname === "/signin";

  // Allow auth routes and the custom signin page to pass through
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // PROTECT DASHBOARD: Redirect unauthenticated users to /signin with callback
  if (isDashboard && !isLoggedIn) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Add SOC2 security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot))*)",
    "/api/:path*",
    "/dashboard/:path*",
  ],
};
