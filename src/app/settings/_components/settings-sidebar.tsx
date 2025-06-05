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
      label: "GPT",
      icon: <RobotIcon />,
      href: "/settings?menu=gpt",
      key: "gpt",
    },
    {
      label: "템플릿",
      icon: <TemplateIcon />,
      href: "/settings?menu=template",
      key: "template",
    },
    {
      label: "설정",
      icon: <GearIcon />,
      href: "/settings?menu=general",
      key: "general",
    },
  ];

  return (
    <div className="w-72 flex-shrink-0">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 p-6 sticky top-24">
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">설정</h2>
            <p className="text-sm text-slate-500">뉴스레터와 시스템 설정을 관리하세요</p>
          </div>
          <div className="flex flex-col gap-1">
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
