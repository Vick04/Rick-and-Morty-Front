export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PaginationParams {
  name?: string;
  status?: "alive" | "dead" | "unknown";
  species?: string;
  gender?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: T[];
}
