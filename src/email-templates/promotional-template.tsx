import {
  Button,
  Container,
  Heading,
  Hr,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import * as React from "react";

interface PromotionalTemplateProps {
  previewText?: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  salePrice: string;
  originalPrice?: string;
  discountPercentage?: string;
  callToActionUrl: string;
  companyName?: string;
  companyAddress?: string;
  unsubscribeUrl?: string;
}

export default function PromotionalTemplate({
  previewText = "특별 할인 프로모션!",
  productName,
  productDescription,
  productImageUrl,
  salePrice,
  originalPrice,
  discountPercentage,
  callToActionUrl,
  companyName = "Great Pleasure Inc.",
  companyAddress,
  unsubscribeUrl = "#",
}: PromotionalTemplateProps) {
  const content = (
    <>
      <Section style={heroSection}>
        <Img src={productImageUrl} alt={productName} style={productImage} />
      </Section>

      <Section style={productSection}>
        <Heading style={productTitle}>{productName}</Heading>
        <Text style={productDesc}>{productDescription}</Text>

        <Section style={priceSection}>
          {originalPrice && discountPercentage && (
            <Text style={originalPriceText}>
              원가: <span style={strikethrough}>{originalPrice}</span> ({discountPercentage} 할인!)
            </Text>
          )}
          <Text style={salePriceText}>특가: {salePrice}</Text>
        </Section>

        <Section style={buttonSection}>
          <Button href={callToActionUrl} style={ctaButton}>
            지금 구매하기
          </Button>
        </Section>
      </Section>
    </>
  );

  return (
    <>
      <Preview>{previewText}</Preview>
      <Container style={container}>
        <Section style={mainSection}>
          <Heading style={heading}>🛍️ 특별 프로모션</Heading>
          <Hr style={hr} />
          <Section style={contentSection}>{content}</Section>
          <Hr style={hr} />
          <Text style={footer}>
            이 메일은 {companyName}에서 발송되었습니다.
            {companyAddress && (
              <span>
                <br />
                {companyAddress}
              </span>
            )}
          </Text>
          {unsubscribeUrl !== "#" && (
            <Text style={unsubscribeText}>
              <a href={unsubscribeUrl} style={unsubscribeLink}>
                구독 취소
              </a>
            </Text>
          )}
        </Section>
      </Container>
    </>
  );
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const mainSection = {
  padding: "30px",
  backgroundColor: "#fff8e1",
  border: "2px solid #ffc107",
  borderRadius: "12px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#e65100",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#ffcc02",
  margin: "24px 0",
  borderWidth: "2px",
};

const contentSection = {
  marginTop: "24px",
};

const heroSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const productImage = {
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
};

const productSection = {
  textAlign: "center" as const,
};

const productTitle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#d84315",
  marginBottom: "16px",
  textAlign: "center" as const,
};

const productDesc = {
  color: "#5d4037",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const priceSection = {
  marginBottom: "32px",
};

const originalPriceText = {
  color: "#757575",
  fontSize: "14px",
  marginBottom: "8px",
  textAlign: "center" as const,
};

const strikethrough = {
  textDecoration: "line-through",
};

const salePriceText = {
  color: "#e65100",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center" as const,
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const ctaButton = {
  backgroundColor: "#ff5722",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
  boxShadow: "0 4px 8px rgba(255, 87, 34, 0.3)",
};

const footer = {
  color: "#8d6e63",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center" as const,
  marginTop: "20px",
};

const unsubscribeText = {
  textAlign: "center" as const,
  marginTop: "16px",
};

const unsubscribeLink = {
  color: "#8d6e63",
  fontSize: "12px",
  textDecoration: "underline",
};
