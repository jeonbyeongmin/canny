import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  // 인증이 필요한 경로들
  const protectedPaths = ["/settings"];

  // 인증된 사용자가 접근하면 안 되는 경로들 (로그인, 회원가입 등)
  const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];

  // 보호된 경로에 접근하려는 경우
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 이미 인증된 사용자가 인증 페이지에 접근하려는 경우
  if (authPaths.some((path) => pathname.startsWith(path)) && token) {
    // 설정 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/settings", request.url));
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
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
