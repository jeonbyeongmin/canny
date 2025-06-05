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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export default function GptSection() {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

  const models = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  ];

  const handleSave = () => {
    console.log("GPT 설정 저장:", {
      apiKey,
      selectedModel,
      temperature,
      maxTokens,
      systemPrompt,
    });
  };

  const handleTestConnection = async () => {
    console.log("API 연결 테스트");
  };

  const handleReset = () => {
    setApiKey("");
    setSelectedModel("gpt-4");
    setTemperature(0.7);
    setMaxTokens(2000);
    setSystemPrompt("");
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
        >
          변경사항 저장
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
