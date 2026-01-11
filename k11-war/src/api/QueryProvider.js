import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { logQueryError, logMutationError } from "./errorLogger";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      onError: (error, query) => {
        logQueryError(error, query);
      },
    },
    mutations: {
      onError: (error, variables, context) => {
        logMutationError(error, variables);
      },
    },
  },
});

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
