import { render, screen, waitFor } from "@testing-library/react";
import { clearAllMocks, mockUser } from "@/__tests__/utils/test-utils";
import RootPage from "../page";

// Mock useAuth
const mockUseAuth = jest.fn();
jest.mock("../(shared)/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock useRouter
const mockUseRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockUseRouterPush,
    };
  },
}));

describe("RootPage Component", () => {
  beforeEach(() => {
    clearAllMocks();
    mockUseAuth.mockClear();
    mockUseRouterPush.mockClear();
  });

  it("should show loading spinner when auth is loading", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });

    render(<RootPage />);

    expect(screen.getByTestId("auth-loading-spin")).toBeInTheDocument();
  });

  it("should redirect to home when authenticated", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    render(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/home");
    });
  });

  it("should redirect to login when not authenticated", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });

    render(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/login");
    });
  });

  it("should not redirect while loading", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });

    render(<RootPage />);

    expect(mockUseRouterPush).not.toHaveBeenCalled();
  });

  it("should render null after redirect decision", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    const { container } = render(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/home");
    });

    // After redirect, component should render null (nothing visible)
    expect(container.firstChild).toBeNull();
  });

  it("should handle auth state transitions correctly", async () => {
    // Start with loading
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });

    const { rerender } = render(<RootPage />);

    expect(screen.getByTestId("auth-loading-spin")).toBeInTheDocument();
    expect(mockUseRouterPush).not.toHaveBeenCalled();

    // Transition to authenticated
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    rerender(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/home");
    });
  });

  it("should handle multiple state changes without memory leaks", async () => {
    const { rerender } = render(<RootPage />);

    // Loading state
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });
    rerender(<RootPage />);

    // Not authenticated
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });
    rerender(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/login");
    });

    // Clear calls and test authenticated state
    mockUseRouterPush.mockClear();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });
    rerender(<RootPage />);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/home");
    });
  });
});
