import { useState, useEffect } from "react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BookingDoctorCard from "../components/booking/BookingDoctorCard";
import BookingSlotSection from "../components/booking/BookingSlotSection";
import BookingSummaryCard from "../components/booking/BookingSummaryCard";
import SelectedSlotCard from "../components/booking/SelectedSlotCard";
import {
  generateBookingDates,
  bookingDoctorFallback,
  groupSlots,
  buildAppointmentDateTime,
} from "../components/booking/bookingFallbackData";
import { useDoctor } from "../../doctors/hooks/useDoctor";
import { useAppointments } from "../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function BookingPage() {
  const location = useLocation();

const { isReschedule, appointmentId } = location.state || {};
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const bookingDateOptions = generateBookingDates();
  const [selectedDate, setSelectedDate] = useState(bookingDateOptions[0].value);
  const [selectedSlot, setSelectedSlot] = useState("");
  const { handleGetDoctorById,
    selectedDoctor,
    selectedDoctorLoading } = useDoctor();
  const { handleGetAvailableSlots, slot, slotLoading,handleCreateAppointment,creating,handleRescheduleAppointment,rescheduling } = useAppointments();
  const doctor = selectedDoctor;

  useEffect(() => {
    handleGetDoctorById(id);
  }, [id]);

  useEffect(() => {
    if (!doctor?._id) return;
    const doctorId = doctor._id;

    handleGetAvailableSlots(doctorId, selectedDate);
  }, [doctor?._id, selectedDate]);
  useEffect(() => {
  setSelectedSlot("");
}, [selectedDate]);

  const groupedSlots = useMemo(() => groupSlots(slot), [slot]);

  if (selectedDoctorLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedDoctor) {
    return <div>Doctor not found</div>;
  }
  if (slotLoading) {
    return <div>Loading...</div>;
  }

  const handleConfirm = async() => {
   const payload = {
  doctorId: doctor._id,
  appointmentDateTime: selectedSlot,
};
  if (isReschedule) {
    await handleRescheduleAppointment(
      appointmentId,
      {
        appointmentDateTime: selectedSlot,
      }
    );

    navigate(`/profile/appointments/${appointmentId}`);
  } else {
    await handleCreateAppointment(payload);
  }
};

  return (
    <div className="w-full px-1 pb-1">
      <Link
        to={-1}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Book appointment
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
          Choose a slot and confirm your visit.
        </h1>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="space-y-4">
          <BookingDoctorCard doctor={doctor} />
          <BookingSlotSection
            bookingDates={bookingDateOptions}
            slotGroups={groupedSlots}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSelectDate={setSelectedDate}
            onSelectSlot={setSelectedSlot}
          />
        </div>

        <div className="space-y-4 xl:sticky xl:top-28">
          <SelectedSlotCard
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
          <BookingSummaryCard
            fee={doctor.consultationFee}
             loading={creating}
            disabled={!selectedDate || !selectedSlot}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
