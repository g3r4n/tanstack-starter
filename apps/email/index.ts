import { Resend } from "resend";

import { MagicLinkEmail, MagicLinkEmailProps } from "./emails/magic-link";

const getResendInstance = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in environment variables");
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export const magicLinkEmail = (
  props: MagicLinkEmailProps & {
    to: string;
    subject: string;
  },
) => {
  const resend = getResendInstance();
  return resend.emails.send({
    from: "nopreply@des-vaux.fr",
    to: props.to,
    subject: props.subject,
    react: MagicLinkEmail(props),
  });
};
