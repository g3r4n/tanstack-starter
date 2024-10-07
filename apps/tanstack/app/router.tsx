import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { SessionProvider } from "next-auth/react";

import { routeTree } from "./routeTree.gen";
import { getQueryClient, trpc, trpcClient } from "./trpc";

export function createRouter() {
  const queryClient = getQueryClient();
  const trpcQueryUtils = createTRPCQueryUtils({
    queryClient,
    client: trpcClient,
  });
  const router = createTanStackRouter({
    routeTree,
    context: () => ({
      trpcQueryUtils,
    }),
    Wrap: ({ children }) => (
      <SessionProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </SessionProvider>
    ),
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
