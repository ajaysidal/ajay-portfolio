import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export default auth((request) => {
  const response = NextResponse.next();
  const isLoggedIn = !!request.auth;
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // SOC2 Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Dashboard Auth Gate
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Audit logging for form submissions
  if (request.method === "POST") {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    const ipHash = Buffer.from(ip).toString("base64");
    console.log({
      timestamp: new Date().toISOString(),
      ipHash,
      action: "form_submission",
      path: request.nextUrl.pathname,
    });
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|json|css|png|jpg|jpeg|svg|js|ico)))",
    "/api/:path*",
  ],
};
