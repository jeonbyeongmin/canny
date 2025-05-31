import { Button, Container, Heading, Hr, Preview, Section, Text } from "@react-email/components";

import * as React from "react";

interface SimpleTemplateProps {
  previewText?: string;
  title: string;
  name: string;
  message: string;
  actionLink?: string;
  actionText?: string;
}

export default function SimpleTemplate({
  previewText = "간단한 알림 메일입니다.",
  title,
  name,
  message,
  actionLink,
  actionText,
}: SimpleTemplateProps) {
  const content = (
    <>
      <Text style={greetingText}>안녕하세요, {name}님!</Text>
      <Text style={messageText}>{message}</Text>
      {actionLink && actionText && (
        <Section style={buttonSection}>
          <Button href={actionLink} style={actionButton}>
            {actionText}
          </Button>
        </Section>
      )}
    </>
  );

  return (
    <>
      <Preview>{previewText}</Preview>
      <Container style={container}>
        <Section style={mainSection}>
          <Heading style={heading}>{title}</Heading>
          <Hr style={hr} />
          <Section style={contentSection}>{content}</Section>
          <Hr style={hr} />
          <Text style={footer}>이 메일은 Great Pleasure Inc.에서 발송되었습니다.</Text>
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
  backgroundColor: "#f8f9fa",
  border: "1px solid #e9ecef",
  borderRadius: "8px",
};

const heading = {
  fontSize: "28px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#dee2e6",
  margin: "20px 0",
};

const contentSection = {
  marginTop: "24px",
};

const greetingText = {
  color: "#495057",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const messageText = {
  color: "#495057",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "24px",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const actionButton = {
  backgroundColor: "#007bff",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  color: "#6c757d",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center" as const,
  marginTop: "20px",
};
