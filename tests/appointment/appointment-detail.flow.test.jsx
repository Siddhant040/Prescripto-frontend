import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import AppointmentDetailPage from "../../src/features/appointments/page/AppointmentDetailPage";

const mockHandleGetAppointmentbyId = vi.fn();
const mockHandleCancelAppointment = vi.fn();
const mockNavigate = vi.fn();

const { mockHandlePaynow } = vi.hoisted(() => ({
  mockHandlePaynow: vi.fn(),
}));

const mockAppointment = {
  id: "appointment-1",
  status: "confirmed",
  paymentStatus: "pending",
  doctor: {
    id: "doctor-1",
    name: "Dr. Test Doctor",
  },
  patient: {
    id: "patient-1",
    name: "Test Patient",
  },
  date: "2026-08-20T10:00:00.000Z",
  prescription: null,
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useParams: () => ({
      id: "appointment-1",
    }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock(
  "../../src/features/appointments/hooks/useAppointment",
  () => ({
    useAppointments: () => ({
      handleGetAppointmentbyId: mockHandleGetAppointmentbyId,
      selectedAppointment: mockAppointment,
      appointmentLoading: false,
      handleCancelAppointment: mockHandleCancelAppointment,
      canceling: false,
    }),
  })
);

vi.mock(
  "../../src/features/auth/hooks/checkAuth",
  () => ({
    useAuth: () => ({
      user: {
        id: "patient-1",
        name: "Test Patient",
      },
    }),
  })
);

vi.mock(
  "../../src/features/payments/hooks/usePayment",
  () => ({
    usePayment: () => ({
      isCreating: false,
      handleCreateOrder: vi.fn(),
      handleVerifyPayment: vi.fn(),
    }),
  })
);

/*
 * IMPORTANT:
 * This is the ONLY paymentService mock.
 * Do not add another vi.mock for this module.
 */
vi.mock(
  "../../src/features/payments/services/paymentService",
  () => ({
    handlePaynow: mockHandlePaynow,
  })
);

vi.mock(
  "../../src/features/review/component/reviewSection",
  () => ({
    ReviewSection: () => (
      <div>Review Section</div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/details/AppointmentDetailHero",
  () => ({
    default: ({ appointment }) => (
      <div>
        <span>{appointment.doctor.name}</span>
        <span>{appointment.status}</span>
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/details/DetailInfoGrid",
  () => ({
    default: ({ title }) => (
      <div>{title}</div>
    ),
  })
);

vi.mock(
  "../../src/features/patients/components/PrescriptionPanel",
  () => ({
    default: () => (
      <div>Prescription</div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/details/AppointmentTimeline",
  () => ({
    default: ({ status }) => (
      <div>{status}</div>
    ),
  })
);

const renderAppointmentDetail = () =>
  render(
    <MemoryRouter>
      <AppointmentDetailPage />
    </MemoryRouter>
  );

describe("Appointment Detail Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockAppointment.status = "confirmed";
    mockAppointment.paymentStatus = "pending";

    mockHandleGetAppointmentbyId.mockResolvedValue({});
    mockHandleCancelAppointment.mockResolvedValue({});
    mockHandlePaynow.mockResolvedValue({});
  });

  it("should load appointment details", () => {
    renderAppointmentDetail();

    expect(
      mockHandleGetAppointmentbyId
    ).toHaveBeenCalledWith("appointment-1");

    expect(
      screen.getByText("Dr. Test Doctor")
    ).toBeInTheDocument();

    expect(
      screen.getAllByText("confirmed").length
    ).toBeGreaterThan(0);
  });

  it("should show Pay Now for a confirmed unpaid appointment", () => {
    renderAppointmentDetail();

    expect(
      screen.getByRole("button", {
        name: "Pay Now",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Payment Completed")
    ).not.toBeInTheDocument();
  });

  it("should initiate payment when Pay Now is clicked", async () => {
    const user = userEvent.setup();

    renderAppointmentDetail();

    const payButton = screen.getByRole("button", {
      name: "Pay Now",
    });

    await user.click(payButton);

    expect(
      mockHandlePaynow
    ).toHaveBeenCalledWith({
      appointment: expect.objectContaining({
        id: "appointment-1",
        status: "confirmed",
        paymentStatus: "pending",
      }),

      user: expect.objectContaining({
        id: "patient-1",
      }),

      handleCreateOrder: expect.any(Function),
      handleVerifyPayment: expect.any(Function),

      handleGetAppointmentbyId:
        mockHandleGetAppointmentbyId,
    });
  });

  it("should show Payment Completed for a confirmed paid appointment", () => {
    mockAppointment.paymentStatus = "paid";

    renderAppointmentDetail();

    expect(
      screen.getByText("Payment Completed")
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Pay Now",
      })
    ).not.toBeInTheDocument();
  });

  it("should cancel the appointment and refresh appointment details", async () => {
    const user = userEvent.setup();

    renderAppointmentDetail();

    const cancelButton = screen.getByRole("button", {
      name: "Cancel",
    });

    await user.click(cancelButton);

    expect(
      mockHandleCancelAppointment
    ).toHaveBeenCalledWith("appointment-1");

    expect(
      mockHandleGetAppointmentbyId
    ).toHaveBeenCalledWith("appointment-1");
  });

  it("should navigate to booking page when rescheduling", async () => {
    const user = userEvent.setup();

    renderAppointmentDetail();

    const rescheduleButton = screen.getByRole(
      "button",
      {
        name: "Reschedule",
      }
    );

    await user.click(rescheduleButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/profile/doctors/doctor-1/booking",
      {
        state: {
          isReschedule: true,
          appointmentId: "appointment-1",
        },
      }
    );
  });

  it("should show review section for a completed appointment", () => {
    mockAppointment.status = "completed";

    renderAppointmentDetail();

    expect(
      screen.getByText("Review Section")
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Pay Now",
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancel",
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Reschedule",
      })
    ).not.toBeInTheDocument();
  });
});