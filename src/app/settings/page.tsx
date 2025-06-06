"use client";

import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import GeneralSection from "@/app/settings/_components/general-section";
import GptSection from "@/app/settings/_components/gpt-section";
import NewsletterSection from "@/app/settings/_components/newsletter-section";
import SiteSection from "@/app/settings/_components/site-section";

function SettingsContent() {
  const searchParams = useSearchParams();
  const menu = searchParams.get("menu") || "newsletter";

  switch (menu) {
    case "newsletter":
      return <NewsletterSection />;
    case "site":
      return <SiteSection />;
    case "gpt":
      return <GptSection />;
    case "general":
      return <GeneralSection />;
    default:
      return <NewsletterSection />;
  }
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
