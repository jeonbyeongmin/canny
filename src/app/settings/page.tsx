"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import NewsletterSection from "./_components/newsletter-section";
import SiteSection from "./_components/site-section";
import GptSection from "./_components/gpt-section";
import GeneralSection from "./_components/general-section";

export default function SettingsPage() {
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
