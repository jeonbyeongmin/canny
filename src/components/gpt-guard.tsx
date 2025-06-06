import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isGptConfigured } from "@/lib/auth";

interface GptGuardProps {
  children: React.ReactNode;
  redirectUrl?: string;
}

// GPT 설정이 완료된 사용자만 접근 가능하도록 하는 컴포넌트
export async function GptGuard({ children, redirectUrl = "/settings" }: GptGuardProps) {
  const isConfigured = await isGptConfigured();

  if (!isConfigured) {
    redirect(redirectUrl);
  }

  return <>{children}</>;
}

// GPT 설정 필요시 보여줄 알림 컴포넌트
export function GptRequiredNotification() {
  return (
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
  );
}
