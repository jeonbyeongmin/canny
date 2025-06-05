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
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">GPT 설정</h1>
        <p className="text-slate-600">
          OpenAI GPT 모델을 사용한 뉴스 요약 및 분석 설정을 관리하세요
        </p>
      </div>

      {/* API 키 설정 */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🔑</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">API 키 설정</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">OpenAI API 키</label>
            <div className="relative">
              <input
                type={isApiKeyVisible ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full h-11 px-4 pr-12 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {isApiKeyVisible ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              OpenAI 계정에서 발급받은 API 키를 입력하세요. 안전하게 암호화되어 저장됩니다.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleTestConnection}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              연결 테스트
            </button>
          </div>
        </div>
      </div>

      {/* 모델 설정 */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">모델 설정</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">GPT 모델 선택</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
            >
              {models.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              GPT-4는 더 정확하지만 비용이 높고, GPT-3.5 Turbo는 빠르고 저렴합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Temperature: {temperature}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-500">창의성 수준 (0.0: 일관성, 2.0: 창의성)</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Max Tokens: {maxTokens}
              </label>
              <input
                type="range"
                min="100"
                max="4000"
                step="100"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-500">응답 최대 길이 (토큰 수)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 시스템 프롬프트 */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">📝</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">시스템 프롬프트</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">기본 지침</label>
            <textarea
              placeholder="예: 당신은 전문적인 뉴스레터 작성자입니다. 간결하고 흥미로운 방식으로 기술 뉴스를 요약해주세요."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
            />
            <p className="text-xs text-slate-500">
              GPT가 뉴스레터 생성 시 따라야 할 기본 지침을 설정하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 사용 통계 */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">📊</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">사용 통계</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-slate-800 mb-1">1,247</div>
            <div className="text-sm text-slate-600">이번 달 토큰 사용</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-slate-800 mb-1">$12.47</div>
            <div className="text-sm text-slate-600">이번 달 비용</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-slate-800 mb-1">23</div>
            <div className="text-sm text-slate-600">생성된 뉴스레터</div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-between pt-6 border-t border-slate-200">
        <button
          onClick={handleReset}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          설정 초기화
        </button>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          변경사항 저장
        </button>
      </div>

      {/* 도움말 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-800 text-lg font-semibold mb-3 flex items-center gap-2">
          💡 사용 팁
        </h3>
        <ul className="text-blue-700 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            API 키는 OpenAI 계정의 API Keys 섹션에서 발급받을 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            Temperature는 0.7-1.0 사이에서 시작하여 조정해보세요
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            시스템 프롬프트로 뉴스레터의 톤앤매너를 조절할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            사용량을 정기적으로 확인하여 비용을 관리하세요
          </li>
        </ul>
      </div>
    </div>
  );
}
