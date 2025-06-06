import { NextResponse } from "next/server";

import { requireGptConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // GPT 설정이 완료된 사용자인지 확인 (없으면 /settings로 리디렉션됨)
    const user = await requireGptConfig();

    // 요청 본문 파싱
    const { topics, additionalInstructions } = await req.json();

    if (!topics || !topics.length) {
      return NextResponse.json({ error: "최소한 하나 이상의 주제가 필요합니다." }, { status: 400 });
    }

    // 실제 OpenAI API 호출을 위한 데이터 준비
    const openaiApiKey = user.openaiApiKey!; // requireGptConfig 함수로 인해 null이 아님이 보장됨
    const model = user.gptModel || "gpt-4";
    const temperature = user.gptTemperature || 0.7;
    const maxTokens = user.gptMaxTokens || 2000;

    // 시스템 프롬프트 구성 (기본값 + 사용자 정의)
    const defaultSystemPrompt = `당신은 전문적인 뉴스레터 작성자입니다. 다음 주제에 대한 간결하고 흥미로운 뉴스레터를 작성해주세요.`;
    const systemPrompt = user.gptSystemPrompt || defaultSystemPrompt;

    // 사용자 메시지 구성
    const userMessage = `
      다음 주제에 대한 뉴스레터를 작성해주세요:
      ${topics.join(", ")}
      
      추가 지침: ${additionalInstructions || "없음"}
      
      결과는 다음 형식으로 작성해주세요:
      
      # [뉴스레터 제목]
      
      ## 주요 내용
      
      [주요 내용 요약]
      
      ## 세부 내용
      
      [세부 내용 - 마크다운 형식 지원]
      
      ## 결론
      
      [결론 및 요약]
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
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API 오류:", data);

      // 자주 발생하는 OpenAI API 오류 유형별 처리
      if (data.error?.type === "invalid_request_error") {
        // API 키 관련 문제
        if (data.error.code === "invalid_api_key") {
          return NextResponse.json(
            { error: "OpenAI API 키가 유효하지 않습니다. 설정에서 API 키를 확인해주세요." },
            { status: 401 },
          );
        }
        // 토큰 한도 초과
        if (data.error.code === "context_length_exceeded") {
          return NextResponse.json(
            { error: "요청이 너무 큽니다. 주제 수를 줄이거나 추가 지침을 간결하게 작성해주세요." },
            { status: 400 },
          );
        }
      }

      // 할당량 초과
      if (data.error?.type === "insufficient_quota") {
        return NextResponse.json(
          { error: "OpenAI API 사용량 한도에 도달했습니다. 결제 정보를 확인해주세요." },
          { status: 402 },
        );
      }

      // 기본 오류
      return NextResponse.json(
        { error: data.error?.message || "뉴스레터 생성 중 오류가 발생했습니다." },
        { status: 500 },
      );
    }

    // 생성된 뉴스레터 내용 추출
    const generatedContent = data.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json({ error: "뉴스레터 내용을 생성하지 못했습니다." }, { status: 500 });
    }

    // 생성된 뉴스레터에서 제목 추출
    let title = `${topics[0]} 뉴스레터`;

    // 제목 추출 시도 (마크다운 형식의 제목에서)
    const titleMatch = generatedContent.match(/^#\s+(.*?)$/m);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1];
    }

    // 생성된 뉴스레터 저장
    const newsletter = await prisma.newsletter.create({
      data: {
        title: title,
        content: generatedContent,
        userId: user.id,
        topics: topics.join(", "),
      },
    });

    return NextResponse.json({
      success: true,
      newsletter: {
        id: newsletter.id,
        title: newsletter.title,
        content: newsletter.content,
        createdAt: newsletter.createdAt,
      },
    });
  } catch (error) {
    console.error("뉴스레터 생성 오류:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "뉴스레터 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
