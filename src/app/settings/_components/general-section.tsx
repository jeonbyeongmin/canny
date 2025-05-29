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
    if (
      confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      console.log("계정 삭제");
    }
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[700px] max-w-[700px] py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div>
            <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
              일반 설정
            </p>
            <p className="text-[#60758a] text-sm mt-2">
              계정 정보, 알림, 언어 및 기타 설정을 관리하세요
            </p>
          </div>
        </div>

        {/* 계정 정보 */}
        <div className="mx-4 mb-6 p-6 bg-white rounded-xl border border-[#dbe0e6]">
          <h3 className="text-[#111418] text-lg font-bold mb-4">계정 정보</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                이름
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                이메일
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                회사/조직
              </label>
              <input
                type="text"
                value={userInfo.company}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, company: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                시간대
              </label>
              <select
                value={userInfo.timezone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, timezone: e.target.value })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
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

        {/* 뉴스레터 설정 */}
        <div className="mx-4 mb-6 p-6 bg-white rounded-xl border border-[#dbe0e6]">
          <h3 className="text-[#111418] text-lg font-bold mb-4">
            뉴스레터 설정
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                발송 주기
              </label>
              <select
                value={newsletterSettings.frequency}
                onChange={(e) =>
                  setNewsletterSettings({
                    ...newsletterSettings,
                    frequency: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              >
                <option value="daily">매일</option>
                <option value="weekly">주간</option>
                <option value="monthly">월간</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                발송 시간
              </label>
              <input
                type="time"
                value={newsletterSettings.deliveryTime}
                onChange={(e) =>
                  setNewsletterSettings({
                    ...newsletterSettings,
                    deliveryTime: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                최대 기사 수
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={newsletterSettings.maxArticles}
                onChange={(e) =>
                  setNewsletterSettings({
                    ...newsletterSettings,
                    maxArticles: parseInt(e.target.value),
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>

            <div className="flex items-center h-10">
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
                  className="mr-2 h-4 w-4 text-[#0c7ff2] focus:ring-[#0c7ff2] border-[#dbe0e6] rounded"
                />
                <span className="text-sm font-medium text-[#111418]">
                  요약 포함
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="mx-4 mb-6 p-6 bg-white rounded-xl border border-[#dbe0e6]">
          <h3 className="text-[#111418] text-lg font-bold mb-4">알림 설정</h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-[#111418]">
                  이메일 뉴스레터
                </span>
                <p className="text-xs text-[#60758a]">
                  새로운 뉴스레터를 이메일로 받기
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailNewsletter}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    emailNewsletter: e.target.checked,
                  })
                }
                className="h-4 w-4 text-[#0c7ff2] focus:ring-[#0c7ff2] border-[#dbe0e6] rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-[#111418]">
                  주간 다이제스트
                </span>
                <p className="text-xs text-[#60758a]">주간 요약 리포트 받기</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    weeklyReport: e.target.checked,
                  })
                }
                className="h-4 w-4 text-[#0c7ff2] focus:ring-[#0c7ff2] border-[#dbe0e6] rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-[#111418]">
                  푸시 알림
                </span>
                <p className="text-xs text-[#60758a]">중요한 뉴스 즉시 알림</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    pushNotifications: e.target.checked,
                  })
                }
                className="h-4 w-4 text-[#0c7ff2] focus:ring-[#0c7ff2] border-[#dbe0e6] rounded"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-[#111418]">
                  시스템 업데이트
                </span>
                <p className="text-xs text-[#60758a]">
                  서비스 업데이트 및 공지사항
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.systemUpdates}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    systemUpdates: e.target.checked,
                  })
                }
                className="h-4 w-4 text-[#0c7ff2] focus:ring-[#0c7ff2] border-[#dbe0e6] rounded"
              />
            </label>
          </div>
        </div>

        {/* 언어 및 지역 설정 */}
        <div className="mx-4 mb-6 p-6 bg-white rounded-xl border border-[#dbe0e6]">
          <h3 className="text-[#111418] text-lg font-bold mb-4">
            언어 및 지역
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                언어
              </label>
              <select
                value={localeSettings.language}
                onChange={(e) =>
                  setLocaleSettings({
                    ...localeSettings,
                    language: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                날짜 형식
              </label>
              <select
                value={localeSettings.dateFormat}
                onChange={(e) =>
                  setLocaleSettings({
                    ...localeSettings,
                    dateFormat: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              >
                <option value="YYYY-MM-DD">2024-05-29</option>
                <option value="MM/DD/YYYY">05/29/2024</option>
                <option value="DD/MM/YYYY">29/05/2024</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111418] mb-2">
                시간 형식
              </label>
              <select
                value={localeSettings.timeFormat}
                onChange={(e) =>
                  setLocaleSettings({
                    ...localeSettings,
                    timeFormat: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              >
                <option value="24h">24시간 (14:30)</option>
                <option value="12h">12시간 (2:30 PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 데이터 관리 */}
        <div className="mx-4 mb-6 p-6 bg-white rounded-xl border border-[#dbe0e6]">
          <h3 className="text-[#111418] text-lg font-bold mb-4">데이터 관리</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-[#111418]">
                  데이터 내보내기
                </span>
                <p className="text-xs text-[#60758a]">
                  내 설정과 데이터를 JSON 파일로 다운로드
                </p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl bg-[#f0f2f5] text-[#111418] text-sm font-medium hover:bg-[#e6e8eb]"
              >
                내보내기
              </button>
            </div>

            <hr className="border-[#dbe0e6]" />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-[#d63384]">
                  계정 삭제
                </span>
                <p className="text-xs text-[#60758a]">
                  계정과 모든 데이터를 영구적으로 삭제
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-[#fee] text-[#d63384] text-sm font-medium hover:bg-[#fdd]"
              >
                계정 삭제
              </button>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex px-4 py-3 justify-end">
          <button
            onClick={handleSave}
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">변경사항 저장</span>
          </button>
        </div>

        {/* 도움말 */}
        <div className="mx-4 mt-6 p-4 bg-[#f8f9fb] rounded-xl border border-[#dbe0e6]">
          <h4 className="text-[#111418] text-sm font-bold mb-2">💡 설정 팁</h4>
          <ul className="text-[#60758a] text-xs space-y-1">
            <li>• 시간대 설정은 뉴스레터 발송 시간에 영향을 줍니다</li>
            <li>• 알림 설정을 통해 받고 싶은 정보만 선택할 수 있습니다</li>
            <li>• 데이터 내보내기로 백업을 정기적으로 생성하세요</li>
            <li>• 계정 삭제는 되돌릴 수 없으니 신중하게 결정하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
