"use client";

import React, { useState } from "react";

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

  const handleExportData = () => {
    console.log("데이터 내보내기");
  };

  const handleDeleteAccount = () => {
    if (confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      console.log("계정 삭제");
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">일반 설정</h1>
        <p className="text-sm text-muted-foreground">
          계정 정보, 알림, 언어 및 기타 설정을 관리하세요
        </p>
      </div>

      {/* 계정 정보 */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">계정 정보</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">이름</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">이메일</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">회사/조직</label>
            <input
              type="text"
              value={userInfo.company}
              onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">시간대</label>
            <select
              value={userInfo.timezone}
              onChange={(e) => setUserInfo({ ...userInfo, timezone: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🔔</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">알림 설정</h2>
        </div>

        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
            >
              <div>
                <span className="text-xs font-medium text-foreground">
                  {key === "emailNewsletter" && "이메일 뉴스레터"}
                  {key === "emailDigest" && "이메일 다이제스트"}
                  {key === "pushNotifications" && "푸시 알림"}
                  {key === "weeklyReport" && "주간 보고서"}
                  {key === "systemUpdates" && "시스템 업데이트"}
                </span>
                <p className="text-xs text-muted-foreground">
                  {key === "emailNewsletter" && "새로운 뉴스레터 발송 시 알림을 받습니다"}
                  {key === "emailDigest" && "일간/주간 요약 정보를 받습니다"}
                  {key === "pushNotifications" && "브라우저 푸시 알림을 받습니다"}
                  {key === "weeklyReport" && "주간 활동 보고서를 받습니다"}
                  {key === "systemUpdates" && "시스템 업데이트 소식을 받습니다"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 언어 및 지역 설정 */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🌐</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">언어 및 지역</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">언어</label>
            <select
              value={localeSettings.language}
              onChange={(e) => setLocaleSettings({ ...localeSettings, language: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">날짜 형식</label>
            <select
              value={localeSettings.dateFormat}
              onChange={(e) => setLocaleSettings({ ...localeSettings, dateFormat: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">시간 형식</label>
            <select
              value={localeSettings.timeFormat}
              onChange={(e) => setLocaleSettings({ ...localeSettings, timeFormat: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            >
              <option value="24h">24시간</option>
              <option value="12h">12시간</option>
            </select>
          </div>
        </div>
      </div>

      {/* 뉴스레터 기본 설정 */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📧</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">뉴스레터 기본 설정</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">발송 빈도</label>
            <select
              value={newsletterSettings.frequency}
              onChange={(e) =>
                setNewsletterSettings({
                  ...newsletterSettings,
                  frequency: e.target.value,
                })
              }
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            >
              <option value="daily">매일</option>
              <option value="weekly">주간</option>
              <option value="monthly">월간</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">발송 시간</label>
            <input
              type="time"
              value={newsletterSettings.deliveryTime}
              onChange={(e) =>
                setNewsletterSettings({
                  ...newsletterSettings,
                  deliveryTime: e.target.value,
                })
              }
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted-foreground">최대 기사 수</label>
            <input
              type="number"
              min="1"
              max="20"
              value={newsletterSettings.maxArticles}
              onChange={(e) =>
                setNewsletterSettings({
                  ...newsletterSettings,
                  maxArticles: parseInt(e.target.value),
                })
              }
              className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-xs"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={newsletterSettings.includeSummary}
                onChange={(e) =>
                  setNewsletterSettings({
                    ...newsletterSettings,
                    includeSummary: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              <span className="ml-3 text-xs font-medium text-foreground">요약 포함</span>
            </label>
          </div>
        </div>
      </div>

      {/* 데이터 관리 */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📊</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">데이터 관리</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <span className="text-xs font-medium text-foreground">데이터 내보내기</span>
              <p className="text-xs text-muted-foreground mt-1">
                내 설정과 데이터를 JSON 파일로 다운로드
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              내보내기
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <div>
              <span className="text-xs font-medium text-destructive">계정 삭제</span>
              <p className="text-xs text-destructive/80 mt-1">
                계정과 모든 데이터를 영구적으로 삭제합니다
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors"
            >
              계정 삭제
            </button>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end pt-4 border-t border-border">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-xs"
        >
          변경사항 저장
        </button>
      </div>

      {/* 도움말 */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="text-primary text-base font-semibold mb-3 flex items-center gap-2">
          💡 설정 팁
        </h3>
        <ul className="text-primary/80 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-1">•</span>
            시간대 설정은 뉴스레터 발송 시간에 영향을 줍니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-1">•</span>
            알림 설정을 통해 받고 싶은 정보만 선택할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-1">•</span>
            데이터 내보내기로 백업을 정기적으로 생성하세요
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-1">•</span>
            계정 삭제는 되돌릴 수 없으니 신중하게 결정하세요
          </li>
        </ul>
      </div>
    </div>
  );
}
