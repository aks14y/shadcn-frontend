import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../config";

export const useApiMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ endpoint, ...fetchOptions }) => apiFetch(endpoint, fetchOptions),
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
    },
    onError: options.onError,
    ...options,
  });
};
