import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../../app/(shared)/contexts/AuthContext";

jest.mock("../../app/(shared)/components/Footer", () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

// Custom render que incluye todos los providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialAuth?: {
    isAuthenticated?: boolean;
    user?: any;
    token?: string | null;
  };
}

function AllTheProviders({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient for each test to avoid cache pollution
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { initialAuth, ...renderOptions } = options || {};

  // Si se proporciona estado inicial de auth, mockear localStorage
  if (initialAuth) {
    const mockToken = initialAuth.token || "mock-jwt-token";
    if (initialAuth.isAuthenticated) {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(mockToken);
    } else {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    }
  }

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// Re-export todo de testing-library
export * from "@testing-library/react";
export { customRender as render };

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

// Helper para simular delay en async functions
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock para window.location.href
export const mockWindowLocation = (href: string = "/") => {
  Object.defineProperty(window, "location", {
    value: { href },
    writable: true,
  });
};
