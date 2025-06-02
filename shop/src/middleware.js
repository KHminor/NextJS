// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

// ✅ matcher를 여기에서 설정합니다
export const config = {
  matcher: ["/"], // 또는 ['/dashboard/:path*', '/admin/:path*']
};
