import { NextRequest, NextResponse } from "next/server";

import { findUserById, verifyToken } from "@/lib/auth";
import { auth } from "@/lib/next-auth";

export async function GET(request: NextRequest) {
  try {
    // NextAuth.js 세션 확인
    const session = await auth();
    if (session?.user) {
      return NextResponse.json(
        {
          user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
          },
        },
        { status: 200 },
      );
    }

    // 기존 JWT 토큰 확인 (fallback)
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "인증되지 않았습니다." }, { status: 401 });
    }

    // 토큰 검증
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
    }

    // 사용자 정보 가져오기
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
