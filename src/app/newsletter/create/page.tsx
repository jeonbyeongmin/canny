"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNewsletterPage() {
  const router = useRouter();
  const [topics, setTopics] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const topicArray = topics
      .split(",")
      .map((topic) => topic.trim())
      .filter((topic) => topic);

    if (topicArray.length === 0) {
      setError("최소 하나 이상의 주제를 입력해주세요.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topics: topicArray,
          additionalInstructions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // HTTP 상태 코드에 따른 다양한 에러 메시지
        const errorMessages = {
          401: "API 키가 유효하지 않습니다. 설정에서 API 키를 확인해주세요.",
          402: "OpenAI API 사용량 한도에 도달했습니다. 결제 정보를 확인해주세요.",
          400: "요청이 올바르지 않습니다. 주제를 수정하거나 지침을 간결하게 작성해보세요.",
          429: "너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.",
          500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        };

        const statusMessage = errorMessages[response.status as keyof typeof errorMessages];
        throw new Error(data.error || statusMessage || "뉴스레터 생성 중 오류가 발생했습니다.");
      }

      // 생성된 뉴스레터 페이지로 리다이렉트
      router.push(`/newsletter/${data.newsletter.id}`);
    } catch (error) {
      console.error("뉴스레터 생성 오류:", error);
      setError(error instanceof Error ? error.message : "뉴스레터 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">새 뉴스레터 작성</h1>
        <p className="text-muted-foreground">
          AI를 활용하여 뉴스레터를 자동으로 생성해보세요. 원하는 주제와 추가 지침을 입력하시면
          됩니다.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">생성 오류</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topics">주제 (쉼표로 구분)</Label>
          <Input
            id="topics"
            placeholder="기술, AI, 생산성, 경제 등"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            disabled={isGenerating}
            required
          />
          <p className="text-xs text-muted-foreground">
            최소 하나 이상의 주제를 입력하세요. 여러 주제는 쉼표로 구분합니다.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">추가 지침 (선택사항)</Label>
          <Textarea
            id="instructions"
            placeholder="예: 최근 트렌드 중심으로 작성해주세요. 최대한 실용적인 정보를 포함해주세요."
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
            disabled={isGenerating}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            AI에게 뉴스레터 작성 방향에 대한 추가 지침을 제공할 수 있습니다.
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">GPT 모델 정보</h3>
          <p className="text-xs text-muted-foreground mb-1">
            <span className="font-medium">모델:</span> 설정에서 지정한 GPT 모델이 사용됩니다.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">토큰 제한:</span> 뉴스레터 길이는 설정된 최대 토큰 수에
            따라 제한됩니다.
          </p>
        </div>

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" className="text-white" />
              <span>생성 중...</span>
            </span>
          ) : (
            "뉴스레터 생성"
          )}
        </Button>
      </form>
    </div>
  );
}
