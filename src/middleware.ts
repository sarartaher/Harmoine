import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedPaths = ["/account"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (isProtected) {
    // Better Auth stores session in a cookie
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      // Redirect to sign-in with callback URL
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
