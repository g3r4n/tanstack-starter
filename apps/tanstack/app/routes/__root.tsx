import * as React from "react";
import {
  createRootRoute,
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";

import type { RouterAppContext } from "../types";
import { ThemeProvider } from "../../../../packages/ui/src/theme";
import appCss from "../globals.css?url";

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
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <ThemeProvider>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
