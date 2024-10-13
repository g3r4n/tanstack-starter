import React from "react";
import { Resend } from "resend";

import { MagicLinkEmail, MagicLinkEmailProps } from "./emails/magic-link";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const magicLinkEmail = (props: MagicLinkEmailProps) => {
  resend.emails.send({
    from: "nopreply@des-vaux.fr",
    to: "enguerrand@des-vaux.fr",
    subject: "Magic Link",
    react: <MagicLinkEmail {...props} />,
  });
};
