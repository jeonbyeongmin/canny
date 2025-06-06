import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 경로들
  const protectedPaths = ["/settings"];
  const authPaths = ["/login", "/signup", "/forgot-password"];

  // 토큰 확인 (간단하게 쿠키 존재 여부만 확인)
  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = !!token;

  // 보호된 페이지에 접근하려는 경우
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!isAuthenticated) {
      console.log("보호된 페이지 접근 차단:", pathname);
      return NextResponse.redirect(
        new URL("/login?callbackUrl=" + encodeURIComponent(pathname), request.url),
      );
    }
  }

  // 이미 로그인된 사용자가 인증 페이지에 접근하려는 경우
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (isAuthenticated) {
      console.log("인증된 사용자의 인증 페이지 접근 리다이렉트:", pathname);
      return NextResponse.redirect(new URL("/settings", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
