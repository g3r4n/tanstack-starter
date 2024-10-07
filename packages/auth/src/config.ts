import type { AuthConfig } from "@auth/core";
import type { DefaultSession } from "@auth/core/types";
import { Auth, createActionURL, skipCSRFCheck } from "@auth/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";

import { db } from "@acme/db/client";
import { Account, Session, User } from "@acme/db/schema";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const adapter = DrizzleAdapter(db, {
  usersTable: User,
  accountsTable: Account,
  sessionsTable: Session,
});

export const isSecureContext = env.NODE_ENV !== "development";

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  adapter,
  // In development, we need to skip checks to allow Expo to work
  ...(!isSecureContext
    ? {
        skipCSRFCheck: skipCSRFCheck,
        trustHost: true,
      }
    : {}),
  secret: env.AUTH_SECRET,
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts))
        throw new Error("unreachable with session strategy");

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
} satisfies AuthConfig;

export async function getSession(req: Request) {
  const parsedUrl = new URL(req.url);
  const url = createActionURL(
    "session",
    parsedUrl.protocol,
    req.headers,
    env,
    authConfig.basePath,
  );
  const request = new Request(url, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  const sessionData = await Auth(request, authConfig);
  return (await sessionData.json()) as DefaultSession;
}
