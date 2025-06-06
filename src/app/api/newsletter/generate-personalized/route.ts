import { NextResponse } from "next/server";

import { requireGptConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface UserSettingsForNewsletter {
  id: string;
  name: string;
  email: string;
  company?: string;
  timezone?: string;
  language?: string;
  newsletterTone?: string;
  newsletterLength?: string;
  newsletterFormat?: string;
  newsletterMaxArticles?: number;
  newsletterIncludeSummary?: boolean;
  openaiApiKey: string;
  gptModel?: string;
  gptTemperature?: number;
  gptMaxTokens?: number;
  gptSystemPrompt?: string;
}

interface PersonalizationData {
  userProfile: {
    name: string;
    company?: string;
    timezone?: string;
    language?: string;
  };
  preferences: {
    tone: string;
    length: string;
    format: string;
    maxArticles: number;
    includeSummary: boolean;
  };
  sources: Array<{
    name: string;
    category: string;
    description?: string;
  }>;
}

function buildPersonalizedPrompt(
  basePrompt: string,
  personalization: PersonalizationData,
  topics: string[],
  additionalInstructions?: string,
): string {
  const { userProfile, preferences, sources } = personalization;

  // 톤 설정
  const toneInstructions = {
    Casual: "친근하고 편안한 대화체로 작성해주세요. 이모지나 일상적인 표현을 사용해도 좋습니다.",
    Neutral: "전문적이면서도 읽기 쉬운 중립적인 톤으로 작성해주세요.",
    Formal: "공식적이고 전문적인 톤으로 작성해주세요. 비즈니스 환경에 적합한 언어를 사용해주세요.",
  };

  // 길이 설정
  const lengthInstructions = {
    Short: "간결하고 핵심만 담은 짧은 뉴스레터로 작성해주세요.",
    Medium: "적절한 길이로 중요한 내용을 포함한 뉴스레터로 작성해주세요.",
    Long: "상세하고 포괄적인 내용을 포함한 긴 뉴스레터로 작성해주세요.",
  };

  // 포맷 설정
  const formatInstructions = {
    Classic: "전통적인 뉴스레터 형식으로 작성해주세요.",
    Modern: "현대적이고 창의적인 형식으로 작성해주세요.",
    Digest: "요약 중심의 다이제스트 형식으로 작성해주세요.",
  };

  const personalizedPrompt = `
${basePrompt}

사용자 정보:
- 이름: ${userProfile.name}
${userProfile.company ? `- 회사/조직: ${userProfile.company}` : ""}
${userProfile.timezone ? `- 시간대: ${userProfile.timezone}` : ""}
- 언어: ${userProfile.language || "ko"}

뉴스레터 설정:
- 톤: ${preferences.tone} - ${toneInstructions[preferences.tone as keyof typeof toneInstructions]}
- 길이: ${preferences.length} - ${lengthInstructions[preferences.length as keyof typeof lengthInstructions]}
- 포맷: ${preferences.format} - ${formatInstructions[preferences.format as keyof typeof formatInstructions]}
- 최대 기사 수: ${preferences.maxArticles}개
- AI 요약 포함: ${preferences.includeSummary ? "예" : "아니오"}

관심 뉴스 소스:
${sources
  .map(
    (source) =>
      `- ${source.name} (${source.category})${source.description ? `: ${source.description}` : ""}`,
  )
  .join("\n")}

주제: ${topics.join(", ")}
${additionalInstructions ? `\n추가 지침: ${additionalInstructions}` : ""}

위의 개인화 설정을 반영하여 사용자에게 최적화된 뉴스레터를 작성해주세요.
`;

  return personalizedPrompt;
}

export async function POST(req: Request) {
  try {
    // GPT 설정이 완료된 사용자인지 확인
    const user = (await requireGptConfig()) as UserSettingsForNewsletter;

    // 요청 본문 파싱
    const { topics, additionalInstructions, usePersonalization = true } = await req.json();

    if (!topics || !topics.length) {
      return NextResponse.json({ error: "최소한 하나 이상의 주제가 필요합니다." }, { status: 400 });
    }

    // 사용자의 전체 설정 조회
    const userSettings = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        sites: {
          where: { status: "active" },
          select: {
            name: true,
            category: true,
            description: true,
          },
        },
      },
    });

    if (!userSettings) {
      return NextResponse.json({ error: "사용자 설정을 찾을 수 없습니다." }, { status: 404 });
    }

    // 개인화 데이터 구성
    const personalizationData: PersonalizationData = {
      userProfile: {
        name: userSettings.name,
        company: userSettings.company || undefined,
        timezone: userSettings.timezone || undefined,
        language: userSettings.language || "ko",
      },
      preferences: {
        tone: userSettings.newsletterTone || "Neutral",
        length: userSettings.newsletterLength || "Medium",
        format: userSettings.newsletterFormat || "Classic",
        maxArticles: userSettings.newsletterMaxArticles || 10,
        includeSummary: userSettings.newsletterIncludeSummary,
      },
      sources: userSettings.sites.map((site) => ({
        name: site.name,
        category: site.category,
        description: site.description || undefined,
      })),
    };

    // OpenAI API 설정
    const openaiApiKey = userSettings.openaiApiKey!;
    const model = userSettings.gptModel || "gpt-4";
    const temperature = userSettings.gptTemperature || 0.7;
    const maxTokens = userSettings.gptMaxTokens || 2000;

    // 시스템 프롬프트 구성
    const defaultSystemPrompt = `당신은 전문적인 뉴스레터 작성자입니다. 사용자의 개인화 설정을 고려하여 맞춤형 뉴스레터를 작성해주세요.`;
    const systemPrompt = userSettings.gptSystemPrompt || defaultSystemPrompt;

    // 사용자 메시지 구성 (개인화 적용 여부에 따라)
    let userMessage: string;

    if (usePersonalization) {
      userMessage = buildPersonalizedPrompt(
        "다음 주제에 대한 개인화된 뉴스레터를 작성해주세요:",
        personalizationData,
        topics,
        additionalInstructions,
      );
    } else {
      // 기본 메시지 (개인화 없음)
      userMessage = `
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
    }

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
        if (data.error.code === "invalid_api_key") {
          return NextResponse.json(
            { error: "OpenAI API 키가 유효하지 않습니다. 설정에서 API 키를 확인해주세요." },
            { status: 401 },
          );
        }
        if (data.error.code === "context_length_exceeded") {
          return NextResponse.json(
            { error: "요청이 너무 큽니다. 주제 수를 줄이거나 추가 지침을 간결하게 작성해주세요." },
            { status: 400 },
          );
        }
      }

      if (data.error?.type === "insufficient_quota") {
        return NextResponse.json(
          { error: "OpenAI API 사용량 한도에 도달했습니다. 결제 정보를 확인해주세요." },
          { status: 402 },
        );
      }

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

    // 제목 추출
    let title = `${topics[0]} 뉴스레터`;
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
      personalizationUsed: usePersonalization,
      settings: usePersonalization
        ? {
            tone: personalizationData.preferences.tone,
            length: personalizationData.preferences.length,
            format: personalizationData.preferences.format,
            sourcesCount: personalizationData.sources.length,
          }
        : null,
    });
  } catch (error) {
    console.error("개인화 뉴스레터 생성 오류:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "뉴스레터 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
