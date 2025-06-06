import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Server Component that protects routes by checking authentication status
 * Redirects to login page if user is not authenticated
 */
export async function AuthGuard({ children, fallback, redirectTo = "/login" }: AuthGuardProps) {
  const user = await getCurrentUser();

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect(redirectTo);
  }

  return <>{children}</>;
}

/**
 * Server Component that only renders content for authenticated users
 * Does not redirect, just conditionally renders
 */
export async function AuthenticatedOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

/**
 * Server Component that only renders content for unauthenticated users
 */
export async function UnauthenticatedOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
