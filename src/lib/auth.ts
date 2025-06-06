import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
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

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// 간단한 사용자 데이터베이스 (실제로는 데이터베이스를 사용해야 함)
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

// 임시 사용자 저장소 (실제로는 데이터베이스를 사용)
const users: User[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const user: User = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
