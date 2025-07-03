"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/app/(shared)/lib/axios";

// Hook para GET requests
export function useGet<T>(
  key: string | readonly unknown[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
) {
  return useQuery<T, Error>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => api.get<T>(url),
    ...options,
  });
}
