"use client";

import React, { useState } from "react";

interface Site {
  id: string;
  url: string;
  name: string;
  category: string;
  status: "활성" | "비활성";
  lastCrawled: string;
  articlesCount: number;
  description?: string;
}

export default function SiteSection() {
  const [sites, setSites] = useState<Site[]>([
    {
      id: "1",
      url: "https://techcrunch.com",
      name: "TechCrunch",
      category: "기술",
      status: "활성",
      lastCrawled: "2024년 5월 29일 14:30",
      articlesCount: 156,
      description: "기술 스타트업 및 벤처 투자 소식",
    },
    {
      id: "2",
      url: "https://www.nytimes.com/section/technology",
      name: "The New York Times - Tech",
      category: "기술",
      status: "활성",
      lastCrawled: "2024년 5월 29일 14:25",
      articlesCount: 89,
      description: "글로벌 기술 트렌드와 분석",
    },
    {
      id: "3",
      url: "https://www.wired.com",
      name: "WIRED",
      category: "기술",
      status: "비활성",
      lastCrawled: "2024년 5월 28일 16:45",
      articlesCount: 203,
      description: "디지털 문화와 미래 기술",
    },
    {
      id: "4",
      url: "https://www.theverge.com",
      name: "The Verge",
      category: "기술",
      status: "활성",
      lastCrawled: "2024년 5월 29일 14:20",
      articlesCount: 312,
      description: "소비자 기술과 디지털 라이프스타일",
    },
  ]);

  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [newSiteName, setNewSiteName] = useState("");
  const [newSiteCategory, setNewSiteCategory] = useState("기술");
  const [newSiteDescription, setNewSiteDescription] = useState("");
  const [isAddingNewSite, setIsAddingNewSite] = useState(false);

  const categories = ["기술", "비즈니스", "사회", "문화", "스포츠", "기타"];

  const handleAddSite = () => {
    if (newSiteUrl.trim() === "" || newSiteName.trim() === "") return;

    const newSite: Site = {
      id: (sites.length + 1).toString(),
      url: newSiteUrl,
      name: newSiteName,
      category: newSiteCategory,
      status: "활성",
      lastCrawled: "아직 없음",
      articlesCount: 0,
      description: newSiteDescription,
    };

    setSites([...sites, newSite]);
    setNewSiteUrl("");
    setNewSiteName("");
    setNewSiteCategory("기술");
    setNewSiteDescription("");
    setIsAddingNewSite(false);
  };

  const toggleSiteStatus = (id: string) => {
    setSites(
      sites.map((site) =>
        site.id === id ? { ...site, status: site.status === "활성" ? "비활성" : "활성" } : site,
      ),
    );
  };

  const handleDeleteSite = (id: string) => {
    setSites(sites.filter((site) => site.id !== id));
  };

  const handleTestCrawl = (id: string) => {
    // 크롤링 테스트 로직
    console.log(`사이트 ${id} 크롤링 테스트`);
    // 실제로는 API 호출 등을 수행
  };

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">뉴스 소스 관리</h1>
            <p className="text-slate-600">뉴스레터에 포함될 뉴스 소스 사이트들을 관리하세요</p>
          </div>
          <button
            onClick={() => setIsAddingNewSite(!isAddingNewSite)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>+</span>새 사이트 추가
          </button>
        </div>
      </div>

      {/* 새 사이트 추가 폼 */}
      {isAddingNewSite && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">➕</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">새 뉴스 소스 추가</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">사이트 이름</label>
              <input
                type="text"
                placeholder="예: TechCrunch"
                value={newSiteName}
                onChange={(e) => setNewSiteName(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">카테고리</label>
              <select
                value={newSiteCategory}
                onChange={(e) => setNewSiteCategory(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-slate-700">사이트 URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={newSiteUrl}
              onChange={(e) => setNewSiteUrl(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-slate-700">설명 (선택사항)</label>
            <textarea
              placeholder="이 뉴스 소스에 대한 간단한 설명을 입력하세요"
              value={newSiteDescription}
              onChange={(e) => setNewSiteDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleAddSite}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              추가
            </button>
            <button
              onClick={() => setIsAddingNewSite(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 사이트 목록 */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🌐</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-800">등록된 뉴스 소스</h2>
            <p className="text-sm text-slate-600">총 {sites.length}개 사이트</p>
          </div>
        </div>

        {sites.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-500 text-2xl">📰</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              등록된 뉴스 소스가 없습니다
            </h3>
            <p className="text-slate-500 mb-4">새 사이트를 추가하여 뉴스레터를 시작하세요</p>
            <button
              onClick={() => setIsAddingNewSite(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              첫 번째 사이트 추가하기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-slate-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-semibold text-slate-800">{site.name}</h4>
                      <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-medium">
                        {site.category}
                      </span>
                      <button
                        onClick={() => toggleSiteStatus(site.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          site.status === "활성"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        }`}
                      >
                        {site.status}
                      </button>
                    </div>

                    <div className="mb-3">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium break-all hover:underline"
                      >
                        {site.url}
                      </a>
                    </div>

                    {site.description && (
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        {site.description}
                      </p>
                    )}

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                        마지막 수집: {site.lastCrawled}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        수집된 기사: {site.articlesCount}개
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-6">
                    <button
                      onClick={() => handleTestCrawl(site.id)}
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors"
                      title="연결 상태 테스트"
                    >
                      테스트
                    </button>
                    <button
                      onClick={() => handleDeleteSite(site.id)}
                      className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors"
                      title="사이트 삭제"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 도움말 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-800 text-lg font-semibold mb-3 flex items-center gap-2">
          💡 사용 팁
        </h3>
        <ul className="text-blue-700 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            RSS 피드가 있는 사이트를 추가하면 더 정확한 수집이 가능합니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            비활성 상태의 사이트는 뉴스 수집에서 제외됩니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            테스트 버튼으로 사이트 연결 상태를 확인할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            카테고리별로 사이트를 분류하여 관리하세요
          </li>
        </ul>
      </div>
    </div>
  );
}
