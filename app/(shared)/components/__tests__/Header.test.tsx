import { render, screen, fireEvent } from "@testing-library/react";
import {
  clearAllMocks,
  mockUser,
  mockAdmin,
} from "@/__tests__/utils/test-utils";
import Header from "@/app/(shared)/components/Header";

// Mock the useAuth hook
const mockUseAuth = jest.fn();
const mockLogout = jest.fn();

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Header Component", () => {
  beforeEach(() => {
    clearAllMocks();
    mockPush.mockClear();
    mockLogout.mockClear();
    mockUseAuth.mockClear();
  });

  it("should render title and theme changer when not authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText("Rick y Morty Challenge")).toBeInTheDocument();
    expect(screen.getByTestId("theme-changer")).toBeInTheDocument();
    expect(screen.queryByText(/Hola,/)).not.toBeInTheDocument();
    expect(screen.queryByText("Cerrar Sesión")).not.toBeInTheDocument();
  });

  it("should render user info and logout button when authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText("Rick y Morty Challenge")).toBeInTheDocument();
    expect(screen.getByTestId("theme-changer")).toBeInTheDocument();
    expect(screen.getByText(`Hola, ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });

  it("should handle logout click correctly", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    const logoutButton = screen.getByText("Cerrar Sesión");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should render admin user correctly", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockAdmin,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText(`Hola, ${mockAdmin.name}`)).toBeInTheDocument();
    expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
  });

  it("should not show user info when user is null even if authenticated", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: null,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.queryByText(/Hola,/)).not.toBeInTheDocument();
    expect(screen.queryByText("Cerrar Sesión")).not.toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "bg-background-light",
      "shadow-sm",
      "dark:bg-black",
    );

    const mainContainer = header.firstChild;
    expect(mainContainer).toHaveClass(
      "flex",
      "h-16",
      "items-center",
      "justify-between",
      "px-6",
    );

    const rightContainer = screen.getByTestId("theme-changer").parentElement;
    expect(rightContainer).toHaveClass("flex", "items-center", "space-x-4");
  });

  it("should have proper accessibility attributes", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    const logoutButton = screen.getByRole("button", { name: "Cerrar Sesión" });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveAttribute("type", "button");
  });

  it("should handle loading state gracefully", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      token: null,
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText("Rick y Morty Challenge")).toBeInTheDocument();
    expect(screen.getByTestId("theme-changer")).toBeInTheDocument();
    expect(screen.queryByText(/Hola,/)).not.toBeInTheDocument();
  });

  it("should show user greeting only on small+ screens", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: mockUser,
      token: "valid-token",
      logout: mockLogout,
    });

    render(<Header />);

    const userGreeting = screen.getByText(`Hola, ${mockUser.name}`);
    expect(userGreeting).toHaveClass("hidden", "sm:block");
  });
});
