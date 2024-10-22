import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { useTranslation } from "react-i18next";

import "../locales/i18n";

import twConfig from "@acme/tailwind-config/web";

import i18n from "../locales/i18n";

export interface MagicLinkEmailProps {
  url?: string;
  lang?: string;
}
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const MagicLinkEmail = ({ url, lang = "en" }: MagicLinkEmailProps) => {
  i18n.changeLanguage(lang);
  const { t } = i18n;
  return (
    <Html lang={lang}>
      <Head />
      <Preview>{t("Log in with this magic link")}</Preview>
      <Body className="bg-white">
        <Tailwind config={twConfig}>
          <Container className="mx-auto px-3">
            <Img
              src={`${baseUrl}/static/vercel-team.png`}
              className="h-8 w-8"
              alt="Logo"
            />
            <Heading className="my-10 font-sans text-2xl font-bold text-gray-800">
              {t("Login")}
            </Heading>
            <Link
              href={url}
              target="_blank"
              className="mb-4 block font-sans text-sm text-blue-600 underline"
              style={{ textDecoration: "underline" }}
            >
              {t("Click here to log in with this magic link")}
            </Link>
            <Text className="mb-4 mt-3.5 font-sans text-sm text-gray-500">
              {t(
                "If you didn't try to login, you can safely ignore this email.",
              )}
            </Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

MagicLinkEmail.PreviewProps = {
  url: "sparo-ndigo-amurt-secan",
  lang: "fr",
} as MagicLinkEmailProps;

export default MagicLinkEmail;
