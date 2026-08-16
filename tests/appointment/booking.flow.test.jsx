import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import BookingPage from "../../src/features/appointments/page/BookingPage";

const mockNavigate = vi.fn();
const mockHandleGetDoctorById = vi.fn();
const mockHandleGetAvailableSlots = vi.fn();
const mockHandleCreateAppointment = vi.fn();
const mockHandleRescheduleAppointment = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "doctor-1" }),
    useLocation: () => ({
      state: null,
    }),
  };
});

vi.mock("../../src/features/doctors/hooks/useDoctor", () => ({
  useDoctor: () => ({
    handleGetDoctorById: mockHandleGetDoctorById,
    selectedDoctor: {
      _id: "doctor-1",
      consultationFee: 1000,
      specialization: "Cardiology",
    },
    selectedDoctorLoading: false,
  }),
}));

vi.mock("../../src/features/appointments/hooks/useAppointment", () => ({
  useAppointments: () => ({
    handleGetAvailableSlots: mockHandleGetAvailableSlots,
    slot: ["2026-08-15T04:30:00.000Z"],
    slotLoading: false,
    handleCreateAppointment: mockHandleCreateAppointment,
    creating: false,
    handleRescheduleAppointment: mockHandleRescheduleAppointment,
  }),
}));

vi.mock(
  "../../src/features/appointments/components/booking/BookingDoctorCard",
  () => ({
    default: ({ doctor }) => (
      <div>
        <span>{doctor.specialization}</span>
        <span>{doctor.consultationFee}</span>
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/booking/BookingSlotSection",
  () => ({
    default: ({ slotGroups, onSelectSlot }) => (
      <div>
        {slotGroups?.map((group) =>
          group.slots?.map((slot) => (
            <button
              key={slot.value}
              onClick={() => onSelectSlot(slot.value)}
            >
              {slot.label}
            </button>
          ))
        )}
      </div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/booking/SelectedSlotCard",
  () => ({
    default: ({ selectedSlot }) => (
      <div>Selected: {selectedSlot}</div>
    ),
  })
);

vi.mock(
  "../../src/features/appointments/components/booking/BookingSummaryCard",
  () => ({
    default: ({ disabled, onConfirm }) => (
      <button disabled={disabled} onClick={onConfirm}>
        Confirm Appointment
      </button>
    ),
  })
);

const renderBooking = () =>
  render(
    <MemoryRouter>
      <BookingPage />
    </MemoryRouter>
  );

describe("Booking Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockHandleGetDoctorById.mockResolvedValue({});
    mockHandleGetAvailableSlots.mockResolvedValue([]);
    mockHandleCreateAppointment.mockResolvedValue({});
    mockHandleRescheduleAppointment.mockResolvedValue({});
  });

  it("should load doctor and available slots", async () => {
    renderBooking();

    expect(mockHandleGetDoctorById).toHaveBeenCalledWith("doctor-1");

    await expect.poll(() =>
      mockHandleGetAvailableSlots
    ).toHaveBeenCalled();
  });

  it("should create an appointment after selecting a slot", async () => {
    const user = userEvent.setup();

    renderBooking();

    const confirmButton = screen.getByRole("button", {
      name: "Confirm Appointment",
    });

    expect(confirmButton).toBeDisabled();

    await user.click(
      screen.getByRole("button", { name: "10:00 AM" })
    );

    expect(confirmButton).toBeEnabled();

    await user.click(confirmButton);

    expect(mockHandleCreateAppointment).toHaveBeenCalledWith({
      doctorId: "doctor-1",
      appointmentDateTime: "2026-08-15T04:30:00.000Z",
    });
  });
});