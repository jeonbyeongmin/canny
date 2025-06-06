"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { updateGptSettings } from "@/lib/auth";

export default function GptSection() {
  const router = useRouter();
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(
    null,
  );

  // 사용자의 기존 GPT 설정 로드
  useEffect(() => {
    if (user) {
      if (user.openaiApiKey) setApiKey(user.openaiApiKey);
      if (user.gptModel) setSelectedModel(user.gptModel);
      if (user.gptTemperature !== undefined && user.gptTemperature !== null) {
        setTemperature(user.gptTemperature);
      }
      if (user.gptMaxTokens !== undefined && user.gptMaxTokens !== null) {
        setMaxTokens(user.gptMaxTokens);
      }
      if (user.gptSystemPrompt) setSystemPrompt(user.gptSystemPrompt);
    }
  }, [user]);

  const models = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ];

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // API 키가 비어있는지 확인
      if (!apiKey || apiKey.trim() === "") {
        alert("OpenAI API 키를 입력해주세요.");
        return;
      }

      // 서버에 설정 저장 요청
      const response = await fetch("/api/auth/user/gpt-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openaiApiKey: apiKey,
          gptModel: selectedModel,
          gptTemperature: temperature,
          gptMaxTokens: maxTokens,
          gptSystemPrompt: systemPrompt,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "설정 저장 중 오류가 발생했습니다.");
      }

      // 성공적으로 저장되면 페이지 새로고침 또는 리다이렉트
      router.refresh();
      alert("GPT 설정이 저장되었습니다.");
    } catch (error) {
      console.error("GPT 설정 저장 오류:", error);
      alert(
        `저장 실패: ${error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."}`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    // API 키 검증
    if (!apiKey || apiKey.trim() === "") {
      setTestResult({ success: false, message: "API 키를 입력해주세요." });
      return;
    }

    try {
      setTestResult(null);
      const response = await fetch("/api/auth/user/test-openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult({ success: true, message: "OpenAI API 연결 테스트 성공!" });
      } else {
        setTestResult({ success: false, message: data.message || "API 연결 테스트 실패" });
      }
    } catch (error) {
      console.error("API 연결 테스트 오류:", error);
      setTestResult({ success: false, message: "API 연결 테스트 중 오류가 발생했습니다." });
    }
  };

  const handleReset = () => {
    setApiKey("");
    setSelectedModel("gpt-4");
    setTemperature(0.7);
    setMaxTokens(2000);
    setSystemPrompt("");
    setTestResult(null);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground mb-1">GPT 설정</h1>
        <p className="text-muted-foreground text-xs">
          OpenAI GPT 모델을 사용한 뉴스 요약 및 분석 설정을 관리하세요
        </p>
      </div>

      {/* API 키 설정 */}
      <div className="bg-card rounded border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🔑</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">API 키 설정</h2>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium">OpenAI API 키</Label>
            <div className="relative">
              <Input
                type={isApiKeyVisible ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-9 pr-10 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isApiKeyVisible ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              OpenAI 계정에서 발급받은 API 키를 입력하세요. 안전하게 암호화되어 저장됩니다.
            </p>
          </div>

          <div className="flex gap-2 pt-3">
            <Button
              onClick={handleTestConnection}
              variant="outline"
              className="font-semibold py-2 px-4 rounded-sm transition-colors text-xs"
            >
              연결 테스트
            </Button>
          </div>

          {testResult && (
            <div
              className={`mt-4 p-3 rounded-md text-xs ${testResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              {testResult.message}
            </div>
          )}
        </div>
      </div>

      {/* 모델 설정 */}
      <div className="bg-card rounded border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">🤖</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">모델 설정</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium">GPT 모델 선택</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value} className="text-xs">
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              GPT-4는 더 정확하지만 비용이 높고, GPT-3.5 Turbo는 빠르고 저렴합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Temperature: {temperature}</Label>
              <Slider
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                min={0}
                max={2}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                창의성 수준 (0.0: 일관성, 2.0: 창의성)
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Max Tokens: {maxTokens}</Label>
              <Slider
                value={[maxTokens]}
                onValueChange={(value) => setMaxTokens(value[0])}
                min={100}
                max={4000}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">응답 최대 길이 (토큰 수)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 시스템 프롬프트 */}
      <div className="bg-card rounded border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">📝</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">시스템 프롬프트</h2>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium">기본 지침</Label>
            <Textarea
              placeholder="예: 당신은 전문적인 뉴스레터 작성자입니다. 간결하고 흥미로운 방식으로 기술 뉴스를 요약해주세요."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="resize-none text-xs"
            />
            <p className="text-xs text-muted-foreground">
              GPT가 뉴스레터 생성 시 따라야 할 기본 지침을 설정하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 사용 통계 */}
      <div className="bg-card rounded border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">📊</span>
          </div>
          <h2 className="text-base font-semibold text-foreground">사용 통계</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-sm p-3">
            <div className="text-lg font-bold text-foreground mb-1">1,247</div>
            <div className="text-xs text-muted-foreground">이번 달 토큰 사용</div>
          </div>
          <div className="bg-muted rounded-sm p-3">
            <div className="text-lg font-bold text-foreground mb-1">$12.47</div>
            <div className="text-xs text-muted-foreground">이번 달 비용</div>
          </div>
          <div className="bg-muted rounded-sm p-3">
            <div className="text-lg font-bold text-foreground mb-1">23</div>
            <div className="text-xs text-muted-foreground">생성된 뉴스레터</div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          onClick={handleReset}
          variant="outline"
          className="font-semibold py-2 px-4 rounded-sm transition-colors text-xs"
        >
          설정 초기화
        </Button>
        <Button
          onClick={handleSave}
          className="font-semibold py-2 px-6 rounded-sm transition-all duration-200 text-xs"
          disabled={isSaving}
        >
          {isSaving ? "저장 중..." : "변경사항 저장"}
        </Button>
      </div>

      {/* 도움말 */}
      <div className="bg-primary/5 border border-primary/20 rounded p-4">
        <h3 className="text-primary text-sm font-semibold mb-2 flex items-center gap-2">
          💡 사용 팁
        </h3>
        <ul className="text-primary/80 text-xs space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            API 키는 OpenAI 계정의 API Keys 섹션에서 발급받을 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            Temperature는 0.7-1.0 사이에서 시작하여 조정해보세요
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            시스템 프롬프트로 뉴스레터의 톤앤매너를 조절할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            사용량을 정기적으로 확인하여 비용을 관리하세요
          </li>
        </ul>
      </div>
    </div>
  );
}
