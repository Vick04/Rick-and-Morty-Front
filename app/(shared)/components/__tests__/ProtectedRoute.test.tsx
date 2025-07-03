import { render, screen, waitFor } from "@testing-library/react";
import { clearAllMocks, mockUser } from "@/__tests__/utils/test-utils";
import ProtectedRoute from "../ProtectedRoute";

const mockUseAuth = jest.fn();
jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ProtectedRoute Component", () => {
  beforeEach(() => {
    clearAllMocks();
    mockPush.mockClear();
    mockUseAuth.mockClear();
  });

  const TestChild = () => (
    <div data-testid="protected-content">Protected Content</div>
  );

  it("should show loading spinner when authentication is loading", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });

    render(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>,
    );

    expect(screen.getByTestId("spin-loading")).toBeInTheDocument();
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("should redirect to login when not authenticated", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });

    render(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });

    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("should render children when authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    render(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>,
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should not redirect when authenticated even if loading initially was true", async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
    });

    const { rerender } = render(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>,
    );

    expect(screen.getByTestId("spin-loading")).toBeInTheDocument();

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    rerender(
      <ProtectedRoute>
        <TestChild />
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should handle multiple children components", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
    });

    render(
      <ProtectedRoute>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <TestChild />
      </ProtectedRoute>,
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
});
