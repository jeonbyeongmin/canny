import React, { Suspense } from "react";

import SettingsSidebar from "./_components/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 gap-5 px-5 py-6">
          <Suspense fallback={<div>사이드바 로딩중...</div>}>
            <SettingsSidebar />
          </Suspense>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
