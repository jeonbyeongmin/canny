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
        site.id === id
          ? { ...site, status: site.status === "활성" ? "비활성" : "활성" }
          : site
      )
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
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[800px] max-w-[800px] py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div>
            <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
              뉴스 소스 관리
            </p>
            <p className="text-[#60758a] text-sm mt-2">
              뉴스레터에 포함될 뉴스 소스 사이트들을 관리하세요
            </p>
          </div>
          <button
            onClick={() => setIsAddingNewSite(!isAddingNewSite)}
            className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">+ 새 사이트 추가</span>
          </button>
        </div>

        {/* 새 사이트 추가 폼 */}
        {isAddingNewSite && (
          <div className="mx-4 mb-6 p-6 bg-[#f8f9fb] rounded-xl border border-[#dbe0e6]">
            <h3 className="text-[#111418] text-lg font-bold mb-4">
              새 뉴스 소스 추가
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#111418] mb-2">
                  사이트 이름
                </label>
                <input
                  type="text"
                  placeholder="예: TechCrunch"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111418] mb-2">
                  카테고리
                </label>
                <select
                  value={newSiteCategory}
                  onChange={(e) => setNewSiteCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#111418] mb-2">
                사이트 URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={newSiteUrl}
                onChange={(e) => setNewSiteUrl(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#111418] mb-2">
                설명 (선택사항)
              </label>
              <textarea
                placeholder="이 뉴스 소스에 대한 간단한 설명을 입력하세요"
                value={newSiteDescription}
                onChange={(e) => setNewSiteDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-[#dbe0e6] focus:outline-0 focus:ring-0 focus:border-[#0c7ff2] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddSite}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                추가
              </button>
              <button
                onClick={() => setIsAddingNewSite(false)}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* 사이트 목록 */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#111418] text-lg font-bold">
              등록된 뉴스 소스
            </h3>
            <span className="text-[#60758a] text-sm">
              총 {sites.length}개 사이트
            </span>
          </div>

          <div className="grid gap-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-xl border border-[#dbe0e6] p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-[#111418] font-bold text-lg">
                        {site.name}
                      </h4>
                      <span className="px-2 py-1 rounded-lg bg-[#f0f2f5] text-[#60758a] text-xs font-medium">
                        {site.category}
                      </span>
                      <button
                        onClick={() => toggleSiteStatus(site.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          site.status === "활성"
                            ? "bg-[#e6f7ff] text-[#0c7ff2]"
                            : "bg-[#fff2e6] text-[#ff8c00]"
                        }`}
                      >
                        {site.status}
                      </button>
                    </div>

                    <p className="text-[#0c7ff2] text-sm mb-2 break-all">
                      {site.url}
                    </p>

                    {site.description && (
                      <p className="text-[#60758a] text-sm mb-3">
                        {site.description}
                      </p>
                    )}

                    <div className="flex items-center gap-6 text-sm text-[#60758a]">
                      <span>마지막 수집: {site.lastCrawled}</span>
                      <span>수집된 기사: {site.articlesCount}개</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleTestCrawl(site.id)}
                      className="px-3 py-2 rounded-lg bg-[#f0f2f5] text-[#111418] text-sm font-medium hover:bg-[#e6e8eb]"
                    >
                      테스트
                    </button>
                    <button
                      onClick={() => handleDeleteSite(site.id)}
                      className="px-3 py-2 rounded-lg bg-[#fee] text-[#d63384] text-sm font-medium hover:bg-[#fdd]"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sites.length === 0 && (
            <div className="text-center py-12 text-[#60758a]">
              <p className="text-lg mb-2">등록된 뉴스 소스가 없습니다</p>
              <p className="text-sm">
                새 사이트를 추가하여 뉴스레터를 시작하세요
              </p>
            </div>
          )}
        </div>

        {/* 도움말 */}
        <div className="mx-4 mt-6 p-4 bg-[#f8f9fb] rounded-xl border border-[#dbe0e6]">
          <h4 className="text-[#111418] text-sm font-bold mb-2">💡 사용 팁</h4>
          <ul className="text-[#60758a] text-xs space-y-1">
            <li>
              • RSS 피드가 있는 사이트를 추가하면 더 정확한 수집이 가능합니다
            </li>
            <li>• 비활성 상태의 사이트는 뉴스 수집에서 제외됩니다</li>
            <li>• 테스트 버튼으로 사이트 연결 상태를 확인할 수 있습니다</li>
            <li>• 카테고리별로 사이트를 분류하여 관리하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
