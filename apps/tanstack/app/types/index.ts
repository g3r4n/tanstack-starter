import { createTRPCQueryUtils } from "@trpc/react-query";

import { AppRouter } from "@acme/api";

export interface RouterAppContext {
  trpcQueryUtils: ReturnType<typeof createTRPCQueryUtils<AppRouter>>;
}
