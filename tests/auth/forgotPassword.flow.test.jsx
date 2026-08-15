import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ForgotPassword from "../../src/features/auth/page/ForgotPassword";

const mockHandleForgotPassword = vi.fn();

vi.mock("../../src/features/auth/hooks/checkAuth", () => ({
  useAuth: () => ({
    handleForgotPassword: mockHandleForgotPassword,
    isForgotPassword: false,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import toast from "react-hot-toast";

const renderForgotPassword = () =>
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

describe("Forgot Password Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send reset link for a valid email", async () => {
    const user = userEvent.setup();

    mockHandleForgotPassword.mockResolvedValue({
      message: "Password reset link sent successfully.",
    });

    renderForgotPassword();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "patient@example.com"
    );

    await user.click(
      screen.getByRole("button", { name: "Send Reset Link" })
    );

    await expect.poll(() => mockHandleForgotPassword).toHaveBeenCalledWith(
      "patient@example.com"
    );

    expect(toast.success).toHaveBeenCalledWith(
      "Password reset link sent successfully."
    );
  });

  it("should reject an invalid email", async () => {
    const user = userEvent.setup();

    renderForgotPassword();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "invalid-email"
    );

    await user.click(
      screen.getByRole("button", { name: "Send Reset Link" })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the highlighted fields before submitting"
    );

    expect(mockHandleForgotPassword).not.toHaveBeenCalled();
  });

  it("should show an error when sending reset link fails", async () => {
    const user = userEvent.setup();

    mockHandleForgotPassword.mockRejectedValue(
      new Error("Request failed")
    );

    renderForgotPassword();

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "patient@example.com"
    );

    await user.click(
      screen.getByRole("button", { name: "Send Reset Link" })
    );

    await expect.poll(() => mockHandleForgotPassword).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      "Unable to send password reset email."
    );
  });
});
