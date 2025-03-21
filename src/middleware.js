import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/", "/edit"];
  const isPathProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  const isAuthPath =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const token = await getToken({ req: request });

  if (isPathProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/edit/:path*"],
};
