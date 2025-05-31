import { Container, Heading, Hr, Link, Text } from "@react-email/components";

import * as React from "react";

interface SimpleTemplateProps {
  title: string;
  name: string;
  message: string;
  actionLink?: string;
  actionText?: string;
}

export default function SimpleTemplate({
  title,
  name,
  message,
  actionLink,
  actionText,
}: SimpleTemplateProps) {
  return (
    <Container style={container}>
      <Heading style={heading}>{title}</Heading>
      <Text style={paragraph}>안녕하세요, {name}님!</Text>
      <Text style={paragraph}>{message}</Text>
      {actionLink && actionText && (
        <Link href={actionLink} style={button}>
          {actionText}
        </Link>
      )}
      <Hr style={hr} />
      <Text style={footer}>Great Pleasure에서 발송된 메일입니다.</Text>
    </Container>
  );
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "5px",
};

const heading = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 35px",
};

const button = {
  backgroundColor: "#0c7ff2",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "20px auto",
  width: "200px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "0 35px",
};
