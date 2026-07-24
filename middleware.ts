// Runs before any /admin request. If there's no session cookie, send the
// visitor to the login page. (The real token check happens server-side in
// the admin pages and Server Actions; this is the fast redirect gate.)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const hasSession = req.cookies.has("admin_session");

  if (!isLoginPage && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
