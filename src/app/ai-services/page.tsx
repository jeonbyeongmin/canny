import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthGuard } from "@/components/auth-guard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

export default async function AiServicesPage() {
  const user = await getCurrentUser();

  // GPT가 설정된 사용자는 원래 사용하려던 서비스로 리디렉션
  if (user?.gptConfigured) {
    redirect("/dashboard");
  }

  return (
    <AuthGuard>
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">AI 기반 뉴스레터 서비스</h1>
          <p className="text-lg text-muted-foreground">
            인공지능을 활용한 뉴스레터 생성 및 관리 서비스를 이용해보세요.
          </p>
        </div>

        <div className="grid gap-8">
          {/* OpenAI API 설정 안내 카드 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">🔑</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">API 키 설정 필요</h2>
            <p className="text-center text-muted-foreground mb-6">
              Newsify의 AI 기능을 사용하기 위해서는 OpenAI API 키 설정이 필요합니다.
              <br />한 번 설정해두면 다양한 AI 기능을 활용할 수 있습니다.
            </p>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-sm">API 키는 왜 필요한가요?</h3>
                <p className="text-sm text-muted-foreground">
                  OpenAI의 GPT 모델을 사용하여 뉴스레터를 자동 생성하고 다양한 분석 기능을 제공하기
                  위해 필요합니다. API 키는 안전하게 저장되며 서비스 이용에만 사용됩니다.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-sm">API 키는 어디서 얻을 수 있나요?</h3>
                <p className="text-sm text-muted-foreground">
                  OpenAI 공식 웹사이트에서 계정을 생성하고 API 키를 발급받을 수 있습니다.
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    OpenAI API 키 관리 페이지로 이동
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href="/settings">API 키 설정하기</Link>
              </Button>
            </div>
          </div>

          {/* 기능 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📰</span>
              </div>
              <h3 className="font-bold mb-2">자동 뉴스 요약</h3>
              <p className="text-sm text-muted-foreground">
                긴 뉴스 기사를 AI가 핵심만 추출하여 간결하게 요약해줍니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="font-bold mb-2">맞춤형 뉴스레터</h3>
              <p className="text-sm text-muted-foreground">
                관심 주제에 맞는 내용을 AI가 자동으로 생성합니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-bold mb-2">트렌드 분석</h3>
              <p className="text-sm text-muted-foreground">
                최신 트렌드와 이슈를 AI가 분석하여 인사이트를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
