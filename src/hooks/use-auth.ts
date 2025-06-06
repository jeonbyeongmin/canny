"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string;
  email: string;
  // GPT 설정 필드
  openaiApiKey?: string | null;
  gptModel?: string | null;
  gptTemperature?: number | null;
  gptMaxTokens?: number | null;
  gptSystemPrompt?: string | null;
  gptConfigured?: boolean;

  // 사용자 개인 정보
  company?: string | null;
  timezone?: string | null;

  // 알림 설정
  emailNewsletter?: boolean;
  emailDigest?: boolean;
  pushNotifications?: boolean;
  weeklyReport?: boolean;
  systemUpdates?: boolean;

  // 언어 및 지역 설정
  language?: string | null;
  dateFormat?: string | null;
  timeFormat?: string | null;

  // 뉴스레터 설정
  newsletterFrequency?: string | null;
  newsletterDeliveryTime?: string | null;
  newsletterMaxArticles?: number | null;
  newsletterIncludeSummary?: boolean;
  newsletterTone?: string | null;
  newsletterLength?: string | null;
  newsletterFormat?: string | null;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

// Auth API functions
const authApi = {
  getCurrentUser: async (): Promise<User | null> => {
    const response = await fetch("/api/auth/me");
    if (!response.ok) {
      if (response.status === 401) {
        return null; // 미인증 상태
      }
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data.user;
  },

  login: async (credentials: LoginData): Promise<User> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "로그인에 실패했습니다.");
    }
    return data.user;
  },

  signup: async (userData: SignupData): Promise<User> => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "회원가입에 실패했습니다.");
    }
    return data.user;
  },

  logout: async (): Promise<void> => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      throw new Error("로그아웃에 실패했습니다.");
    }
  },
};

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// Hooks
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음 (미인증 상태)
      if (error instanceof Error && error.message.includes("401")) {
        return false;
      }
      return failureCount < 1;
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      // 사용자 정보를 캐시에 저장
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error) => {
      console.error("로그인 오류:", error);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (user) => {
      // 사용자 정보를 캐시에 저장
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error) => {
      console.error("회원가입 오류:", error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // 모든 auth 관련 쿼리 무효화
      queryClient.removeQueries({ queryKey: authKeys.all });
      // 사용자 정보를 null로 설정
      queryClient.setQueryData(authKeys.user(), null);
    },
    onError: (error) => {
      console.error("로그아웃 오류:", error);
      // 에러가 발생해도 로컬 상태는 초기화
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.setQueryData(authKeys.user(), null);
    },
  });
}

// 편의 함수들
export function useAuth() {
  const userQuery = useUser();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  return {
    // 사용자 정보
    user: userQuery.data ?? null,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,

    // 로그인
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // 회원가입
    signup: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,

    // 로그아웃
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    // 인증 상태
    isAuthenticated: !!userQuery.data,

    // 수동 새로고침
    refetch: userQuery.refetch,
  };
}
