"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import GearIcon from "./icons/gear-icon";
import LinkIcon from "./icons/link-icon";
import NewspaperIcon from "./icons/newspaper-icon";
import RobotIcon from "./icons/robot-icon";
import TemplateIcon from "./icons/template-icon";
import SidebarMenuItem from "./sidebar-menu-item";

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
      label: "템플릿",
      icon: <TemplateIcon />,
      href: "/settings?menu=templates",
      key: "templates",
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
