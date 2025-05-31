import { Container, Heading, Hr, Link, Preview, Section, Text } from "@react-email/components";

import * as React from "react";

interface TransactionalTemplateProps {
  previewText?: string;
  title: string;
  name: string;
  introText: string;
  items: Array<{ name: string; quantity: number; price: string }>;
  totalAmount: string;
  supportUrl?: string;
  companyName?: string;
  orderId?: string;
}

export default function TransactionalTemplate({
  previewText = "주문 확인 및 영수증",
  title,
  name,
  introText,
  items,
  totalAmount,
  supportUrl = "#",
  companyName = "Great Pleasure Store",
  orderId,
}: TransactionalTemplateProps) {
  const content = (
    <>
      <Text style={greetingText}>안녕하세요, {name}님!</Text>
      <Text style={introTextStyle}>{introText}</Text>

      {orderId && (
        <Section style={orderSection}>
          <Text style={orderIdText}>
            주문 번호: <strong>{orderId}</strong>
          </Text>
        </Section>
      )}

      <Section style={itemsSection}>
        <Heading style={itemsTitle}>주문 내역</Heading>
        <div style={tableContainer}>
          <div style={tableHeader}>
            <div style={headerCell}>상품명</div>
            <div style={headerCell}>수량</div>
            <div style={headerCell}>가격</div>
          </div>
          {items.map((item, index) => (
            <div key={index} style={tableRow}>
              <div style={tableCell}>{item.name}</div>
              <div style={tableCell}>{item.quantity}개</div>
              <div style={tableCell}>{item.price}</div>
            </div>
          ))}
          <div style={totalRow}>
            <div style={totalCell}>총 금액</div>
            <div style={totalAmountCell}>{totalAmount}</div>
          </div>
        </div>
      </Section>

      {supportUrl !== "#" && (
        <Section style={supportSection}>
          <Text style={supportText}>
            문의사항이 있으시면{" "}
            <Link href={supportUrl} style={supportLink}>
              고객지원센터
            </Link>
            로 연락해주세요.
          </Text>
        </Section>
      )}
    </>
  );

  return (
    <>
      <Preview>{previewText}</Preview>
      <Container style={container}>
        <Section style={mainSection}>
          <Heading style={heading}>📋 {title}</Heading>
          <Hr style={hr} />
          <Section style={contentSection}>{content}</Section>
          <Hr style={hr} />
          <Text style={footer}>이 메일은 {companyName}에서 발송되었습니다.</Text>
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
  backgroundColor: "#f0f8ff",
  border: "1px solid #4a90e2",
  borderRadius: "8px",
};

const heading = {
  fontSize: "28px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1e3a8a",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#93c5fd",
  margin: "20px 0",
};

const contentSection = {
  marginTop: "24px",
};

const greetingText = {
  color: "#1e40af",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const introTextStyle = {
  color: "#1e40af",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "24px",
};

const orderSection = {
  backgroundColor: "#dbeafe",
  padding: "16px",
  borderRadius: "6px",
  marginBottom: "24px",
};

const orderIdText = {
  color: "#1e40af",
  fontSize: "16px",
  textAlign: "center" as const,
};

const itemsSection = {
  marginBottom: "24px",
};

const itemsTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1e40af",
  marginBottom: "16px",
  textAlign: "left" as const,
};

const tableContainer = {
  border: "1px solid #93c5fd",
  borderRadius: "6px",
  overflow: "hidden",
};

const tableHeader = {
  backgroundColor: "#3b82f6",
  display: "flex",
  color: "#ffffff",
};

const headerCell = {
  flex: 1,
  padding: "12px",
  fontSize: "14px",
  fontWeight: "600",
  borderRight: "1px solid #60a5fa",
};

const tableRow = {
  display: "flex",
  borderBottom: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
};

const tableCell = {
  flex: 1,
  padding: "12px",
  fontSize: "14px",
  color: "#374151",
  borderRight: "1px solid #e5e7eb",
};

const totalRow = {
  display: "flex",
  backgroundColor: "#dbeafe",
  fontWeight: "600",
};

const totalCell = {
  flex: 2,
  padding: "12px",
  fontSize: "16px",
  color: "#1e40af",
  borderRight: "1px solid #93c5fd",
};

const totalAmountCell = {
  flex: 1,
  padding: "12px",
  fontSize: "16px",
  color: "#1e40af",
  fontWeight: "700",
};

const supportSection = {
  marginTop: "24px",
  textAlign: "center" as const,
};

const supportText = {
  color: "#4b5563",
  fontSize: "14px",
  lineHeight: "20px",
};

const supportLink = {
  color: "#3b82f6",
  textDecoration: "underline",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center" as const,
  marginTop: "20px",
};
