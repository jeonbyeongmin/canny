"use client";

import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import NewspaperIcon from "./icons/NewspaperIcon";
import LinkIcon from "./icons/LinkIcon";
import RobotIcon from "./icons/RobotIcon";
import GearIcon from "./icons/GearIcon";
import { useSearchParams } from "next/navigation";

const SettingsSidebar = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get("menu") || "newsletter";
  const menuItems = [
    {
      label: "뉴스레터",
      icon: <NewspaperIcon />,
      href: "/settings?menu=newsletter",
      key: "newsletter",
    },
    {
      label: "사이트",
      icon: <LinkIcon />,
      href: "/settings?menu=site",
      key: "site",
    },
    {
      label: "GPT",
      icon: <RobotIcon />,
      href: "/settings?menu=gpt",
      key: "gpt",
    },
    {
      label: "설정",
      icon: <GearIcon />,
      href: "/settings?menu=general",
      key: "general",
    },
  ];

  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={menu === item.key}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
