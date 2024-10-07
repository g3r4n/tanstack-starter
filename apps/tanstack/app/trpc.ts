import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import SuperJSON from "superjson";

import type { AppRouter } from "@acme/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // since we are using Vinxi, the server is running on the same port,
      // this means in dev the url is `http://localhost:3000/trpc`
      // and since its from the same origin, we don't need to explicitly set the full URL
      url: getBaseUrl() + "/api/trpc",
      transformer: SuperJSON,
      headers() {
        return {
          "x-trpc-source": "tanstack",
        };
      },
    }),
  ],
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};
