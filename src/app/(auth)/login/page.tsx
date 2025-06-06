"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const message = searchParams.get("message");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.success) {
        router.push(callbackUrl);
      } else {
        setError(result.error || "로그인에 실패했습니다.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "로그인에 실패했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* 로고 */}
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
            <h1 className="text-2xl font-bold text-foreground">로그인</h1>
            <p className="text-muted-foreground text-sm mt-2">
              계정에 로그인하여 뉴스레터를 시작하세요
            </p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm p-3 rounded-lg">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          {/* 링크들 */}
          <div className="mt-6 text-center space-y-4">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              비밀번호를 잊으셨나요?
            </Link>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  회원가입
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
