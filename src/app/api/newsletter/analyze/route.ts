import { NextResponse } from "next/server";

import { requireGptConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // GPT 설정이 완료된 사용자인지 확인
    const user = await requireGptConfig();

    // 요청 본문 파싱
    const { newsletterId } = await req.json();

    if (!newsletterId) {
      return NextResponse.json({ error: "뉴스레터 ID가 필요합니다." }, { status: 400 });
    }

    // 뉴스레터 조회 및 권한 확인
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!newsletter) {
      return NextResponse.json({ error: "해당 뉴스레터를 찾을 수 없습니다." }, { status: 404 });
    }

    if (newsletter.userId !== user.id) {
      return NextResponse.json(
        { error: "이 뉴스레터에 대한 접근 권한이 없습니다." },
        { status: 403 },
      );
    }

    // OpenAI API 설정
    const openaiApiKey = user.openaiApiKey!;
    const model = user.gptModel || "gpt-4";
    const temperature = 0.5; // 분석은 더 낮은 온도 값으로 설정

    // 시스템 프롬프트
    const systemPrompt = `
      당신은 뉴스 콘텐츠 분석 전문가입니다. 
      제공된 뉴스레터 콘텐츠를 분석하고 다음 정보를 제공해주세요:
      
      1. 주요 주제 및 키워드 (5개)
      2. 감정 분석 (긍정/부정/중립)
      3. 주요 아이디어 요약
      4. 추가 연구할 만한 관련 주제
      5. 시간적 관련성 (시의성)
      
      결과는 JSON 형식으로 반환해주세요.
    `;

    // 사용자 메시지
    const userMessage = `
      다음 뉴스레터 콘텐츠를 분석해주세요:
      
      제목: ${newsletter.title}
      
      ${newsletter.content}
      
      다음 형식의 JSON으로 응답해주세요:
      {
        "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
        "sentiment": "긍정적" | "부정적" | "중립적",
        "summary": "주요 아이디어 요약",
        "relatedTopics": ["관련주제1", "관련주제2", "관련주제3"],
        "timeliness": "높음" | "보통" | "낮음",
        "commentary": "분석에 대한 종합적인 의견"
      }
    `;

    // OpenAI API 호출
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: temperature,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API 오류:", data);

      // 자주 발생하는 OpenAI API 오류 유형별 처리
      if (data.error?.type === "invalid_request_error") {
        if (data.error.code === "invalid_api_key") {
          return NextResponse.json(
            { error: "OpenAI API 키가 유효하지 않습니다." },
            { status: 401 },
          );
        }
      }

      return NextResponse.json(
        { error: data.error?.message || "콘텐츠 분석 중 오류가 발생했습니다." },
        { status: 500 },
      );
    }

    // 분석 결과 추출
    const analysisContent = data.choices[0]?.message?.content;

    if (!analysisContent) {
      return NextResponse.json({ error: "분석 결과를 생성하지 못했습니다." }, { status: 500 });
    }

    // JSON 파싱
    try {
      const analysisResult = JSON.parse(analysisContent);

      return NextResponse.json({
        success: true,
        analysis: analysisResult,
      });
    } catch (err) {
      console.error("JSON 파싱 오류:", err);
      return NextResponse.json({ error: "분석 결과 형식이 올바르지 않습니다." }, { status: 500 });
    }
  } catch (error) {
    console.error("콘텐츠 분석 오류:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "콘텐츠 분석 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
