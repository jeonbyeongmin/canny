import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "로그아웃되었습니다." }, { status: 200 });

    // 쿠키 삭제 (더 확실한 방법)
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
