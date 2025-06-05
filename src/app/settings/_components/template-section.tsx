"use client";

import { render } from "@react-email/render";

import React, { useState } from "react";

import NewsletterTemplate from "@/email-templates/newsletter-template";
import PromotionalTemplate from "@/email-templates/promotional-template";
import SimpleTemplate from "@/email-templates/simple-template";
import TransactionalTemplate from "@/email-templates/transactional-template";

// Helper to generate dummy props for each template type
const getDummyProps = (templateName: string) => {
  switch (templateName) {
    case "Simple":
      return {
        previewText: "간단한 알림 메일입니다.",
        title: "중요 알림",
        name: "홍길동",
        message: "새로운 기능이 추가되었으니 확인해주세요.",
        actionLink: "https://example.com/features",
        actionText: "기능 확인하기",
      };
    case "Promotional":
      return {
        previewText: "특별 할인 프로모션!",
        productName: "멋진 우리 제품",
        productDescription:
          "지금까지 경험하지 못한 특별한 제품을 만나보세요. 한정 기간 특별 할인이 진행 중입니다!",
        productImageUrl: "https://via.placeholder.com/600x400?text=Product+Image",
        salePrice: "₩50,000",
        originalPrice: "₩100,000",
        discountPercentage: "50%",
        callToActionUrl: "https://example.com/product/123",
        companyName: "Great Pleasure Inc.",
        companyAddress: "서울특별시 강남구 테헤란로 123",
        unsubscribeUrl: "https://example.com/unsubscribe",
      };
    case "Transactional":
      return {
        previewText: "주문 확인 및 영수증",
        title: "주문해주셔서 감사합니다!",
        name: "김철수",
        introText: "고객님의 주문이 성공적으로 처리되었습니다. 주문 상세 내역은 다음과 같습니다.",
        items: [
          { name: "상품 A", quantity: 2, price: "₩10,000" },
          { name: "상품 B", quantity: 1, price: "₩25,000" },
        ],
        totalAmount: "₩45,000",
        supportUrl: "https://example.com/support",
        companyName: "Great Pleasure Store",
        orderId: "ORD-20250531-001",
      };
    case "Newsletter":
      return {
        previewText: "주간 뉴스레터 - 이번 주의 주요 소식",
        title: "주간 뉴스레터",
        content: React.createElement(
          "div",
          {},
          React.createElement(
            "p",
            {
              style: {
                marginBottom: "16px",
                color: "#6b21a8",
                fontSize: "16px",
                lineHeight: "24px",
              },
            },
            "안녕하세요! 이번 주의 주요 소식을 전해드립니다.",
          ),
          React.createElement(
            "h3",
            {
              style: {
                color: "#581c87",
                marginTop: "24px",
                marginBottom: "12px",
                fontSize: "20px",
                fontWeight: "600",
              },
            },
            "새로운 기능 출시",
          ),
          React.createElement(
            "p",
            {
              style: {
                marginBottom: "16px",
                color: "#6b21a8",
                fontSize: "16px",
                lineHeight: "24px",
              },
            },
            "사용자 경험을 향상시키는 새로운 기능들이 추가되었습니다. 더욱 편리하고 직관적인 인터페이스로 업그레이드되었습니다.",
          ),
          React.createElement(
            "h3",
            {
              style: {
                color: "#581c87",
                marginTop: "24px",
                marginBottom: "12px",
                fontSize: "20px",
                fontWeight: "600",
              },
            },
            "이벤트 안내",
          ),
          React.createElement(
            "p",
            {
              style: {
                marginBottom: "16px",
                color: "#6b21a8",
                fontSize: "16px",
                lineHeight: "24px",
              },
            },
            "다음 주에 진행될 특별 이벤트에 참여해보세요! 다양한 혜택과 선물이 준비되어 있습니다.",
          ),
        ),
        companyName: "Great Pleasure Inc.",
        unsubscribeUrl: "https://example.com/unsubscribe",
      };
    default:
      return {};
  }
};

