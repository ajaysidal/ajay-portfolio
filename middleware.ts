import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0];

  // Subdomain routing: dashboard.buildwithai.digital -> internal /dashboard
  if (host === "dashboard.buildwithai.digital") {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/dashboard")) {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Exclude static assets, API routes, and CMS admin from rewriting
export const config = {
  matcher: ["/((?!_next/|favicon.ico|api/|admin|.*\\..*).*)"],
};
