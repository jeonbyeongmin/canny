import { NextRequest, NextResponse } from "next/server";

import { createUser, findUserByEmail, signToken } from "@/lib/auth";
import { generateEmailVerificationEmail, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // 간단한 유효성 검사
    if (!name || !email || !password) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "유효한 이메일 주소를 입력해주세요." }, { status: 400 });
    }

    // 패스워드 길이 검사
    if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 },
      );
    }

    // 이미 존재하는 사용자인지 확인
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "이미 가입된 이메일 주소입니다." }, { status: 400 });
    }

    // 사용자 생성 (패스워드 해싱은 createUser 함수에서 처리)
    const user = await createUser(name, email, password);

    // 이메일 인증 토큰 생성
    const verificationToken = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // 이메일 인증 메일 발송
    try {
      const { html, text } = generateEmailVerificationEmail(user.name, verificationToken);
      await sendEmail({
        to: user.email,
        subject: "[Canny] 이메일 인증을 완료해 주세요",
        html,
        text,
      });
      console.log(`이메일 인증 메일 발송 성공: ${user.email}`);
    } catch (emailError) {
      console.error("이메일 인증 메일 발송 실패:", emailError);
      // 이메일 발송 실패 시에도 회원가입은 진행되지만 알림
    }

    // JWT 토큰 생성
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // 쿠키에 토큰 설정
    const response = NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 },
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
