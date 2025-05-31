import {
  Column,
  Container,
  Heading,
  Hr,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

import * as React from "react";

interface TransactionalTemplateProps {
  previewText: string;
  title: string;
  name: string;
  introText: string;
  items: Array<{ name: string; quantity: number; price: string }>;
  totalAmount: string;
  supportUrl: string;
  companyName: string;
  orderId?: string;
}

export default function TransactionalTemplate({
  previewText,
  title,
  name,
  introText,
  items,
  totalAmount,
  supportUrl,
  companyName,
  orderId,
}: TransactionalTemplateProps) {
  return (
    <>
      <Preview>{previewText}</Preview>
      <Container style={container}>
        <Heading style={heading}>{title}</Heading>
        <Text style={paragraph}>안녕하세요, {name}님.</Text>
        <Text style={paragraph}>{introText}</Text>

        {orderId && <Text style={paragraph}>주문 번호: {orderId}</Text>}

        <Section style={tableContainer}>
          <Row style={tableHeader}>
            <Column style={tableCellHeader}>항목</Column>
            <Column style={tableCellHeader}>수량</Column>
            <Column style={tableCellHeaderAmount}>가격</Column>
          </Row>
          {items.map((item, index) => (
            <Row key={index} style={index % 2 === 0 ? tableRowEven : tableRowOdd}>
              <Column style={tableCell}>{item.name}</Column>
              <Column style={tableCell}>{item.quantity}</Column>
              <Column style={tableCellAmount}>{item.price}</Column>
            </Row>
          ))}
          <Hr style={hrLight} />
          <Row>
            <Column style={tableCellTotalLabel} colSpan={2}>
              총계
            </Column>
            <Column style={tableCellTotalAmount}>{totalAmount}</Column>
          </Row>
        </Section>

        <Text style={paragraph}>
          궁금한 점이 있으시면 언제든지{" "}
          <Link href={supportUrl} style={link}>
            고객 지원팀
          </Link>
          에 문의해주세요.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>{companyName}에서 발송된 메일입니다.</Text>
      </Container>
    </>
  );
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  margin: "40px auto",
  padding: "20px",
  width: "100%",
  maxWidth: "600px",
};

const heading = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "600",
  textAlign: "center" as const,
  marginBottom: "30px",
};

const paragraph = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 20px",
};

const tableContainer = {
  border: "1px solid #e5e7eb",
  borderRadius: "0.375rem",
  marginBottom: "20px",
  padding: "10px",
};

const tableHeader = {
  backgroundColor: "#f3f4f6",
  fontWeight: "bold",
};

const tableCellHeader = {
  padding: "10px",
  fontSize: "14px",
  color: "#1f2937",
};
const tableCellHeaderAmount = {
  ...tableCellHeader,
  textAlign: "right" as const,
};

const tableRowOdd = {
  backgroundColor: "#ffffff",
};
const tableRowEven = {
  backgroundColor: "#f9fafb",
};

const tableCell = {
  padding: "10px",
  fontSize: "14px",
  color: "#374151",
};

const tableCellAmount = {
  ...tableCell,
  textAlign: "right" as const,
};

const tableCellTotalLabel = {
  ...tableCell,
  fontWeight: "bold",
  textAlign: "right" as const,
  paddingRight: "10px",
};

const tableCellTotalAmount = {
  ...tableCellAmount,
  fontWeight: "bold",
  color: "#1f2937",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "30px 0",
};

const hrLight = {
  borderColor: "#e5e7eb",
  margin: "10px 0",
};

const link = {
  color: "#0c7ff2",
  textDecoration: "underline",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "30px",
};
