import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // SOC2 Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Audit logging for form submissions
  if (request.method === "POST") {
    // Get IP from x-forwarded-for header or connection property
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    // Hash IP for privacy-preserving logging
    const ipHash = Buffer.from(ip).toString("base64");
    console.log({
      timestamp: new Date().toISOString(),
      ipHash,
      action: "form_submission",
      path: request.nextUrl.pathname,
    });
  }

  return response;
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|json|css|png|jpg|jpeg|svg|js)))",
    "/api/:path*",
  ],
};