import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ResetPassword from "../../src/features/auth/page/Resetpassword";

const mockNavigate = vi.fn();
const mockHandleResetPassword = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ token: "test-token" }),
  };
});

vi.mock("../../src/features/auth/hooks/checkAuth", () => ({
  useAuth: () => ({
    handleResetPassword: mockHandleResetPassword,
    isResettingPassword: false,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import toast from "react-hot-toast";

const renderResetPassword = () =>
  render(
    <MemoryRouter>
      <ResetPassword />
    </MemoryRouter>
  );

describe("Reset Password Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should reset password successfully", async () => {
    const user = userEvent.setup();

    mockHandleResetPassword.mockResolvedValue({
      message: "Password reset successfully",
    });

    renderResetPassword();

    await user.type(
      screen.getByPlaceholderText("Enter new password"),
      "NewPass@123"
    );

    await user.type(
      screen.getByPlaceholderText("Confirm new password"),
      "NewPass@123"
    );

    await user.click(
      screen.getByRole("button", { name: "Reset Password" })
    );

    await expect.poll(() => mockHandleResetPassword).toHaveBeenCalledWith(
      "test-token",
      "NewPass@123"
    );

    expect(toast.success).toHaveBeenCalledWith(
      "Password reset successfully"
    );
  });

  it("should reject mismatched passwords", async () => {
    const user = userEvent.setup();

    renderResetPassword();

    await user.type(
      screen.getByPlaceholderText("Enter new password"),
      "NewPass@123"
    );

    await user.type(
      screen.getByPlaceholderText("Confirm new password"),
      "Different@123"
    );

    await user.click(
      screen.getByRole("button", { name: "Reset Password" })
    );

    expect(
      await screen.findByText("Passwords do not match")
    ).toBeInTheDocument();

    expect(mockHandleResetPassword).not.toHaveBeenCalled();
  });

  it("should show an error when password reset fails", async () => {
    const user = userEvent.setup();

    mockHandleResetPassword.mockRejectedValue({
      response: {
        data: {
          message: "Reset token has expired",
        },
      },
    });

    renderResetPassword();

    await user.type(
      screen.getByPlaceholderText("Enter new password"),
      "NewPass@123"
    );

    await user.type(
      screen.getByPlaceholderText("Confirm new password"),
      "NewPass@123"
    );

    await user.click(
      screen.getByRole("button", { name: "Reset Password" })
    );

    await expect.poll(() => mockHandleResetPassword).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      "Reset token has expired"
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});