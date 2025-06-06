import { NextResponse } from "next/server";

import { requireAuth, updateGptSettings } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 인증 확인
    const user = await requireAuth();

    // 요청 본문 파싱
    const { openaiApiKey, gptModel, gptTemperature, gptMaxTokens, gptSystemPrompt } =
      await req.json();

    // API 키가 없다면 오류 반환
    if (!openaiApiKey) {
      return NextResponse.json({ error: "OpenAI API 키가 필요합니다." }, { status: 400 });
    }

    // 사용자 GPT 설정 업데이트
    const updatedUser = await updateGptSettings(user.id, {
      openaiApiKey,
      gptModel,
      gptTemperature,
      gptMaxTokens,
      gptSystemPrompt,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        gptConfigured: updatedUser.gptConfigured,
      },
    });
  } catch (error) {
    console.error("GPT 설정 저장 오류:", error);
    return NextResponse.json({ error: "GPT 설정 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
