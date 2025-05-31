"use client";

import { render } from "@react-email/render";

import React, { useState } from "react";

import NewsletterTemplate from "@/email-templates/newsletter-template";
import PromotionalTemplate from "@/email-templates/promotional-template";
import SimpleTemplate from "@/email-templates/simple-template";
import TransactionalTemplate from "@/email-templates/transactional-template";

// 각 템플릿의 props 타입 정의
interface SimpleTemplateProps {
  previewText?: string;
  title: string;
  name: string;
  message: string;
  actionLink?: string;
  actionText?: string;
}

interface PromotionalTemplateProps {
  previewText?: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  salePrice: string;
  originalPrice: string;
  discountPercentage: string;
  callToActionUrl: string;
  companyName: string;
  companyAddress: string;
  unsubscribeUrl: string;
}

interface TransactionalTemplateProps {
  previewText?: string;
  title: string;
  name: string;
  introText: string;
  items: Array<{ name: string; quantity: number; price: string }>;
  totalAmount: string;
  supportUrl: string;
  companyName: string;
  companyAddress: string;
  unsubscribeUrl: string;
}

interface NewsletterTemplateProps {
  previewText?: string;
  title: string;
  content: React.ReactNode;
  companyName?: string;
  unsubscribeUrl?: string;
}

// Helper to generate dummy props for each template type
const getDummyProps = (
  templateName: string,
):
  | SimpleTemplateProps
  | PromotionalTemplateProps
  | TransactionalTemplateProps
  | NewsletterTemplateProps => {
  switch (templateName) {
    case "Simple":
      return {
        previewText: "간단한 알림 메일입니다.",
        title: "중요 알림",
        name: "홍길동",
        message: "새로운 기능이 추가되었으니 확인해주세요.",
        actionLink: "https://example.com/features",
        actionText: "기능 확인하기",
      } as SimpleTemplateProps;
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
      } as PromotionalTemplateProps;
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
        companyAddress: "서울특별시 강남구 테헤란로 123",
        unsubscribeUrl: "https://example.com/unsubscribe",
      } as TransactionalTemplateProps;
    case "Newsletter":
      return {
        previewText: "이번 주 최신 뉴스와 업데이트를 확인하세요! 🚀",
        title: "🌟 Weekly Newsletter",
        content: (
          <>
            <p>안녕하세요!</p>
            <p>이번 주에 있었던 주요 업데이트와 새로운 소식들을 소개합니다.</p>
            <h3>새로운 기능 출시</h3>
            <p>사용자 요청에 따라 새로운 기능을 출시했습니다. 더 나은 경험을 제공합니다.</p>
            <h3>성능 개선 업데이트</h3>
            <p>시스템 성능이 30% 향상되었습니다. 더 빠르고 안정적인 서비스를 경험하세요.</p>
            <p>더 많은 소식과 업데이트는 웹사이트에서 확인하세요!</p>
          </>
        ),
        companyName: "Great Pleasure Inc.",
        unsubscribeUrl: "https://example.com/unsubscribe",
      } as NewsletterTemplateProps;
    default:
      throw new Error(`Unknown template: ${templateName}`);
  }
};

export default function NewsletterSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [htmlPreview, setHtmlPreview] = useState<string>("");

  const templates = [
    { name: "Simple", description: "간단한 알림용 템플릿" },
    { name: "Promotional", description: "프로모션 및 마케팅용" },
    { name: "Transactional", description: "주문 확인 및 거래용" },
    { name: "Newsletter", description: "뉴스레터 및 업데이트용" },
  ];

  const handlePreview = async (templateName: string) => {
    const dummyProps = getDummyProps(templateName);
    let html = "";

    switch (templateName) {
      case "Simple":
        html = await render(<SimpleTemplate {...(dummyProps as SimpleTemplateProps)} />);
        break;
      case "Promotional":
        html = await render(<PromotionalTemplate {...(dummyProps as PromotionalTemplateProps)} />);
        break;
      case "Transactional":
        html = await render(
          <TransactionalTemplate {...(dummyProps as TransactionalTemplateProps)} />,
        );
        break;
      case "Newsletter":
        html = await render(<NewsletterTemplate {...(dummyProps as NewsletterTemplateProps)} />);
        break;
    }

    setHtmlPreview(html);
    setSelectedTemplate(templateName);
  };

  return (
    <div className="flex flex-col py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
            뉴스레터 설정
          </p>
        </div>

        {/* 템플릿 선택 섹션 */}
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          템플릿 선택
        </h3>
        <div className="flex flex-col gap-3 p-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="flex flex-col gap-3 rounded-xl border border-[#dbe0e6] p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#111418] text-base font-bold leading-tight">
                    {template.name}
                  </h4>
                  <p className="text-[#60758a] text-sm font-normal leading-normal">
                    {template.description}
                  </p>
                </div>
                <button
                  onClick={() => handlePreview(template.name)}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">미리보기</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 미리보기 결과 */}
        {selectedTemplate && htmlPreview && (
          <div className="p-4">
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
              {selectedTemplate} 템플릿 미리보기
            </h3>
            <div className="border border-[#dbe0e6] rounded-xl p-4 bg-white">
              <iframe
                srcDoc={htmlPreview}
                className="w-full h-96 border-0"
                title={`${selectedTemplate} 템플릿 미리보기`}
              />
            </div>
          </div>
        )}

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Tone
        </h3>
        <div className="flex flex-wrap gap-3 p-4">
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Casual
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Neutral
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Formal
            <input type="radio" className="invisible absolute" name="tone" />
          </label>
        </div>

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Personality
        </h3>
        <div className="flex flex-wrap gap-3 p-4">
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Informative
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Humorous
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
          <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe0e6] px-4 h-11 text-[#111418] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#0c7ff2] relative cursor-pointer">
            Thoughtful
            <input type="radio" className="invisible absolute" name="personality" />
          </label>
        </div>

        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Topics
        </h3>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 bg-[image:--select-button-svg] placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal">
              <option value="one">Select a topic</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
          </label>
        </div>

        <div className="flex px-4 py-3 justify-end">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
