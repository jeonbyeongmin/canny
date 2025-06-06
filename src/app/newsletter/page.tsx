import Link from "next/link";

import { Button } from "@/components/ui/button";
import { requireGptConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function NewsletterListPage() {
  // GPT 설정이 필요한 페이지
  const user = await requireGptConfig();

  // 사용자의 뉴스레터 목록 조회
  const newsletters = await prisma.newsletter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 미리보기 텍스트 생성 함수
  const createPreview = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">내 뉴스레터</h1>
          <p className="text-muted-foreground">AI로 생성된 뉴스레터 목록입니다.</p>
        </div>
        <Button asChild>
          <Link href="/newsletter/create">새 뉴스레터 작성</Link>
        </Button>
      </div>

      {newsletters.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg bg-muted/50">
          <p className="text-muted-foreground mb-4">아직 작성된 뉴스레터가 없습니다.</p>
          <Button asChild>
            <Link href="/newsletter/create">첫 뉴스레터 작성하기</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  AI 분석 기능
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                  <p>
                    각 뉴스레터 페이지에서 AI 분석 기능을 사용하여 콘텐츠의 주요 키워드, 감정,
                    시의성 등을 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="border border-border rounded-lg p-6 hover:bg-accent/10 transition-colors"
              >
                <Link href={`/newsletter/${newsletter.id}`} className="block">
                  <h2 className="text-xl font-semibold mb-2">{newsletter.title}</h2>
                  <div className="text-xs text-muted-foreground mb-3">
                    <span>작성일: {formatDate(newsletter.createdAt)}</span>
                    {newsletter.topics && (
                      <>
                        <span className="mx-2">•</span>
                        <span>주제: {newsletter.topics}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {createPreview(newsletter.content)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
