import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../../app/(shared)/contexts/AuthContext";

// Utilidades adicionales para testing
export const mockUser = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  role: "user",
};

export const mockAdmin = {
  id: "2",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
};

// Helper para limpiar mocks entre tests
export const clearAllMocks = () => {
  jest.clearAllMocks();
  (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
  (window.localStorage.setItem as jest.Mock).mockClear();
  (window.localStorage.removeItem as jest.Mock).mockClear();
};
