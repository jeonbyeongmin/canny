"use client";

import { render } from "@react-email/render";

import React, { useState } from "react";

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
            <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
              ✉
            </span>
            템플릿 선택
          </h2>
          <p className="text-muted-foreground text-xs mb-4">
            용도에 맞는 이메일 템플릿을 선택하고 미리보기를 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((template) => (
            <div
              key={template.name}
              className="group bg-card border border-border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handlePreview(template.name)}
                className="w-full text-xs"
                size="sm"
              >
                미리보기
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 미리보기 결과 */}
      {selectedTemplate && htmlPreview && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
            </div>
            <h2 className="text-base font-semibold text-foreground">
              {selectedTemplate} 템플릿 미리보기
            </h2>
          </div>
          <div className="bg-muted border border-border rounded-lg p-4">
            <div className="bg-card rounded-md shadow-sm border">
              <iframe
                srcDoc={htmlPreview}
                className="w-full h-80 border-0 rounded-md"
                title={`${selectedTemplate} 템플릿 미리보기`}
              />
            </div>
          </div>
        </div>
      )}

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
          <RadioGroup className="flex flex-wrap gap-2" defaultValue="Neutral">
            {["Casual", "Neutral", "Formal"].map((tone) => (
              <div key={tone} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={tone} 
                  id={`tone-${tone}`}
                  className="sr-only peer"
                />
                <Label
                  htmlFor={`tone-${tone}`}
                  className="flex items-center justify-center px-3 py-2 border border-border rounded-md cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                >
                  {tone}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Personality 설정 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-600 dark:text-purple-400 text-xs flex items-center justify-center">
              😊
            </span>
            성격
          </h3>
          <RadioGroup className="flex flex-wrap gap-2" defaultValue="Informative">
            {["Informative", "Humorous", "Thoughtful"].map((personality) => (
              <div key={personality} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={personality} 
                  id={`personality-${personality}`}
                  className="sr-only peer"
                />
                <Label
                  htmlFor={`personality-${personality}`}
                  className="flex items-center justify-center px-3 py-2 border border-border rounded-md cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground text-xs font-medium"
                >
                  {personality}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* 토픽 선택 */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded text-green-600 dark:text-green-400 text-xs flex items-center justify-center">
            📝
          </span>
          주제
        </Label>
        <div className="max-w-md">
          <Select>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="주제를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">기술</SelectItem>
              <SelectItem value="business">비즈니스</SelectItem>
              <SelectItem value="lifestyle">라이프스타일</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end pt-4 border-t border-border">
        <Button className="text-xs" size="sm">
          설정 저장
        </Button>
      </div>
    </div>
  );
}
