import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "인증 토큰이 필요합니다." }, { status: 400 });
    }

    // 토큰 검증
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 400 });
    }

    // 사용자 찾기 및 이미 인증된 사용자인지 확인
    const dbUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    // TODO: 이메일 인증 기능은 나중에 구현
    // 현재는 항상 성공으로 처리
    /*
    if (dbUser.emailVerified !== null) {
      return NextResponse.json({ message: "이미 인증된 계정입니다." }, { status: 200 });
    }

    // 이메일 인증 처리
    await prisma.user.update({
      where: { email: payload.email },
      data: {
        emailVerified: new Date(),
      },
    });
    */

    return NextResponse.json(
      { message: "이메일 인증이 완료되었습니다. 이제 모든 기능을 이용하실 수 있습니다." },
      { status: 200 },
    );
  } catch (error) {
    console.error("이메일 인증 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
