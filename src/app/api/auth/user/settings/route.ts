import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    // 전체 사용자 설정 반환
    const userSettings = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        timezone: true,
        emailNewsletter: true,
        emailDigest: true,
        pushNotifications: true,
        weeklyReport: true,
        systemUpdates: true,
        language: true,
        dateFormat: true,
        timeFormat: true,
        newsletterFrequency: true,
        newsletterDeliveryTime: true,
        newsletterMaxArticles: true,
        newsletterIncludeSummary: true,
        newsletterTone: true,
        newsletterLength: true,
        newsletterFormat: true,
        openaiApiKey: true,
        gptModel: true,
        gptTemperature: true,
        gptMaxTokens: true,
        gptSystemPrompt: true,
        gptConfigured: true,
      },
    });

    return NextResponse.json(userSettings);
  } catch (error) {
    console.error("사용자 설정 조회 오류:", error);
    return NextResponse.json({ error: "설정 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const settings = await req.json();

    // 설정 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...settings,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        timezone: true,
        emailNewsletter: true,
        emailDigest: true,
        pushNotifications: true,
        weeklyReport: true,
        systemUpdates: true,
        language: true,
        dateFormat: true,
        timeFormat: true,
        newsletterFrequency: true,
        newsletterDeliveryTime: true,
        newsletterMaxArticles: true,
        newsletterIncludeSummary: true,
        newsletterTone: true,
        newsletterLength: true,
        newsletterFormat: true,
        openaiApiKey: true,
        gptModel: true,
        gptTemperature: true,
        gptMaxTokens: true,
        gptSystemPrompt: true,
        gptConfigured: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("사용자 설정 업데이트 오류:", error);
    return NextResponse.json({ error: "설정 업데이트 중 오류가 발생했습니다." }, { status: 500 });
  }
}
