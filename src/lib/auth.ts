import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
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
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
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

// Legacy function names for backwards compatibility
export const comparePassword = verifyPassword;
