import { logger, task } from "@trigger.dev/sdk/v3";

import { magicLinkEmail } from "@acme/email";

export const sendEmailTask = task({
  id: "send-email",
  maxDuration: 60, // 1 minutes
  run: async (payload: any, { ctx }) => {
    await magicLinkEmail({
      lang: "fr",
      url: "https://acme.com",
    });
    logger.log("Email send !");
  },
});
