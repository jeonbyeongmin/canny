import React from "react";

import GeneralSection from "@/app/settings/_components/general-section";
import GptSection from "@/app/settings/_components/gpt-section";
import NewsletterSection from "@/app/settings/_components/newsletter-section";
import SiteSection from "@/app/settings/_components/site-section";

interface SettingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const menu = resolvedSearchParams.menu || "newsletter";

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
