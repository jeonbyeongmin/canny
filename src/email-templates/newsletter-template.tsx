import { Container, Heading, Hr, Link, Preview, Section, Text } from "@react-email/components";

import * as React from "react";

interface NewsletterTemplateProps {
  previewText?: string;
  title: string;
  content: React.ReactNode;
  companyName?: string;
  unsubscribeUrl?: string;
}

export default function NewsletterTemplate({
  previewText = "주간 뉴스레터",
  title,
  content,
  companyName = "Great Pleasure Inc.",
  unsubscribeUrl = "#",
}: NewsletterTemplateProps) {
  return (
    <>
      <Preview>{previewText}</Preview>
      <Container
        style={{
          margin: "0 auto",
          padding: "20px 0 48px",
          width: "580px",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <Section
          style={{
            padding: "30px",
            backgroundColor: "#f4f3ff",
            border: "1px solid #8b5cf6",
            borderRadius: "10px",
          }}
        >
          <Heading
            style={{
              fontSize: "30px",
              lineHeight: "1.3",
              fontWeight: "700",
              color: "#6b21a8",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            📰 {title}
          </Heading>

          <Hr style={{ borderColor: "#c4b5fd", margin: "20px 0" }} />

          <Section style={{ marginTop: "24px" }}>{content}</Section>

          <Hr style={{ borderColor: "#c4b5fd", margin: "40px 0 20px 0" }} />

          <Text
            style={{
              color: "#7c3aed",
              fontSize: "14px",
              lineHeight: "20px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            이 메일은 {companyName} 뉴스레터 구독자에게 발송되었습니다.
          </Text>

          <Text style={{ textAlign: "center", margin: "0" }}>
            <Link
              href={unsubscribeUrl}
              style={{
                color: "#7c3aed",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              구독 취소
            </Link>
          </Text>
        </Section>
      </Container>
    </>
  );
}
