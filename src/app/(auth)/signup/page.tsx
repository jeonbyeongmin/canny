"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError("서비스 약관에 동의해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signup(formData.name, formData.email, formData.password);

      if (result.success) {
        // 회원가입 성공 시 설정 페이지로 리다이렉트
        router.push("/settings");
      } else {
        setError(result.error || "회원가입에 실패했습니다.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "회원가입에 실패했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
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
            <h1 className="text-2xl font-bold text-foreground">회원가입</h1>
            <p className="text-muted-foreground text-sm mt-2">
              개인화된 뉴스레터 경험을 시작하세요
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                이름
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="홍길동"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">최소 8자 이상의 비밀번호를 입력하세요</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                비밀번호 확인
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="h-11"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(!!checked)}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                <Link href="/terms" className="text-primary hover:underline">
                  서비스 약관
                </Link>
                과{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  개인정보 처리방침
                </Link>
                에 동의합니다
              </Label>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </form>

          {/* 링크들 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
