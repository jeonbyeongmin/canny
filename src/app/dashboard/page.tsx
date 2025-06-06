import { AuthGuard } from "@/components/auth-guard";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <AuthGuard>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">안녕하세요, {user?.name}님!</h1>
            <p className="text-muted-foreground">개인화된 뉴스레터와 최신 업데이트를 확인하세요.</p>
          </div>

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
