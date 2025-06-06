import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  // GPT 설정 필드 추가
  openaiApiKey?: string | null;
  gptModel?: string | null;
  gptTemperature?: number | null;
  gptMaxTokens?: number | null;
  gptSystemPrompt?: string | null;
  gptConfigured: boolean;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      gptConfigured: false, // 기본값 설정
    },
  });

  // 비밀번호 필드는 제외하고 반환
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    gptConfigured: user.gptConfigured,
    openaiApiKey: user.openaiApiKey,
    gptModel: user.gptModel,
    gptTemperature: user.gptTemperature,
    gptMaxTokens: user.gptMaxTokens,
    gptSystemPrompt: user.gptSystemPrompt,
  };
}

export async function findUserByEmail(
  email: string,
): Promise<(User & { password?: string }) | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    gptConfigured: user.gptConfigured ?? false,
    openaiApiKey: user.openaiApiKey,
    gptModel: user.gptModel,
    gptTemperature: user.gptTemperature,
    gptMaxTokens: user.gptMaxTokens,
    gptSystemPrompt: user.gptSystemPrompt,
  };
}

export async function findUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    gptConfigured: user.gptConfigured ?? false,
    openaiApiKey: user.openaiApiKey,
    gptModel: user.gptModel,
    gptTemperature: user.gptTemperature,
    gptMaxTokens: user.gptMaxTokens,
    gptSystemPrompt: user.gptSystemPrompt,
  };
}

export async function createPasswordResetToken(email: string): Promise<string> {
  const token = jwt.sign({ email, type: "password-reset" }, JWT_SECRET, { expiresIn: "1h" });
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordReset.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function verifyPasswordResetToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; type: string };

    if (decoded.type !== "password-reset") {
      return null;
    }

    const resetRecord = await prisma.passwordReset.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!resetRecord) {
      return null;
    }

    return decoded.email;
  } catch {
    return null;
  }
}

export async function updateUserPassword(email: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  // Delete all password reset tokens for this email
  await prisma.passwordReset.deleteMany({
    where: { email },
  });
}

// GPT 설정 업데이트 함수
export async function updateGptSettings(
  userId: string,
  settings: {
    openaiApiKey?: string;
    gptModel?: string;
    gptTemperature?: number;
    gptMaxTokens?: number;
    gptSystemPrompt?: string;
  },
): Promise<User> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      openaiApiKey: settings.openaiApiKey,
      gptModel: settings.gptModel,
      gptTemperature: settings.gptTemperature,
      gptMaxTokens: settings.gptMaxTokens,
      gptSystemPrompt: settings.gptSystemPrompt,
      gptConfigured: !!settings.openaiApiKey, // API 키가 있으면 설정 완료로 간주
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    emailVerified: user.emailVerified,
    gptConfigured: user.gptConfigured,
    openaiApiKey: user.openaiApiKey,
    gptModel: user.gptModel,
    gptTemperature: user.gptTemperature,
    gptMaxTokens: user.gptMaxTokens,
    gptSystemPrompt: user.gptSystemPrompt,
  };
}

// Legacy function names for backwards compatibility
export const comparePassword = verifyPassword;

// Server-side authentication utilities for Server Components
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    const user = await findUserById(payload.userId);
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

// GPT 설정 필수 확인 함수
export async function requireGptConfig(): Promise<User> {
  const user = await requireAuth();

  if (!user.gptConfigured) {
    // GPT 설정이 되어 있지 않으면 설정 페이지로 리다이렉트
    redirect("/settings");
  }

  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

// GPT 설정 여부 확인 함수
export async function isGptConfigured(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user?.gptConfigured;
}

// Set authentication cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

// Clear authentication cookie
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
