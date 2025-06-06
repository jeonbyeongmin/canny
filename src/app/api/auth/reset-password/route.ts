import { NextRequest, NextResponse } from "next/server";

import { updateUserPassword, verifyPasswordResetToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    // 입력 검증
    if (!token || !newPassword) {
      return NextResponse.json({ error: "토큰과 새 비밀번호를 입력해주세요." }, { status: 400 });
    }

    // 패스워드 길이 검사
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 },
      );
    }

    // 토큰 검증
    const email = await verifyPasswordResetToken(token);
    if (!email) {
      return NextResponse.json({ error: "유효하지 않거나 만료된 토큰입니다." }, { status: 400 });
    }

    // 비밀번호 업데이트
    await updateUserPassword(email, newPassword);

    return NextResponse.json({ message: "비밀번호가 성공적으로 변경되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("비밀번호 재설정 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
