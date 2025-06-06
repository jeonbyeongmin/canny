"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";

interface UserSettings {
  name: string;
  company?: string;
  timezone?: string;
  language?: string;
  newsletterTone?: string;
  newsletterLength?: string;
  newsletterFormat?: string;
  newsletterMaxArticles?: number;
  newsletterIncludeSummary?: boolean;
  gptConfigured: boolean;
}

interface Site {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export default function PersonalizedNewsletterPage() {
  const { user } = useAuth();
  const router = useRouter();

  // 상태 관리
  const [topics, setTopics] = useState<string[]>([""]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [usePersonalization, setUsePersonalization] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 사용자 설정 및 사이트 정보
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [userSites, setUserSites] = useState<Site[]>([]);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  // 설정 데이터 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoadingSettings(true);

        // 사용자 설정 로드
        const settingsResponse = await fetch("/api/auth/user/settings");
        if (settingsResponse.ok) {
          const settings = await settingsResponse.json();
          setUserSettings(settings);
        }

        // 사용자 사이트 로드
        const sitesResponse = await fetch("/api/sites");
        if (sitesResponse.ok) {
          const sites = await sitesResponse.json();
          setUserSites(sites);
        }
      } catch (error) {
        console.error("사용자 데이터 로드 오류:", error);
      } finally {
        setIsLoadingSettings(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  // GPT 설정 확인
  useEffect(() => {
    if (userSettings && !userSettings.gptConfigured) {
      router.push("/settings?menu=gpt");
    }
  }, [userSettings, router]);

  const addTopic = () => {
    setTopics([...topics, ""]);
  };

  const removeTopic = (index: number) => {
    if (topics.length > 1) {
      setTopics(topics.filter((_, i) => i !== index));
    }
  };

  const updateTopic = (index: number, value: string) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  const handleGenerate = async () => {
    const validTopics = topics.filter((topic) => topic.trim() !== "");

    if (validTopics.length === 0) {
      setError("최소 하나 이상의 주제를 입력해주세요.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter/generate-personalized", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topics: validTopics,
          additionalInstructions,
          usePersonalization,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/newsletter/${data.newsletter.id}`);
      } else {
        setError(data.error || "뉴스레터 생성 중 오류가 발생했습니다.");
      }
    } catch {
      setError("뉴스레터 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-muted-foreground">설정을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userSettings?.gptConfigured) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert>
          <AlertDescription>
            GPT 설정이 필요합니다. 설정 페이지로 이동하여 OpenAI API 키를 설정해주세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">개인화 뉴스레터 생성</h1>
        <p className="text-muted-foreground">
          당신의 설정과 관심사를 바탕으로 맞춤형 뉴스레터를 생성합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 입력 폼 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 주제 입력 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">주제 설정</CardTitle>
              <CardDescription>관심 있는 주제들을 입력해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topics.map((topic, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    placeholder={`주제 ${index + 1}`}
                    className="flex-1"
                  />
                  {topics.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTopic(index)}
                    >
                      제거
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTopic} className="w-full">
                + 주제 추가
              </Button>
            </CardContent>
          </Card>

          {/* 추가 지침 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">추가 지침 (선택사항)</CardTitle>
              <CardDescription>특별한 요구사항이나 스타일을 명시해주세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="예: 기술 트렌드에 대한 비판적 시각을 포함해주세요..."
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* 개인화 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">개인화 옵션</CardTitle>
              <CardDescription>개인화된 설정을 적용할지 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="personalization" className="text-sm font-medium">
                    개인화 사용
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    톤, 길이, 포맷 등 개인 설정을 적용합니다.
                  </p>
                </div>
                <Switch
                  id="personalization"
                  checked={usePersonalization}
                  onCheckedChange={setUsePersonalization}
                />
              </div>
            </CardContent>
          </Card>

          {/* 오류 메시지 */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 생성 버튼 */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3"
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                생성 중...
              </div>
            ) : (
              "뉴스레터 생성"
            )}
          </Button>
        </div>

        {/* 사이드바 - 현재 설정 표시 */}
        <div className="space-y-6">
          {/* 사용자 프로필 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">사용자 프로필</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">이름</Label>
                <p className="text-sm font-medium">{userSettings.name}</p>
              </div>
              {userSettings.company && (
                <div>
                  <Label className="text-xs text-muted-foreground">회사</Label>
                  <p className="text-sm font-medium">{userSettings.company}</p>
                </div>
              )}
              <div>
                <Label className="text-xs text-muted-foreground">언어</Label>
                <p className="text-sm font-medium">
                  {userSettings.language === "ko" ? "한국어" : "English"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 뉴스레터 설정 */}
          {usePersonalization && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">뉴스레터 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">톤</Label>
                  <Badge variant="secondary" className="ml-2">
                    {userSettings.newsletterTone || "Neutral"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">길이</Label>
                  <Badge variant="secondary" className="ml-2">
                    {userSettings.newsletterLength || "Medium"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">포맷</Label>
                  <Badge variant="secondary" className="ml-2">
                    {userSettings.newsletterFormat || "Classic"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">최대 기사</Label>
                  <p className="text-sm font-medium">
                    {userSettings.newsletterMaxArticles || 10}개
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 관심 소스 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">관심 뉴스 소스</CardTitle>
            </CardHeader>
            <CardContent>
              {userSites.length > 0 ? (
                <div className="space-y-2">
                  {userSites.slice(0, 5).map((site) => (
                    <div key={site.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{site.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {site.category}
                      </Badge>
                    </div>
                  ))}
                  {userSites.length > 5 && (
                    <p className="text-xs text-muted-foreground">+{userSites.length - 5}개 더</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">등록된 뉴스 소스가 없습니다.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
