import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isLoggedIn = !!request.auth;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/api/auth");

  // TRACE LOGS
  console.log("[MIDDLEWARE TRACE]", {
    pathname,
    isLoggedIn,
    isDashboard,
    isAuthRoute,
    authUser: request.auth?.user?.email || "none",
  });

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (isAuthRoute) {
    console.log("[MIDDLEWARE TRACE] Allowing auth route");
    return response;
  }

  if (isDashboard && !isLoggedIn) {
    console.log("[MIDDLEWARE TRACE] Blocking dashboard, redirecting to /");
    const url = new URL("/", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (request.method === "POST") {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    console.log("[MIDDLEWARE TRACE] POST request audited:", { path: pathname, ip });
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|json|css|png|jpg|jpeg|svg|js|ico)))",
    "/api/:path*",
    "/dashboard/:path*",
  ],
};