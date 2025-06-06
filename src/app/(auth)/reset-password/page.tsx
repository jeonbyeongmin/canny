"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) {
      setError("유효하지 않은 재설정 링크입니다.");
    }
  }, [token]);

  const validateField = (name: string, value: string) => {
    const errors = { ...validationErrors };

    switch (name) {
      case "newPassword":
        errors.newPassword =
          value && value.length < 8 ? "비밀번호는 최소 8자 이상이어야 합니다." : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value && value !== formData.newPassword ? "비밀번호가 일치하지 않습니다." : "";
        break;
    }

    setValidationErrors(errors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    validateField(name, value);

    // Special case for confirm password validation when new password changes
    if (name === "newPassword" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const isFormValid = () => {
    return (
      formData.newPassword.trim() &&
      formData.confirmPassword.trim() &&
      formData.newPassword === formData.confirmPassword &&
      !validationErrors.newPassword &&
      !validationErrors.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("유효하지 않은 재설정 링크입니다.");
      return;
    }

    if (!isFormValid()) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "비밀번호 재설정에 실패했습니다.");
      }

      setSuccess(true);

      // 3초 후 로그인 페이지로 리다이렉트
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "비밀번호 재설정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">비밀번호 재설정 완료</h1>

            <p className="text-gray-600 mb-6">
              비밀번호가 성공적으로 변경되었습니다.
              <br />
              잠시 후 로그인 페이지로 이동합니다.
            </p>

            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              로그인 페이지로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              비밀번호 재설정
            </h1>
            <p className="text-gray-600 mt-2">새로운 비밀번호를 입력해주세요</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!token ? (
            <div className="text-center">
              <p className="text-gray-600 mb-6">유효하지 않은 재설정 링크입니다.</p>
              <Link href="/forgot-password" className="text-blue-600 hover:underline font-medium">
                비밀번호 재설정 다시 요청하기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  새 비밀번호
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    validationErrors.newPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="새 비밀번호를 입력하세요"
                  required
                />
                {validationErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.newPassword}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    validationErrors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "재설정 중..." : "비밀번호 재설정"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                로그인 페이지로 돌아가기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
