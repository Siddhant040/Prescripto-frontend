import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DoctorAppointments from "../../src/features/appointments/page/DoctorAppointments";

const mockHandleDoctorAppointments = vi.fn();

let mockAppointments = [
  {
    id: "appointment-1",
    status: "pending",
    date: "2026-08-20T10:00:00.000Z",
    patient: {
      name: "Alice Patient",
    },
  },
  {
    id: "appointment-2",
    status: "confirmed",
    date: "2026-08-21T10:00:00.000Z",
    patient: {
      name: "Bob Patient",
    },
  },
];

vi.mock(
  "../../src/features/appointments/hooks/useAppointment",
  () => ({
    useAppointments: () => ({
      handleDoctorAppointments: mockHandleDoctorAppointments,
      doctorAppointments: mockAppointments,
      doctorListLoading: false,
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
      },
    }),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorAppointmentStats",
  () => ({
    default: () => <div>Appointment Stats</div>,
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorAppointmentFilters",
  () => ({
    default: ({
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter,
    }) => (
      <div>
        <input
          aria-label="Search patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          aria-label="Status filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorAppointmentList",
  () => ({
    default: ({
      appointments,
      page,
      total,
      onPageChange,
    }) => (
      <div>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <span>{appointment.patient.name}</span>
            <span>{appointment.status}</span>
          </div>
        ))}

        <span>
          Page {page} — {total} records
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
        >
          Next Page
        </button>
      </div>
    ),
  })
);

describe("Doctor Appointments Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockAppointments = [
      {
        id: "appointment-1",
        status: "pending",
        date: "2026-08-20T10:00:00.000Z",
        patient: {
          name: "Alice Patient",
        },
      },
      {
        id: "appointment-2",
        status: "confirmed",
        date: "2026-08-21T10:00:00.000Z",
        patient: {
          name: "Bob Patient",
        },
      },
    ];

    mockHandleDoctorAppointments.mockResolvedValue([]);
  });

  it("should load doctor appointments", () => {
    render(<DoctorAppointments />);

    expect(mockHandleDoctorAppointments).toHaveBeenCalledWith(
      1,
      10
    );

    expect(
      screen.getByText("Alice Patient")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Bob Patient")
    ).toBeInTheDocument();
  });

  it("should filter appointments by patient name", async () => {
    const user = userEvent.setup();

    render(<DoctorAppointments />);

    const searchInput = screen.getByRole("textbox", {
      name: "Search patient",
    });

    await user.type(searchInput, "Alice");

    expect(
      screen.getByText("Alice Patient")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Bob Patient")
    ).not.toBeInTheDocument();
  });

  it("should filter appointments by status", async () => {
    const user = userEvent.setup();

    render(<DoctorAppointments />);

    const statusFilter = screen.getByRole("combobox", {
      name: "Status filter",
    });

    await user.selectOptions(statusFilter, "confirmed");

    expect(
      screen.getByText("Bob Patient")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Alice Patient")
    ).not.toBeInTheDocument();
  });

  it("should request the next page", async () => {
    const user = userEvent.setup();

    render(<DoctorAppointments />);

    await user.click(
      screen.getByRole("button", {
        name: "Next Page",
      })
    );

    expect(
      mockHandleDoctorAppointments
    ).toHaveBeenCalledWith(2, 10);
  });
});