import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "../../src/features/auth/page/Login";
import toast from "react-hot-toast";

const mockNavigate = vi.fn();
const mockHandleLogin = vi.fn();
const mockHandleResendVerifyEmail = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../src/features/auth/hooks/checkAuth.js", () => ({
  useAuth: () => ({
    handleLogin: mockHandleLogin,
    handleResendVerifyEmail: mockHandleResendVerifyEmail,
    isResending: false,
    logging: false,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login a patient and redirect to profile", async () => {
    const user = userEvent.setup();

    mockHandleLogin.mockResolvedValue({
      message: "Login successful",
      data: {
        user: {
          id: "patient-1",
          name: "Test Patient",
          activeRole: "patient",
        },
      },
    });

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "patient@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "Test@123456"
    );

    await user.click(
      screen.getByRole("button", { name: "Sign In" })
    );

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith({
        email: "patient@example.com",
        password: "Test@123456",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/profile",
      { replace: true }
    );
  });

  it("should login a doctor and redirect to doctor dashboard", async () => {
    const user = userEvent.setup();

    mockHandleLogin.mockResolvedValue({
      message: "Login successful",
      data: {
        user: {
          id: "doctor-1",
          name: "Test Doctor",
          activeRole: "doctor",
        },
      },
    });

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "doctor@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "Test@123456"
    );

    await user.click(
      screen.getByRole("button", { name: "Sign In" })
    );

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled();
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/doctor-dashboard",
      { replace: true }
    );
  });

  it("should show validation error for invalid login input", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(
      screen.getByRole("button", { name: "Sign In" })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the highlighted fields before submitting"
    );

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("should show verification message when email is not verified", async () => {
    const user = userEvent.setup();

    mockHandleLogin.mockRejectedValue({
      response: {
        data: {
          message: "Please verify your email",
        },
      },
    });

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "unverified@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "Test@123456"
    );

    await user.click(
      screen.getByRole("button", { name: "Sign In" })
    );

    expect(
      await screen.findByText(
        "Your email address has not been verified yet."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Resend verification email",
      })
    ).toBeInTheDocument();
  });
});