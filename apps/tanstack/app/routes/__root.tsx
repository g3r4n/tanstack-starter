import * as React from "react";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { ClickToComponent } from "click-to-react-component";

import { ThemeProvider } from "@acme/ui/theme";

import type { RouterAppContext } from "../types";
import appCss from "../globals.css?url";

import "../i18n";

import { useTranslation } from "react-i18next";

if (typeof window !== "undefined" && !window.process) {
  console.log("window.process", window.process);
  window.process = {} as any;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter",
    },
  ],
  component: RootComponent,
  links: () => [{ rel: "stylesheet", href: appCss }],
  scripts: () => [
    {
      children: `
if (typeof window !== "undefined" && !window.process) {
  window.process = {env:{}};
}
`,
    },
  ],
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { ready } = useTranslation();
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <ClickToComponent editor="cursor" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {ready ? children : null}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
