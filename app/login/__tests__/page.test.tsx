import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { clearAllMocks } from "@/__tests__/utils/test-utils";
import LoginPage from "../page";

const mockLogin = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("../../(shared)/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockUseRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockUseRouterPush,
    };
  },
}));

describe("LoginPage Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    clearAllMocks();
    mockLogin.mockClear();
    mockUseAuth.mockClear();
    mockUseRouterPush.mockClear();

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
    });
  });

  it("should render login form with all fields", () => {
    render(<LoginPage />);

    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ingresar/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/credenciales de prueba/i)).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /ingresar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText("Required").length).toEqual(2);
    });
  });

  //THERE IS A CONFLICT WITH FORMIK FIELD ONBLUR EVENT
  //OPTION: LOOK FOR ANOTHER FORM DEPENDENCY
  // it("should show validation error for invalid email", async () => {
  //   render(<LoginPage />);

  //   const emailInput = screen.getByTestId(/email/i);
  //   const submitButton = screen.getByRole("button", { name: /ingresar/i });

  //   await user.type(emailInput, "invalid-email");
  //   await user.click(submitButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("Invalid email")).toBeInTheDocument();
  //   });
  // });

  it("should call login function with correct credentials", async () => {
    mockLogin.mockResolvedValue(true);

    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await user.type(emailInput, "admin@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
      });
    });
  });

  it("should redirect to home on successful login", async () => {
    mockLogin.mockResolvedValue(true);

    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await user.type(emailInput, "admin@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUseRouterPush).toHaveBeenCalledWith("/home");
    });
  });

  it("should show error message on failed login", async () => {
    mockLogin.mockResolvedValue(false);

    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });

    expect(mockUseRouterPush).not.toHaveBeenCalled();
  });

  it("should show loading state during login", async () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: true,
    });

    render(<LoginPage />);

    const submitButton = screen.getByRole("button");
    expect(submitButton).toHaveTextContent("Iniciando sesión...");
    expect(submitButton).toBeDisabled();
  });

  it("should handle login error gracefully", async () => {
    mockLogin.mockRejectedValue(new Error("Network error"));

    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await user.type(emailInput, "admin@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error al iniciar sesión/i)).toBeInTheDocument();
    });

    expect(mockUseRouterPush).not.toHaveBeenCalled();
  });

  it("should clear error message on new submission attempt", async () => {
    mockLogin.mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });

    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, "admin@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/credenciales inválidas/i),
      ).not.toBeInTheDocument();
    });
  });

  it("should have proper form accessibility", () => {
    render(<LoginPage />);

    const emailInput = screen.getByTestId(/email/i);
    const passwordInput = screen.getByTestId(/password/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should enable submit button when not loading", () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /ingresar/i });
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent("Ingresar");
  });
});
