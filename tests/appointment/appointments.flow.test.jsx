import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Appointments from "../../src/features/appointments/page/Appointments";

const mockNavigate = vi.fn();
const mockHandlePatientAppointments = vi.fn();

let mockAppointments = [];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../src/features/appointments/hooks/useAppointment", () => ({
  useAppointments: () => ({
    handlePatientAppointments: mockHandlePatientAppointments,
    Appointments: mockAppointments,
    listLoading: false,
    patientPagination: {
      page: 1,
      limit: 10,
      total: mockAppointments.length,
    },
  }),
}));

const renderAppointments = () =>
  render(
    <MemoryRouter>
      <Appointments />
    </MemoryRouter>
  );

describe("Patient Appointments Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockAppointments = [
      {
        id: "appointment-1",
        doctor: {
          name: "Dr. Sharma",
        },
        status: "confirmed",
        date: "2026-08-20T10:00:00.000Z",
      },
      {
        id: "appointment-2",
        doctor: {
          name: "Dr. Verma",
        },
        status: "completed",
        date: "2026-08-10T10:00:00.000Z",
      },
      {
        id: "appointment-3",
        doctor: {
          name: "Dr. Khan",
        },
        status: "pending",
        date: "2026-08-15T10:00:00.000Z",
      },
    ];
  });

  it("should load and display patient appointments", async () => {
    renderAppointments();

    expect(mockHandlePatientAppointments).toHaveBeenCalledWith(1, 10);

    expect(
      await screen.findByText("Dr. Sharma")
    ).toBeInTheDocument();

    expect(screen.getByText("Dr. Verma")).toBeInTheDocument();
    expect(screen.getByText("Dr. Khan")).toBeInTheDocument();

    expect(screen.getByText("3 records")).toBeInTheDocument();
  });

  it("should search appointments by doctor name", async () => {
    const user = userEvent.setup();

    renderAppointments();

    const searchInput = screen.getByPlaceholderText("Search doctor...");

    await user.type(searchInput, "Sharma");

    expect(screen.getByText("Dr. Sharma")).toBeInTheDocument();

    expect(
      screen.queryByText("Dr. Verma")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Dr. Khan")
    ).not.toBeInTheDocument();
  });

  it("should filter appointments by status", async () => {
    const user = userEvent.setup();

    renderAppointments();

    const statusSelect = screen.getByDisplayValue("All");

    await user.selectOptions(statusSelect, "completed");

    expect(screen.getByText("Dr. Verma")).toBeInTheDocument();

    expect(
      screen.queryByText("Dr. Sharma")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Dr. Khan")
    ).not.toBeInTheDocument();
  });

  it("should sort appointments by oldest date", async () => {
    const user = userEvent.setup();

    renderAppointments();

    const sortSelect = screen.getByDisplayValue("Newest first");

    await user.selectOptions(sortSelect, "oldest");

    const appointmentCards = screen
      .getAllByText(/Dr\./)
      .map((element) => element.textContent);

    expect(appointmentCards).toEqual([
      "Dr. Verma",
      "Dr. Khan",
      "Dr. Sharma",
    ]);
  });

  it("should navigate to doctors when booking an appointment", async () => {
    const user = userEvent.setup();

    renderAppointments();

    await user.click(
      screen.getByRole("button", {
        name: /book appointment/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/profile/doctors");
  });
});