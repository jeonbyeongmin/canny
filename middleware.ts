import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  // 인증이 필요한 경로들
  const protectedPaths = ["/settings", "/dashboard"];

  // AI/GPT 설정이 필요한 경로들 - 모든 인증된 사용자를 일단 안내 페이지로 리디렉트
  // 실제 GPT 설정 여부는 ai-services 페이지 내에서 확인
  const gptProtectedPaths = ["/newsletter", "/analytics", "/ai-content"];

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

  // GPT 설정이 필요한 경로 체크
  if (gptProtectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 인증된 사용자는 일단 AI 서비스 안내 페이지로 리디렉션
    // ai-services 페이지에서 서버 컴포넌트를 통해 GPT 설정 여부를 확인하고 처리
    return NextResponse.redirect(new URL("/ai-services", request.url));
  }

  // 이미 인증된 사용자가 인증 페이지에 접근하려는 경우
  if (authPaths.some((path) => pathname.startsWith(path)) && token) {
    // 설정 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/settings", request.url));
  }

  // Add pathname to headers for server components
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  return response;
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
