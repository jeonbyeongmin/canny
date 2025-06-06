"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/server-actions";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        try {
          await logoutAction();
        } catch (error) {
          console.error("Logout failed:", error);
        }
      }}
      className="text-red-600 text-xs w-full justify-start"
    >
      로그아웃
    </Button>
  );
}
