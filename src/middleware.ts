// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // ✅ Get the current route path
  const pathname = req.nextUrl.pathname;

  console.log("Current pathname:", pathname);

  // Example: protect certain routes
  const isPublic = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname === "/" || (pathname.startsWith("/blog")&& !pathname.endsWith("/update"))

  const token = req.cookies.get("token")?.value;

  if (!isPublic && !token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // apply to all routes except static files
};
