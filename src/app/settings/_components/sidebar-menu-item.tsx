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
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer no-underline transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      scroll={false}
    >
      <div
        className={`transition-transform duration-200 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-accent-foreground"} ${isActive ? "scale-110" : "group-hover:scale-105"}`}
      >
        {icon}
      </div>
      <p
        className={`text-xs font-medium leading-normal transition-colors duration-200 ${
          isActive
            ? "text-white font-semibold"
            : "text-muted-foreground group-hover:text-accent-foreground"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarMenuItem;
