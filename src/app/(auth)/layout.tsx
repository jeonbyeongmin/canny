import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-80 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
