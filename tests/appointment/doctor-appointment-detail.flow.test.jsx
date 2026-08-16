import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import DoctorAppointmentDetailPage from "../../src/features/appointments/page/DoctorAppointmentDetailPage";

const mockHandleGetAppointmentbyId = vi.fn();
const mockHandleUpdateAppointmentStatus = vi.fn();
const mockHandleCancelAppointment = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useParams: () => ({
      id: "appointment-1",
    }),
  };
});

vi.mock(
  "../../src/features/appointments/hooks/useAppointment",
  () => ({
    useAppointments: () => ({
      handleGetAppointmentbyId: mockHandleGetAppointmentbyId,
      selectedAppointment: {
        id: "appointment-1",
        status: "pending",
        date: "2026-08-20T10:00:00.000Z",
        doctor: {
          id: "doctor-1",
          name: "Dr. Test Doctor",
        },
        patient: {
          id: "patient-1",
          name: "Test Patient",
        },
      },
      appointmentLoading: false,
      handleUpdateAppointmentStatus:
        mockHandleUpdateAppointmentStatus,
      handleCancelAppointment:
        mockHandleCancelAppointment,
    }),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorPatientInfoCard",
  () => ({
    default: ({ appointment }) => (
      <div>
        <span>{appointment.patient.name}</span>
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorAppointmentInfoCard",
  () => ({
    default: ({ appointment }) => (
      <div>
        <span>{appointment.status}</span>
        <span>{appointment.date}</span>
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/PrescriptionPanel",
  () => ({
    default: ({ id }) => (
      <div>Prescription for {id}</div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/doctor/DoctorAppointmentActions",
  () => ({
    default: ({ status, id, onUpdateStatus, onCancel }) => (
      <div>
        <span>Current status: {status}</span>

        <button
          type="button"
          onClick={() => onUpdateStatus(id, "confirmed")}
        >
          Confirm Appointment
        </button>

        <button
          type="button"
          onClick={() => onUpdateStatus(id, "completed")}
        >
          Complete Appointment
        </button>

        <button
          type="button"
          onClick={() => onCancel(id)}
        >
          Cancel Appointment
        </button>
      </div>
    ),
  })
);

const renderDoctorAppointmentDetail = () =>
  render(
    <MemoryRouter>
      <DoctorAppointmentDetailPage />
    </MemoryRouter>
  );

describe("Doctor Appointment Detail Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockHandleGetAppointmentbyId.mockResolvedValue({});
    mockHandleUpdateAppointmentStatus.mockResolvedValue({});
    mockHandleCancelAppointment.mockResolvedValue({});
  });

  it("should load appointment details", () => {
    renderDoctorAppointmentDetail();

    expect(mockHandleGetAppointmentbyId).toHaveBeenCalledWith(
      "appointment-1"
    );

    expect(
      screen.getByText("Test Patient")
    ).toBeInTheDocument();

    expect(
      screen.getByText("pending")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Prescription for appointment-1")
    ).toBeInTheDocument();
  });

  it("should update appointment status", async () => {
    const user = userEvent.setup();

    renderDoctorAppointmentDetail();

    await user.click(
      screen.getByRole("button", {
        name: "Confirm Appointment",
      })
    );

    expect(
      mockHandleUpdateAppointmentStatus
    ).toHaveBeenCalledWith(
      "appointment-1",
      "confirmed"
    );

    expect(
      mockHandleGetAppointmentbyId
    ).toHaveBeenCalledWith("appointment-1");
  });

  it("should cancel appointment", async () => {
    const user = userEvent.setup();

    renderDoctorAppointmentDetail();

    await user.click(
      screen.getByRole("button", {
        name: "Cancel Appointment",
      })
    );

    expect(
      mockHandleCancelAppointment
    ).toHaveBeenCalledWith("appointment-1");

    expect(
      mockHandleGetAppointmentbyId
    ).toHaveBeenCalledWith("appointment-1");
  });
});