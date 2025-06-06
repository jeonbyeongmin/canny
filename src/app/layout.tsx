import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/contexts/auth-context";

import GNB from "./_components/gnb";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Newsify - 스마트 뉴스레터 플랫폼",
  description: "AI 기반 뉴스레터 생성 및 관리 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm`}>
        <div
          className="relative flex size-full min-h-screen flex-col bg-background text-foreground group/design-root overflow-x-hidden"
          style={{ fontFamily: 'Inter, "Noto Sans KR", sans-serif' }}
        >
          <AuthProvider>
            <div className="layout-container flex h-full grow flex-col">
              <GNB />
              <main className="flex-1">{children}</main>
              <footer className="flex justify-center border-t border-border bg-card/80 backdrop-blur-sm">
                <div className="flex max-w-[960px] flex-1 flex-col">
                  <footer className="flex flex-col gap-6 px-5 py-8 text-center @container">
                    <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                      <a
                        className="text-muted-foreground text-xs font-medium leading-normal min-w-40 hover:text-primary transition-colors"
                        href="#"
                      >
                        서비스 약관
                      </a>
                      <a
                        className="text-muted-foreground text-xs font-medium leading-normal min-w-40 hover:text-primary transition-colors"
                        href="#"
                      >
                        개인정보처리방침
                      </a>
                      <a
                        className="text-muted-foreground text-xs font-medium leading-normal min-w-40 hover:text-primary transition-colors"
                        href="#"
                      >
                        고객지원
                      </a>
                    </div>
                    <p className="text-muted-foreground text-xs font-normal leading-normal">
                      © 2024 Newsify. All rights reserved.
                    </p>
                  </footer>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
