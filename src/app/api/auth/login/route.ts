import { NextRequest, NextResponse } from "next/server";

import { findUserByEmail, signToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 입력 검증
    if (!email || !password) {
      return NextResponse.json({ error: "이메일과 비밀번호를 입력해주세요." }, { status: 400 });
    }

    // 사용자 찾기
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 잘못되었습니다." },
        { status: 401 },
      );
    }

    // 소셜 로그인 사용자인지 확인 (password가 없는 경우)
    if (!user.password) {
      return NextResponse.json(
        { error: "소셜 로그인으로 가입된 계정입니다. 소셜 로그인을 이용해주세요." },
        { status: 401 },
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 잘못되었습니다." },
        { status: 401 },
      );
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
        message: "로그인되었습니다.",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 },
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
    console.error("로그인 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
