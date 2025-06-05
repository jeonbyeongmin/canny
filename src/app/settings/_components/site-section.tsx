"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground mb-1">뉴스 소스 관리</h1>
            <p className="text-muted-foreground text-xs">
              뉴스레터에 포함될 뉴스 소스 사이트들을 관리하세요
            </p>
          </div>
          <Button
            onClick={() => setIsAddingNewSite(!isAddingNewSite)}
            className="font-semibold py-2 px-4 rounded-sm transition-all duration-200 flex items-center gap-2 text-xs"
          >
            <span>+</span>새 사이트 추가
          </Button>
        </div>
      </div>

      {/* 새 사이트 추가 폼 */}
      {isAddingNewSite && (
        <div className="bg-card rounded border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-xs">➕</span>
            </div>
            <h2 className="text-base font-semibold text-foreground">새 뉴스 소스 추가</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">사이트 이름</Label>
              <Input
                type="text"
                placeholder="예: TechCrunch"
                value={newSiteName}
                onChange={(e) => setNewSiteName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">카테고리</Label>
              <Select value={newSiteCategory} onValueChange={setNewSiteCategory}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <Label className="text-xs font-medium">사이트 URL</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={newSiteUrl}
              onChange={(e) => setNewSiteUrl(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2 mb-4">
            <Label className="text-xs font-medium">설명 (선택사항)</Label>
            <Textarea
              placeholder="이 뉴스 소스에 대한 간단한 설명을 입력하세요"
              value={newSiteDescription}
              onChange={(e) => setNewSiteDescription(e.target.value)}
              rows={3}
              className="resize-none text-xs"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-border">
            <Button
              onClick={handleAddSite}
              className="font-semibold py-2 px-4 rounded-sm transition-all duration-200 text-xs"
            >
              추가
            </Button>
            <Button
              onClick={() => setIsAddingNewSite(false)}
              variant="outline"
              className="font-semibold py-2 px-4 rounded-sm transition-colors text-xs"
            >
              취소
            </Button>
          </div>
        </div>
      )}

      {/* 사이트 목록 */}
      <div className="bg-card rounded border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🌐</span>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-foreground">등록된 뉴스 소스</h2>
            <p className="text-xs text-muted-foreground">총 {sites.length}개 사이트</p>
          </div>
        </div>

        {sites.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-sm border-2 border-dashed border-muted-foreground/25">
            <div className="w-12 h-12 bg-muted-foreground/20 rounded flex items-center justify-center mx-auto mb-3">
              <span className="text-muted-foreground text-lg">📰</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              등록된 뉴스 소스가 없습니다
            </h3>
            <p className="text-muted-foreground mb-3 text-xs">
              새 사이트를 추가하여 뉴스레터를 시작하세요
            </p>
            <Button
              onClick={() => setIsAddingNewSite(true)}
              className="font-semibold py-2 px-3 rounded-sm transition-all duration-200 text-xs"
            >
              첫 번째 사이트 추가하기
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {sites.map((site) => (
              <div
                key={site.id}
                className="border border-border rounded-sm p-4 hover:bg-accent transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{site.name}</h4>
                      <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">
                        {site.category}
                      </span>
                      <button
                        onClick={() => toggleSiteStatus(site.id)}
                        className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                          site.status === "활성"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                            : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50"
                        }`}
                      >
                        {site.status}
                      </button>
                    </div>

                    <div className="mb-2">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-xs font-medium break-all hover:underline"
                      >
                        {site.url}
                      </a>
                    </div>

                    {site.description && (
                      <p className="text-muted-foreground text-xs mb-3 leading-relaxed">
                        {site.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded"></span>
                        마지막 수집: {site.lastCrawled}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded"></span>
                        수집된 기사: {site.articlesCount}개
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleTestCrawl(site.id)}
                      variant="outline"
                      size="sm"
                      className="px-3 py-1.5 rounded-sm text-xs font-medium"
                      title="연결 상태 테스트"
                    >
                      테스트
                    </Button>
                    <Button
                      onClick={() => handleDeleteSite(site.id)}
                      variant="destructive"
                      size="sm"
                      className="px-3 py-1.5 rounded-sm text-xs font-medium"
                      title="사이트 삭제"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 도움말 */}
      <div className="bg-primary/5 border border-primary/20 rounded p-4">
        <h3 className="text-primary text-sm font-semibold mb-2 flex items-center gap-2">
          💡 사용 팁
        </h3>
        <ul className="text-primary/80 text-xs space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            RSS 피드가 있는 사이트를 추가하면 더 정확한 수집이 가능합니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            비활성 상태의 사이트는 뉴스 수집에서 제외됩니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            테스트 버튼으로 사이트 연결 상태를 확인할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            카테고리별로 사이트를 분류하여 관리하세요
          </li>
        </ul>
      </div>
    </div>
  );
}
