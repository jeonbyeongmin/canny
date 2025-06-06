"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 인증 상태 확인
  const checkAuth = async () => {
    try {
      console.log("인증 상태 확인 중...");
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        console.log("인증 확인 성공:", data.user);
        setUser(data.user);
      } else {
        console.log("인증 실패 또는 미인증 상태");
        setUser(null);
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      setUser(null);
    } finally {
      console.log("인증 확인 완료, 로딩 종료");
      setIsLoading(false);
    }
  };

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      console.log("로그인 시도:", { email });
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("로그인 응답:", { status: response.status, data });

      if (response.ok) {
        setUser(data.user);
        console.log("로그인 성공, 사용자 설정:", data.user);
        return { success: true };
      } else {
        console.log("로그인 실패:", data.error);
        return { success: false, error: data.error || "로그인에 실패했습니다." };
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      return { success: false, error: "서버 오류가 발생했습니다." };
    }
  };

  // 회원가입
  const signup = async (name: string, email: string, password: string) => {
    try {
      console.log("회원가입 시도:", { name, email });
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("회원가입 응답:", { status: response.status, data });

      if (response.ok) {
        setUser(data.user);
        console.log("회원가입 성공, 사용자 설정:", data.user);
        return { success: true };
      } else {
        console.log("회원가입 실패:", data.error);
        return { success: false, error: data.error || "회원가입에 실패했습니다." };
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      return { success: false, error: "서버 오류가 발생했습니다." };
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuth();

    // 5분마다 인증 상태 자동 확인
    const interval = setInterval(
      () => {
        if (user) {
          checkAuth();
        }
      },
      5 * 60 * 1000,
    ); // 5분

    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
