import React from "react";

import { NextPage } from "@/app/_types/next-types";
import GeneralSection from "@/app/settings/_components/general-section";
import GptSection from "@/app/settings/_components/gpt-section";
import NewsletterSection from "@/app/settings/_components/newsletter-section";
import SiteSection from "@/app/settings/_components/site-section";

export default async function SettingsPage({ searchParams }: NextPage) {
  const menu = (await searchParams)?.["menu"] || "newsletter";

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
