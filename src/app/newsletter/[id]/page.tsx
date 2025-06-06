import { marked } from "marked";

import Link from "next/link";
import { notFound } from "next/navigation";

import NewsletterAnalysis from "@/components/newsletter-analysis";
import { Button } from "@/components/ui/button";
import { requireGptConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface NewsletterPageProps {
  params: {
    id: string;
  };
}

export default async function NewsletterPage({ params }: NewsletterPageProps) {
  // GPT 설정이 필요한 페이지
  await requireGptConfig();

  // 뉴스레터 조회
  const newsletter = await prisma.newsletter.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!newsletter) {
    notFound();
  }

  // 날짜 포맷팅
  const formattedDate = new Date(newsletter.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 마크다운 처리
  const htmlContent = marked(newsletter.content);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{newsletter.title}</h1>
          <div className="text-sm text-muted-foreground">
            <span>작성자: {newsletter.user.name}</span>
            <span className="mx-2">•</span>
            <span>작성일: {formattedDate}</span>
            {newsletter.topics && (
              <>
                <span className="mx-2">•</span>
                <span>주제: {newsletter.topics}</span>
              </>
            )}
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/newsletter">목록으로</Link>
        </Button>
      </div>

      {/* 뉴스레터 내용 (마크다운 형식) */}
      <div className="bg-card border border-border rounded-lg p-8 mb-8 prose prose-zinc dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none">
        {/* 마크다운을 HTML로 변환하여 표시 */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/newsletter">다른 뉴스레터 보기</Link>
        </Button>
        <Button asChild>
          <Link href="/newsletter/create">새 뉴스레터 작성</Link>
        </Button>
      </div>

      {/* 뉴스레터 분석 컴포넌트 */}
      <NewsletterAnalysis newsletterId={params.id} />
    </div>
  );
}
