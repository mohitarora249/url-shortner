import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type Props = {
  email?: string;
  url: string;
}

export const MagicLink = ({ email, url }: Props) => (
  <Html>
    <Head />
    <Preview>Login to LinkLift</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={title}>Welcome to LinkLift</Heading>
        <Text style={subtitle}>
          Hello <strong>{email}</strong>, your login link is ready.
        </Text>

        <Section style={section}>
          <Text style={text}>
            Click the button below to securely log in to your account. This link will expire in 10 minutes.
          </Text>
          <Link style={button} href={url}>
            Log In to Your Account
          </Link>
        </Section>

        <Text style={footer}>
          © 2025 LinkLift. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html >
);

export default MagicLink;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  backgroundRepeat: "repeat",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const title = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 16px",
};

const subtitle = {
  color: "#444",
  fontSize: "16px",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const section = {
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "5px",
  backgroundColor: "#fafafa",
};

const text = {
  color: "#444",
  fontSize: "14px",
  lineHeight: "24px",
};

const button = {
  display: "block",
  backgroundColor: "black",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  textAlign: "center" as const,
  textDecoration: "none",
  padding: "0.625rem 1.25rem",
  marginTop: "24px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "40px",
};