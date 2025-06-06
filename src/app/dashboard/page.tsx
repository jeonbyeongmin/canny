import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AuthGuard>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">안녕하세요, {user.name}님!</h1>
            <p className="text-muted-foreground">개인화된 뉴스레터와 최신 업데이트를 확인하세요.</p>
          </div>

          {/* GPT 설정 알림 */}
          {!user.gptConfigured && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    OpenAI API 키 설정 필요
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                    <p>Newsify의 AI 기반 기능을 사용하기 위해 OpenAI API 키 설정이 필요합니다.</p>
                  </div>
                  <div className="mt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link href="/settings">GPT 설정하러 가기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">구독한 뉴스레터</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">+0 이번 주</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">읽은 기사</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">+0 이번 주</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">GPT 요약</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">+0 이번 주</p>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
            <div className="text-center py-8 text-muted-foreground">
              <p>아직 활동이 없습니다.</p>
              <p className="text-sm">뉴스레터를 구독하고 첫 번째 활동을 시작해보세요!</p>
            </div>
          </div>

          {/* AI 기능 */}
          {user.gptConfigured && (
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">AI 기능</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <h3 className="font-medium mb-2">뉴스레터 생성</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI를 활용하여 기본 뉴스레터를 빠르게 생성해보세요.
                  </p>
                  <Link
                    href="/newsletter/create"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    뉴스레터 생성하기 →
                  </Link>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <h3 className="font-medium mb-2">🎯 개인화 뉴스레터</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    당신의 설정과 관심사를 바탕으로 맞춤형 뉴스레터를 생성합니다.
                  </p>
                  <Link
                    href="/newsletter/personalized"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    개인화 생성하기 →
                  </Link>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <h3 className="font-medium mb-2">콘텐츠 분석</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    GPT로 뉴스 콘텐츠를 분석하고 트렌드와 인사이트를 얻어보세요.
                  </p>
                  <Link
                    href="/newsletter"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    뉴스레터 목록 보기 →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 추천 기능 */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">추천 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">뉴스레터 구독</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  관심 있는 주제의 뉴스레터를 구독하고 개인화된 콘텐츠를 받아보세요.
                </p>
                <a
                  href="/settings?tab=newsletter"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  구독하기 →
                </a>
              </div>
              <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <h3 className="font-medium mb-2">GPT 연동</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  개인 GPT를 연동하여 뉴스 요약과 맞춤형 분석을 받아보세요.
                </p>
                <a
                  href="/settings?tab=gpt"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  연동하기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
