"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GeneralSection() {
  // 계정 설정
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "hong@example.com",
    company: "테크 스타트업",
    timezone: "Asia/Seoul",
  });

  // 알림 설정
  const [notifications, setNotifications] = useState({
    emailNewsletter: true,
    emailDigest: false,
    pushNotifications: true,
    weeklyReport: true,
    systemUpdates: true,
  });

  // 언어 및 지역 설정
  const [localeSettings, setLocaleSettings] = useState({
    language: "ko",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "24h",
  });

  // 뉴스레터 설정
  const [newsletterSettings, setNewsletterSettings] = useState({
    frequency: "daily",
    deliveryTime: "09:00",
    maxArticles: 10,
    includeSummary: true,
  });

  const timezones = [
    { value: "Asia/Seoul", label: "서울 (UTC+9)" },
    { value: "America/New_York", label: "뉴욕 (UTC-5)" },
    { value: "Europe/London", label: "런던 (UTC+0)" },
    { value: "Asia/Tokyo", label: "도쿄 (UTC+9)" },
  ];

  const languages = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
  ];

  const handleSave = () => {
    console.log("설정 저장:", {
      userInfo,
      notifications,
      localeSettings,
      newsletterSettings,
    });
  };

  const handleReset = () => {
    setUserInfo({
      name: "",
      email: "",
      company: "",
      timezone: "Asia/Seoul",
    });
    setNotifications({
      emailNewsletter: false,
      emailDigest: false,
      pushNotifications: false,
      weeklyReport: false,
      systemUpdates: false,
    });
    setLocaleSettings({
      language: "ko",
      dateFormat: "YYYY-MM-DD",
      timeFormat: "24h",
    });
    setNewsletterSettings({
      frequency: "daily",
      deliveryTime: "09:00",
      maxArticles: 10,
      includeSummary: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground mb-1">일반 설정</h1>
        <p className="text-muted-foreground text-xs">
          계정 정보, 알림, 언어 설정 등 기본 설정을 관리하세요
        </p>
      </div>

      {/* 계정 정보 */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">👤</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">계정 정보</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium">이름</Label>
            <Input
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="h-9 text-xs"
              placeholder="홍길동"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">이메일</Label>
            <Input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="h-9 text-xs"
              placeholder="hong@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">회사/조직</Label>
            <Input
              value={userInfo.company}
              onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
              className="h-9 text-xs"
              placeholder="테크 스타트업"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">시간대</Label>
            <Select
              value={userInfo.timezone}
              onValueChange={(value) => setUserInfo({ ...userInfo, timezone: value })}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value} className="text-xs">
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🔔</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">알림 설정</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              key: "emailNewsletter",
              label: "이메일 뉴스레터",
              desc: "생성된 뉴스레터를 이메일로 받기",
            },
            { key: "emailDigest", label: "일일 요약", desc: "하루의 주요 뉴스를 요약해서 받기" },
            {
              key: "pushNotifications",
              label: "푸시 알림",
              desc: "중요한 업데이트를 즉시 알림으로 받기",
            },
            { key: "weeklyReport", label: "주간 리포트", desc: "주간 사용량 및 통계 리포트 받기" },
            {
              key: "systemUpdates",
              label: "시스템 업데이트",
              desc: "새로운 기능이나 시스템 공지사항 받기",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-md border border-border"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, [item.key]: checked })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* 언어 및 지역 설정 */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🌍</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">언어 및 지역</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium">언어</Label>
            <Select
              value={localeSettings.language}
              onValueChange={(value) => setLocaleSettings({ ...localeSettings, language: value })}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-xs">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">날짜 형식</Label>
            <Select
              value={localeSettings.dateFormat}
              onValueChange={(value) => setLocaleSettings({ ...localeSettings, dateFormat: value })}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YYYY-MM-DD" className="text-xs">
                  YYYY-MM-DD
                </SelectItem>
                <SelectItem value="MM/DD/YYYY" className="text-xs">
                  MM/DD/YYYY
                </SelectItem>
                <SelectItem value="DD/MM/YYYY" className="text-xs">
                  DD/MM/YYYY
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">시간 형식</Label>
            <Select
              value={localeSettings.timeFormat}
              onValueChange={(value) => setLocaleSettings({ ...localeSettings, timeFormat: value })}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h" className="text-xs">
                  24시간 (14:30)
                </SelectItem>
                <SelectItem value="12h" className="text-xs">
                  12시간 (2:30 PM)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 뉴스레터 기본 설정 */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">📧</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">뉴스레터 기본 설정</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium">발송 빈도</Label>
            <Select
              value={newsletterSettings.frequency}
              onValueChange={(value) =>
                setNewsletterSettings({ ...newsletterSettings, frequency: value })
              }
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily" className="text-xs">
                  매일
                </SelectItem>
                <SelectItem value="weekly" className="text-xs">
                  주간
                </SelectItem>
                <SelectItem value="biweekly" className="text-xs">
                  격주
                </SelectItem>
                <SelectItem value="monthly" className="text-xs">
                  월간
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">발송 시간</Label>
            <Input
              type="time"
              value={newsletterSettings.deliveryTime}
              onChange={(e) =>
                setNewsletterSettings({ ...newsletterSettings, deliveryTime: e.target.value })
              }
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium">
              최대 기사 수: {newsletterSettings.maxArticles}개
            </Label>
            <Slider
              value={[newsletterSettings.maxArticles]}
              onValueChange={(value) =>
                setNewsletterSettings({
                  ...newsletterSettings,
                  maxArticles: value[0],
                })
              }
              min={5}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2 flex items-center">
            <div className="flex items-center gap-2">
              <Checkbox
                id="includeSummary"
                checked={newsletterSettings.includeSummary}
                onCheckedChange={(checked) =>
                  setNewsletterSettings({ ...newsletterSettings, includeSummary: !!checked })
                }
              />
              <Label htmlFor="includeSummary" className="text-xs font-medium cursor-pointer">AI 요약 포함</Label>
            </div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          onClick={handleReset}
          variant="outline"
          className="font-semibold py-2 px-4 rounded-md transition-colors text-xs"
        >
          설정 초기화
        </Button>
        <Button
          onClick={handleSave}
          className="font-semibold py-2 px-6 rounded-md transition-all duration-200 text-xs"
        >
          변경사항 저장
        </Button>
      </div>

      {/* 도움말 */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="text-primary text-sm font-semibold mb-2 flex items-center gap-2">
          💡 설정 도움말
        </h3>
        <ul className="text-primary/80 text-xs space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            계정 정보는 뉴스레터 개인화에 사용됩니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            알림 설정으로 필요한 정보만 받아볼 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            시간대 설정은 뉴스레터 발송 시간에 영향을 줍니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            AI 요약 기능은 GPT 설정이 필요합니다
          </li>
        </ul>
      </div>
    </div>
  );
}
