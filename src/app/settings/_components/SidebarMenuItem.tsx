import React from "react";

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

import Link from "next/link";

const SidebarMenuItem: React.FC<SidebarMenuItemProps & { href: string }> = ({
  icon,
  label,
  isActive,
  href,
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer no-underline ${
        isActive ? "bg-[#f0f2f5]" : ""
      }`}
      scroll={false}
    >
      <div className="text-[#111418]">{icon}</div>
      <p className="text-[#111418] text-sm font-medium leading-normal">
        {label}
      </p>
    </Link>
  );
};

export default SidebarMenuItem;
