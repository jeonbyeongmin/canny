"use client";

import React, { useState } from "react";

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
    // 설정 저장 로직
    console.log("GPT 설정 저장:", {
      apiKey,
      selectedModel,
      temperature,
      maxTokens,
      systemPrompt,
    });
  };

  const handleTestConnection = () => {
    // API 연결 테스트 로직
    console.log("API 연결 테스트");
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[600px] max-w-[600px] py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
            GPT 설정
          </p>
        </div>

        {/* API 키 설정 */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          API 키
        </h3>
        <div className="flex max-w-[580px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <div className="relative">
              <input
                type={isApiKeyVisible ? "text" : "password"}
                placeholder="OpenAI API 키를 입력하세요"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] pr-[50px] text-base font-normal leading-normal"
              />
              <button
                type="button"
                onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#60758a] hover:text-[#111418]"
              >
                {isApiKeyVisible ? "🙈" : "👁️"}
              </button>
            </div>
          </label>
          <button
            onClick={handleTestConnection}
            className="flex min-w-[84px] max-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">연결 테스트</span>
          </button>
        </div>

        {/* 모델 선택 */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          모델 선택
        </h3>
        <div className="flex max-w-[580px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
            >
              {models.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* 파라미터 설정 */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          파라미터 설정
        </h3>

        {/* Temperature */}
        <div className="px-4 py-3">
          <label className="flex flex-col gap-2">
            <span className="text-[#111418] text-sm font-medium">
              Temperature: {temperature}
            </span>
            <span className="text-[#60758a] text-xs">
              값이 높을수록 더 창의적이고 다양한 응답을 생성합니다 (0.0 - 2.0)
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#dbe0e6] rounded-lg appearance-none cursor-pointer slider"
            />
          </label>
        </div>

        {/* Max Tokens */}
        <div className="px-4 py-3">
          <label className="flex flex-col gap-2">
            <span className="text-[#111418] text-sm font-medium">
              Max Tokens: {maxTokens}
            </span>
            <span className="text-[#60758a] text-xs">
              응답에서 생성할 최대 토큰 수입니다
            </span>
            <input
              type="range"
              min="100"
              max="4000"
              step="100"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full h-2 bg-[#dbe0e6] rounded-lg appearance-none cursor-pointer slider"
            />
          </label>
        </div>

        {/* 시스템 프롬프트 */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          시스템 프롬프트
        </h3>
        <div className="flex max-w-[580px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <span className="text-[#60758a] text-xs mb-2">
              뉴스레터 생성 시 GPT가 따라야 할 기본 지침을 설정하세요
            </span>
            <textarea
              placeholder="예: 당신은 전문적인 뉴스레터 작성자입니다. 간결하고 흥미로운 방식으로 기술 뉴스를 요약해주세요."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* 저장 버튼 */}
        <div className="flex px-4 py-3 justify-end gap-3">
          <button
            onClick={() => {
              setApiKey("");
              setSelectedModel("gpt-4");
              setTemperature(0.7);
              setMaxTokens(2000);
              setSystemPrompt("");
            }}
            className="flex min-w-[84px] max-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">초기화</span>
          </button>
          <button
            onClick={handleSave}
            className="flex min-w-[84px] max-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">저장</span>
          </button>
        </div>

        {/* 도움말 섹션 */}
        <div className="mx-4 mt-6 p-4 bg-[#f8f9fb] rounded-xl border border-[#dbe0e6]">
          <h4 className="text-[#111418] text-sm font-bold mb-2">💡 도움말</h4>
          <ul className="text-[#60758a] text-xs space-y-1">
            <li>
              • OpenAI API 키는{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0c7ff2] underline"
              >
                OpenAI 플랫폼
              </a>
              에서 발급받을 수 있습니다.
            </li>
            <li>
              • Temperature가 높을수록 더 창의적이지만 일관성이 떨어질 수
              있습니다.
            </li>
            <li>
              • Max Tokens는 응답 길이를 제한하며, 비용에도 영향을 줍니다.
            </li>
            <li>• 시스템 프롬프트는 GPT의 역할과 응답 스타일을 정의합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
