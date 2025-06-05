import React from "react";

import Link from "next/link";

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps & { href: string }> = ({
  icon,
  label,
  isActive,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer no-underline transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
      scroll={false}
    >
      <div
        className={`transition-transform duration-200 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"} ${isActive ? "scale-110" : "group-hover:scale-105"}`}
      >
        {icon}
      </div>
      <p
        className={`text-sm font-medium leading-normal transition-colors duration-200 ${
          isActive ? "text-white font-semibold" : "text-slate-600 group-hover:text-slate-900"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarMenuItem;
