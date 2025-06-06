import { NextRequest, NextResponse } from "next/server";

import { createPasswordResetToken, findUserByEmail } from "@/lib/auth";
import { generatePasswordResetEmail, sendEmail } from "@/lib/email";

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
    const user = await findUserByEmail(email);

    // 보안상 사용자 존재 여부와 관계없이 동일한 응답 반환
    if (user) {
      try {
        // 비밀번호 재설정 토큰 생성
        const resetToken = await createPasswordResetToken(email);

        // 이메일 내용 생성
        const { html, text } = generatePasswordResetEmail(user.name, resetToken);

        // 이메일 발송
        await sendEmail({
          to: email,
          subject: "[Canny] 비밀번호 재설정 링크",
          html,
          text,
        });

        console.log(`비밀번호 재설정 이메일 발송 성공: ${email}`);
      } catch (emailError) {
        console.error("이메일 발송 실패:", emailError);
        // 이메일 발송 실패 시에도 보안상 동일한 응답 반환
      }
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
