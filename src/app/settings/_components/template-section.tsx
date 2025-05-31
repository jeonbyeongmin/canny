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

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full px-4 md:px-0 md:w-3/4 lg:w-2/3 xl:w-1/2 py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Email Templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePreview(template.name, template.component)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name} Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                {template.name === "Simple" && "기본적인 알림 및 메시지 전달용 템플릿입니다."}
                {template.name === "Promotional" &&
                  "제품 또는 서비스 프로모션에 적합한 템플릿입니다."}
                {template.name === "Transactional" &&
                  "주문 확인, 영수증 등 거래 관련 정보 전달용 템플릿입니다."}
                {template.name === "Newsletter" && "정기적인 뉴스레터 발송에 적합한 템플릿입니다."}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handlePreview(template.name, template.component);
                }}
                className="w-full bg-[#0c7ff2] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                미리보기
              </button>
            </div>
          ))}
        </div>

        {selectedTemplate && previewHtml && (
          <div className="mt-10 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedTemplate} Template 미리보기
            </h3>
            <div className="w-full h-[600px] border border-gray-300 rounded-md overflow-hidden">
              <iframe
                srcDoc={previewHtml}
                title={`${selectedTemplate} Preview`}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
