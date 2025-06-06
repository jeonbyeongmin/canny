import { NextRequest, NextResponse } from "next/server";

import { findUserByEmail } from "@/lib/auth";

// TODO: 실제 구현 시 이메일 서비스와 연동해야 합니다.
// 현재는 기본 구조만 제공합니다.

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // 입력 검증
    if (!email) {
      return NextResponse.json({ error: "이메일을 입력해주세요." }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "유효한 이메일 주소를 입력해주세요." }, { status: 400 });
    }

    // 사용자 확인
    const user = findUserByEmail(email);

    // 보안상 사용자 존재 여부와 관계없이 동일한 응답 반환
    // 실제로는 사용자가 존재할 경우에만 비밀번호 재설정 이메일 발송
    if (user) {
      // TODO: 실제로는 여기서 비밀번호 재설정 이메일을 발송
      console.log(`비밀번호 재설정 이메일 발송: ${email}`);
    }

    return NextResponse.json(
      {
        message: "비밀번호 재설정 링크가 이메일로 발송되었습니다. 이메일을 확인해주세요.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("비밀번호 재설정 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
