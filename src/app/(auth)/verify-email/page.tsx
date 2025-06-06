"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("인증 토큰이 없습니다.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
          // 3초 후 로그인 페이지로 리다이렉트
          setTimeout(() => {
            router.push("/login?message=이메일 인증이 완료되었습니다. 로그인해주세요.");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "인증에 실패했습니다.");
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("error");
        setMessage("서버 오류가 발생했습니다.");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
          {/* 로고 */}
          <div className="size-16 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-3 mb-6">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-full h-full"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4ZM24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z"
                fill="currentColor"
              />
              <path
                d="M20 24L22 26L28 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">이메일 인증</h1>

          {status === "loading" && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">이메일을 인증하고 있습니다...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <p className="text-foreground">{message}</p>
              <p className="text-sm text-muted-foreground">잠시 후 로그인 페이지로 이동합니다...</p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="text-red-600 text-4xl mb-4">✗</div>
              <p className="text-destructive">{message}</p>
              <div className="pt-4 space-y-2">
                <Link
                  href="/login"
                  className="inline-block w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
                >
                  로그인 페이지로 이동
                </Link>
                <Link
                  href="/signup"
                  className="inline-block w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-lg transition-colors"
                >
                  다시 회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
