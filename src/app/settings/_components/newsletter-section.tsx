"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";

export default function NewsletterSection() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // 뉴스레터 설정 상태
  const [settings, setSettings] = useState({
    tone: "Neutral",
    length: "Medium",
    format: "Classic",
    maxArticles: 10,
    includeSummary: true,
    frequency: "daily",
    deliveryTime: "09:00",
  });

  // 사용자 데이터 로드
  useEffect(() => {
    if (user) {
      setSettings({
        tone: user.newsletterTone || "Neutral",
        length: user.newsletterLength || "Medium",
        format: user.newsletterFormat || "Classic",
        maxArticles: user.newsletterMaxArticles || 10,
        includeSummary: user.newsletterIncludeSummary ?? true,
        frequency: user.newsletterFrequency || "daily",
        deliveryTime: user.newsletterDeliveryTime || "09:00",
      });
    }
  }, [user]);

  // 설정 저장 함수
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsletterTone: settings.tone,
          newsletterLength: settings.length,
          newsletterFormat: settings.format,
          newsletterMaxArticles: settings.maxArticles,
          newsletterIncludeSummary: settings.includeSummary,
          newsletterFrequency: settings.frequency,
          newsletterDeliveryTime: settings.deliveryTime,
        }),
      });

      if (!response.ok) {
        throw new Error("설정을 저장하는데 실패했습니다");
      }

      router.refresh();
      alert("뉴스레터 설정이 저장되었습니다!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("설정을 저장하는데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground mb-1">뉴스레터 설정</h1>
        <p className="text-muted-foreground text-xs">
          이메일 템플릿을 선택하고 뉴스레터 설정을 관리하세요
        </p>
      </div>

      {/* 템플릿 선택 섹션 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
              ✉
            </span>
            템플릿 선택
          </h2>
          <p className="text-muted-foreground text-xs mb-4">
            용도에 맞는 이메일 템플릿을 선택하고 미리보기를 확인하세요
          </p>
        </div>

        {/* 설정 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tone 설정 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 rounded text-orange-600 dark:text-orange-400 text-xs flex items-center justify-center">
                🎭
              </span>
              톤
            </h3>
            <RadioGroup
              className="flex flex-wrap gap-2"
              value={settings.tone}
              onValueChange={(value) => setSettings({ ...settings, tone: value })}
            >
              {["Casual", "Neutral", "Formal"].map((tone) => (
                <div key={tone} className="flex items-center space-x-2">
                  <RadioGroupItem value={tone} id={`tone-${tone}`} className="sr-only peer" />
                  <Label
                    htmlFor={`tone-${tone}`}
                    className="flex items-center justify-center px-3 py-2 border border-border rounded-sm cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                  >
                    {tone}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Length 설정 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-600 dark:text-purple-400 text-xs flex items-center justify-center">
                📏
              </span>
              길이
            </h3>
            <RadioGroup
              className="flex flex-wrap gap-2"
              value={settings.length}
              onValueChange={(value) => setSettings({ ...settings, length: value })}
            >
              {["Short", "Medium", "Long"].map((length) => (
                <div key={length} className="flex items-center space-x-2">
                  <RadioGroupItem value={length} id={`length-${length}`} className="sr-only peer" />
                  <Label
                    htmlFor={`length-${length}`}
                    className="flex items-center justify-center px-3 py-2 border border-border rounded-sm cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                  >
                    {length}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Format 선택 */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded text-green-600 dark:text-green-400 text-xs flex items-center justify-center">
              📝
            </span>
            형식
          </Label>
          <div className="max-w-md">
            <Select
              value={settings.format}
              onValueChange={(value) => setSettings({ ...settings, format: value })}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="형식을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Classic">클래식</SelectItem>
                <SelectItem value="Modern">모던</SelectItem>
                <SelectItem value="Minimal">미니멀</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 최대 기사 수 설정 */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center">
              📊
            </span>
            최대 기사 수: {settings.maxArticles}
          </Label>
          <div className="max-w-md">
            <Slider
              value={[settings.maxArticles]}
              onValueChange={([value]) => setSettings({ ...settings, maxArticles: value })}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5개</span>
              <span>20개</span>
            </div>
          </div>
        </div>

        {/* 요약 포함 여부 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/30 rounded text-yellow-600 dark:text-yellow-400 text-xs flex items-center justify-center">
                ✨
              </span>
              요약 포함
            </Label>
            <Switch
              checked={settings.includeSummary}
              onCheckedChange={(checked) => setSettings({ ...settings, includeSummary: checked })}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            AI가 생성한 기사 요약을 뉴스레터에 포함합니다
          </p>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button className="text-xs" size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중..." : "설정 저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}
