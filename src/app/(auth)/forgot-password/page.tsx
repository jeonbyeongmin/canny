"use client";

import React, { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: 실제 비밀번호 재설정 API 호출
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || "요청 처리에 실패했습니다.");
      }
    } catch (error) {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>

            <h1 className="text-xl font-bold text-foreground mb-4">이메일을 확인하세요</h1>
            <p className="text-muted-foreground text-sm mb-6">
              비밀번호 재설정 링크를 <strong>{email}</strong>로 발송했습니다. 이메일을 확인하고
              안내에 따라 비밀번호를 재설정해주세요.
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">로그인 페이지로 돌아가기</Link>
              </Button>

              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                다른 이메일로 다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="size-12 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 mb-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <g clipPath="url(#clip0_6_543)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM24 8C19.5817 8 16 11.5817 16 16C16 20.4183 19.5817 24 24 24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8ZM24 40C18.4772 40 14 35.5228 14 30V28C14 25.7909 15.7909 24 18 24H30C32.2091 24 34 25.7909 34 28V30C34 35.5228 29.5228 40 24 40Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">비밀번호 재설정</h1>
            <p className="text-muted-foreground text-sm mt-2">
              가입하신 이메일 주소를 입력해주세요
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일 주소
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "전송 중..." : "재설정 링크 전송"}
            </Button>
          </form>

          {/* 링크 */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← 로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
