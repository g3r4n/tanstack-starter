import { dehydrate, hydrate, QueryClientProvider } from "@tanstack/react-query";
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
    context: { trpcQueryUtils },
    dehydrate() {
      return {
        dehydratedQueryClient: dehydrate(queryClient, {
          shouldDehydrateQuery: () => true,
        }),
      };
    },
    hydrate({ dehydratedQueryClient }) {
      hydrate(queryClient, dehydratedQueryClient);
    },
    Wrap: ({ children }) => (
      <SessionProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </SessionProvider>
    ),
    defaultNotFoundComponent: () => {
      return <p>This page doesn't exist!</p>;
    },
    defaultErrorComponent: (error) => {
      return (
        <div>
          <span>An error occured</span>
          <p>{JSON.stringify(error)}</p>
        </div>
      );
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
