import React from "react";

import SettingsSidebar from "./_components/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 gap-6 px-6 py-8">
          <SettingsSidebar />
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
            <div className="p-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
