import {
  Button,
  Column,
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

import * as React from "react";

interface PromotionalTemplateProps {
  previewText: string;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  salePrice: string;
  originalPrice?: string;
  discountPercentage?: string;
  callToActionUrl: string;
  companyName: string;
  companyAddress?: string;
  unsubscribeUrl: string;
}

export default function PromotionalTemplate({
  previewText,
  productName,
  productDescription,
  productImageUrl,
  salePrice,
  originalPrice,
  discountPercentage,
  callToActionUrl,
  companyName,
  companyAddress,
  unsubscribeUrl,
}: PromotionalTemplateProps) {
  return (
    <>
      <Preview>{previewText}</Preview>
      <Container style={container}>
        <Section style={header}>
          <Img
            src="https://via.placeholder.com/150x50?text=Your+Logo"
            width="150"
            height="50"
            alt="Company Logo"
            style={logo}
          />
        </Section>

        <Heading style={heading}>특별 할인! {productName}</Heading>

        <Section style={productSection}>
          <Row>
            <Column>
              <Img src={productImageUrl} alt={productName} style={productImage} width="100%" />
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={paragraph}>{productDescription}</Text>
              <Text style={priceSection}>
                <span style={salePriceStyle}>{salePrice}</span>
                {originalPrice && <span style={originalPriceStyle}>{originalPrice}</span>}
                {discountPercentage && <span style={discountBadge}>{discountPercentage} 할인</span>}
              </Text>
              <Button href={callToActionUrl} style={button}>
                지금 구매하기
              </Button>
            </Column>
          </Row>
        </Section>

        <Hr style={hr} />

        <Section style={footer}>
          <Text style={footerText}>
            {companyName}에서 보내는 프로모션 메일입니다.
            {companyAddress && (
              <>
                <br />
                {companyAddress}
              </>
            )}
          </Text>
          <Link href={unsubscribeUrl} style={footerLink}>
            수신 거부
          </Link>
        </Section>
      </Container>
    </>
  );
}

const container = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#0c7ff2",
  padding: "20px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333333",
  textAlign: "center" as const,
  padding: "30px 20px 10px",
};

const productSection = {
  padding: "0 20px 20px",
};

const productImage = {
  borderRadius: "8px",
  marginBottom: "20px",
  maxWidth: "100%",
  height: "auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#555555",
  marginBottom: "20px",
};

const priceSection = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const salePriceStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#e53e3e",
  marginRight: "10px",
};

const originalPriceStyle = {
  fontSize: "18px",
  color: "#718096",
  textDecoration: "line-through",
  marginRight: "10px",
};

const discountBadge = {
  backgroundColor: "#38a169",
  color: "#ffffff",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "bold",
};

const button = {
  backgroundColor: "#0c7ff2",
  color: "#ffffff",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "5px",
  display: "block",
  textAlign: "center" as const,
  margin: "0 auto",
  width: "fit-content",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "30px",
  marginBottom: "30px",
};

const footer = {
  padding: "20px",
  textAlign: "center" as const,
  backgroundColor: "#f7f7f7",
};

const footerText = {
  fontSize: "12px",
  color: "#888888",
  lineHeight: "1.5",
  marginBottom: "10px",
};

const footerLink = {
  fontSize: "12px",
  color: "#0c7ff2",
  textDecoration: "underline",
};
