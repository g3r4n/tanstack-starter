import { Auth } from "@auth/core";
import { createAPIFileRoute } from "@tanstack/start/api";

import { authConfig } from "@acme/auth";

export const Route = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }) => {
    return Auth(request, authConfig);
  },
  POST: ({ request }) => {
    return Auth(request, authConfig);
  },
});
