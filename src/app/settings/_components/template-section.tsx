"use client";

import { render } from "@react-email/render";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
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

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground mb-1">이메일 템플릿</h1>
        <p className="text-muted-foreground text-xs">
          다양한 목적에 맞는 이메일 템플릿을 선택하고 미리보기로 확인하세요
        </p>
      </div>

      {/* 템플릿 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.name}
            className="bg-card rounded border border-border p-4 hover:bg-accent transition-all duration-200 cursor-pointer group"
            onClick={() => handlePreview(template.name, template.component)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground text-sm">
                  {getTemplateIcon(template.name)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {template.name} Template
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {template.name === "Simple" && "기본적인 알림 및 메시지 전달용 템플릿입니다."}
                  {template.name === "Promotional" &&
                    "제품 또는 서비스 프로모션에 적합한 템플릿입니다."}
                  {template.name === "Transactional" &&
                    "주문 확인, 영수증 등 거래 관련 정보 전달용 템플릿입니다."}
                  {template.name === "Newsletter" &&
                    "정기적인 뉴스레터 발송에 적합한 템플릿입니다."}
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(template.name, template.component);
                  }}
                  className="font-semibold py-1.5 px-4 rounded-sm transition-all duration-200 text-xs"
                >
                  미리보기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 미리보기 섹션 */}
      {selectedTemplate && previewHtml && (
        <div className="bg-card rounded border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-xs">
                {getTemplateIcon(selectedTemplate)}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {selectedTemplate} Template 미리보기
            </h3>
          </div>

          <div className="bg-muted rounded-sm p-3 border border-border">
            <div className="w-full h-[500px] bg-card rounded-sm overflow-hidden border border-border">
              <iframe
                srcDoc={previewHtml}
                title={`${selectedTemplate} Preview`}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                setSelectedTemplate(null);
                setPreviewHtml("");
              }}
              variant="outline"
              className="font-semibold py-2 px-4 rounded-sm transition-colors text-xs"
            >
              미리보기 닫기
            </Button>
          </div>
        </div>
      )}

      {/* 도움말 섹션 */}
      <div className="bg-primary/5 border border-primary/20 rounded p-4">
        <h3 className="text-primary text-sm font-semibold mb-2 flex items-center gap-2">
          💡 템플릿 사용 가이드
        </h3>
        <ul className="text-primary/80 text-xs space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>각 템플릿은 특정 용도에 최적화되어
            있으니 목적에 맞게 선택하세요
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            미리보기를 통해 실제 이메일 모습을 확인할 수 있습니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            템플릿은 모바일과 데스크톱 환경 모두에서 최적화되어 표시됩니다
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary/60 mt-0.5">•</span>
            Newsletter 템플릿은 GPT 설정과 연동되어 자동 생성됩니다
          </li>
        </ul>
      </div>
    </div>
  );
}
