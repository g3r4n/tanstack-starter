import type { EmailConfig, EmailUserConfig } from "next-auth/providers";

import { magicLinkEmail } from "@acme/email";

export default function EmailProvider(config: EmailUserConfig): EmailConfig {
  return {
    id: "emailProvider",
    type: "email",
    name: "Email Provider",
    from: "no-reply@des-vaux.fr",
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest(params) {
      const { identifier: to, url } = params;
      const { host } = new URL(url);
      const res = await magicLinkEmail({
        to,
        subject: "Log in with this magic link to " + host,
        url,
        lang: "en",
      });
      if (res.error)
        throw new Error("Resend error: " + JSON.stringify(res.error));
    },
    options: config,
  };
}