const templates = [
  { name: "Simple", component: SimpleTemplate },
  { name: "Promotional", component: PromotionalTemplate },
  { name: "Transactional", component: TransactionalTemplate },
  { name: "Newsletter", component: NewsletterTemplate },
];

export default function TemplateSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");

  const handlePreview = async (templateName: string, TemplateComponent: React.ElementType) => {
    setSelectedTemplate(templateName);
    const props = getDummyProps(templateName);
    const html = await render(React.createElement(TemplateComponent, props), { pretty: true });
    setPreviewHtml(html);
  };

  const getTemplateIcon = (templateName: string) => {
    switch (templateName) {
      case "Simple":
        return "📄";
      case "Promotional":
        return "🎯";
      case "Transactional":
        return "📋";
      case "Newsletter":
        return "📰";
      default:
        return "📧";
    }
  };

  const getTemplateGradient = (templateName: string) => {
    switch (templateName) {
      case "Simple":
        return "from-blue-500 to-cyan-600";
      case "Promotional":
        return "from-green-500 to-emerald-600";
      case "Transactional":
        return "from-purple-500 to-pink-600";
      case "Newsletter":
        return "from-orange-500 to-red-600";
      default:
        return "from-slate-500 to-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">이메일 템플릿</h1>
        <p className="text-slate-600">
          다양한 목적에 맞는 이메일 템플릿을 선택하고 미리보기로 확인하세요
        </p>
      </div>

      {/* 템플릿 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.name}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-slate-300"
            onClick={() => handlePreview(template.name, template.component)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${getTemplateGradient(template.name)} rounded-xl flex items-center justify-center shadow-sm`}
              >
                <span className="text-white text-lg">{getTemplateIcon(template.name)}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                  {template.name} Template
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {template.name === "Simple" && "기본적인 알림 및 메시지 전달용 템플릿입니다."}
                  {template.name === "Promotional" &&
                    "제품 또는 서비스 프로모션에 적합한 템플릿입니다."}
                  {template.name === "Transactional" &&
                    "주문 확인, 영수증 등 거래 관련 정보 전달용 템플릿입니다."}
                  {template.name === "Newsletter" &&
                    "정기적인 뉴스레터 발송에 적합한 템플릿입니다."}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(template.name, template.component);
                  }}
                  className={`bg-gradient-to-r ${getTemplateGradient(template.name)} hover:scale-[1.02] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg active:scale-[0.98]`}
                >
                  미리보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 미리보기 섹션 */}
      {selectedTemplate && previewHtml && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${getTemplateGradient(selectedTemplate)} rounded-full flex items-center justify-center`}
            >
              <span className="text-white text-sm">{getTemplateIcon(selectedTemplate)}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              {selectedTemplate} Template 미리보기
            </h3>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="w-full h-[600px] bg-white rounded-md overflow-hidden shadow-sm border border-slate-200">
              <iframe
                srcDoc={previewHtml}
                title={`${selectedTemplate} Preview`}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setSelectedTemplate(null);
                setPreviewHtml("");
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-lg transition-colors"
            >
              미리보기 닫기
            </button>
          </div>
        </div>
      )}

      {/* 도움말 섹션 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-blue-800 text-lg font-semibold mb-3 flex items-center gap-2">
          💡 템플릿 사용 가이드
        </h3>
        <ul className="text-blue-700 text-sm space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>각 템플릿은 특정 용도에 최적화되어 있으니
            목적에 맞게 선택하세요
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            미리보기를 통해 실제 이메일 모습을 확인할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            템플릿은 모바일과 데스크톱 환경 모두에서 최적화되어 표시됩니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            Newsletter 템플릿은 GPT 설정과 연동되어 자동 생성됩니다
          </li>
        </ul>
      </div>
    </div>
  );
}
