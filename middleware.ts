import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isValidToken = token && token !== "undefined" && token.length > 10;

  const path = req.nextUrl.pathname;
  const isPublicPage =
    path.startsWith("/login") || path.startsWith("/register");

  if (!isValidToken && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isValidToken && isPublicPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
