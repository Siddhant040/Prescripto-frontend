import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Register from "../../src/features/auth/page/Register";

const mockNavigate = vi.fn();
const mockHandleRegister = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../src/features/auth/hooks/checkAuth.js", () => ({
  useAuth: () => ({
    handleRegister: mockHandleRegister,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import toast from "react-hot-toast";

const renderRegister = () =>
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

describe("Register Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a user and redirect to login", async () => {
    const user = userEvent.setup();

    mockHandleRegister.mockResolvedValue({
      message: "User registered successfully",
    });

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your full name"),
      "Test Patient"
    );

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "patient@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Create a secure password"),
      "Test@123456"
    );

    await user.click(
      screen.getByRole("button", { name: "Create Account" })
    );

    await expect.poll(() => mockHandleRegister).toHaveBeenCalledWith({
      name: "Test Patient",
      email: "patient@example.com",
      password: "Test@123456",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(toast.success).toHaveBeenCalledWith(
      "User registered successfully"
    );
  });

  it("should show validation error for invalid input", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.click(
      screen.getByRole("button", { name: "Create Account" })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the highlighted fields before submitting"
    );

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("should show error when registration fails", async () => {
    const user = userEvent.setup();

    mockHandleRegister.mockRejectedValue(new Error("Registration failed"));

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your full name"),
      "Test Patient"
    );

    await user.type(
      screen.getByPlaceholderText("name@example.com"),
      "patient@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Create a secure password"),
      "Test@123456"
    );

    await user.click(
      screen.getByRole("button", { name: "Create Account" })
    );

    await expect.poll(() => mockHandleRegister).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      "Registration failed"
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});