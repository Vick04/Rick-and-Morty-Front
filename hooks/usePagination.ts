import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaginatedResponse, PaginationParams } from "@/types";

export const usePagination = <T>(
  key: string | readonly unknown[],
  url: string,
  params: PaginationParams = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<T>, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  const [currentPage, setCurrentPage] = useState(url);

  const { data, isFetching, isLoading, refetch } = useQuery<
    PaginatedResponse<T>,
    Error
  >({
    queryKey: Array.isArray(key) ? [...key, params] : [key, params],
    queryFn: () => api.get<PaginatedResponse<T>>(currentPage, { params }),
    ...options,
  });

  const moveToPage = useCallback((page: string | undefined) => {
    setCurrentPage(page || "");
  }, []);

  const goToFirstPage = useCallback(() => {
    let url = new URL(currentPage);
    let params = new URLSearchParams(url.search);

    params.set("page", "1");

    setCurrentPage(url.toString());
  }, []);

  const currentPageNumber = useMemo(() => {
    const urlObj = new URL(currentPage);
    const params: Record<string, string> = {};

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params["page"] || "1";
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return {
    currentPage,
    currentPageNumber,
    data,
    isFetching,
    isLoading,
    goToFirstPage,
    moveToPage,
    refetch,
  };
};
