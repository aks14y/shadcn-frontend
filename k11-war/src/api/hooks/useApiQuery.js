import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config";

export const useApiQuery = (queryKey, endpoint, options = {}) => {
  return useQuery({
    queryKey,
    queryFn: () => apiFetch(endpoint, options),
    ...options,
  });
};
