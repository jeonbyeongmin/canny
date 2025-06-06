import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 인증 확인
    await requireAuth();

    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API 키가 필요합니다." }, { status: 400 });
    }

    // OpenAI API 테스트 (간단한 모델 목록 조회)
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.error?.message || "OpenAI API 연결 테스트 실패",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "OpenAI API 연결이 성공적으로 확인되었습니다.",
    });
  } catch (error) {
    console.error("API 연결 테스트 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "API 연결 테스트 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
