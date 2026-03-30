import { NextRequest, NextResponse } from "next/server";

async function getExpectedToken(): Promise<string> {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminSecret = process.env.ADMIN_SECRET || "jacky-realestate-secret";
  const data = new TextEncoder().encode(adminPassword + adminSecret);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login/logout endpoints without auth
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout" ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  // Protect all /admin and /api/admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const sessionCookie = req.cookies.get("admin_session")?.value;
    const expected = await getExpectedToken();

    if (sessionCookie !== expected) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
