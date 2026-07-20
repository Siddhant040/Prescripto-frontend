import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppointmentActions from "../components/details/AppointmentActions";
import AppointmentDetailHero from "../components/details/AppointmentDetailHero";
import AppointmentTimeline from "../components/details/AppointmentTimeline";
import DetailInfoGrid from "../components/details/DetailInfoGrid";
import PrescriptionCard from "../../patients/components/PrescriptionPanel";
import {
  appointmentDetailFallback,
  getAppointmentInfoRows,
  getPatientInfoRows,
} from "../components/details/appointmentDetailFallback";
import { useAppointments } from "../hooks/useAppointment";
import { useEffect } from "react";
import { handlePaynow } from "../../payments/services/paymentService";
import { usePayment } from "../../payments/hooks/usePayment";
import { useAuth } from "../../auth/hooks/checkAuth";
import toast from "react-hot-toast";

function AppointmentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { handleGetAppointmentbyId, selectedAppointment, appointmentLoading, handleCancelAppointment, canceling } = useAppointments();
  const { isCreating, handleCreateOrder, handleVerifyPayment, handleGetPaymentById, paymentloading, payments } = usePayment();

  useEffect(() => {
    handleGetAppointmentbyId(id);
    // handleGetPaymentById(id);
  }, [id]);

  if (appointmentLoading) {
    return <div>Loading</div>;
  }

  console.log("selectedAppointment", selectedAppointment);
  const appointment = selectedAppointment || appointmentDetailFallback;
  const cancelAppointment = async (id) => {
    try {
      await handleCancelAppointment(id);
      handleGetAppointmentbyId(id);
    } catch (error) {
      console.log(error);
      toast.error("Unable to cancel appointments");
    }
  };

  const handlePayNow = async () => {
    await handlePaynow({
      appointment,
      user,
      handleCreateOrder,
      handleVerifyPayment,
      handleGetAppointmentbyId,
    });
  };

  const handleReschedule = () => {
  navigate(`/profile/doctors/${appointment.doctor.id}/booking`, {
    state: {
      isReschedule: true,
      appointmentId: appointment.id,
    },
  });
};

  return (
    <div className="w-full px-1 pb-1">
      <Link
        to="/profile/appointments"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Appointments
      </Link>

      <div className="mb-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Appointment details
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
          Track your appointment information.
        </h1>
      </div>

      <div className="space-y-4">
        <AppointmentDetailHero appointment={appointment} />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <DetailInfoGrid
            title="Appointment info"
            rows={getAppointmentInfoRows(appointment)}
          />
          <DetailInfoGrid
            title="Patient information"
            rows={getPatientInfoRows(appointment)}
          />
        </div>

        <PrescriptionCard prescription={appointment.prescription} />

        <AppointmentTimeline status={appointment.status} />

        <AppointmentActions
          appointment={appointment}
          onCancel={cancelAppointment}
          isCancelling={canceling}
          onReschedule={handleReschedule}
          isRescheduling={false}
          onPayNow={handlePayNow}
          isPaid={appointment.paymentStatus === "paid"}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}

export default AppointmentDetailPage;
