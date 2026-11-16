import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Admin route checks
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Caregiver portal checks
    if (path.startsWith("/caregiver-portal") && token?.role !== "CAREGIVER") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. User account checks
    // Users must be authenticated to access /account (handled by authorized callback below)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/caregiver-portal/:path*",
    "/account/:path*",
  ],
};
