import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { getStoredToken } from "@/app/(shared)/lib/jwt-mock";

export const apiClient: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error);

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.error("🔐 Unauthorized - Token may be expired");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;

        default:
          console.error(
            `❌ HTTP Error ${status}:`,
            data?.message || "Unknown error",
          );
      }
    } else if (error.request) {
      console.error("🌐 Network Error - No response received");
    } else {
      console.error("⚙️ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  },
);

//CRUD
export const api = {
  // GET request
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient
      .get(url, config)
      .then((response: { data: T }) => response.data);
  },

  // POST request
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient
      .post(url, data, config)
      .then((response: { data: T }) => response.data);
  },

  // PUT request
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient
      .put(url, data, config)
      .then((response: { data: T }) => response.data);
  },

  // PATCH request
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient
      .patch(url, data, config)
      .then((response: { data: T }) => response.data);
  },

  // DELETE request
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient
      .delete(url, config)
      .then((response: { data: T }) => response.data);
  },
};

export default api;
