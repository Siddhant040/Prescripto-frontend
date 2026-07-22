import { CalendarDays, CreditCard, FileText, IndianRupee, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
};

const actionConfig = {
  patient: {
    paid: {
      label: "View Receipt",
      className:
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50",
    },
    pending: {
      label: "Continue Payment",
      className:
        "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700",
    },
  },
  doctor: {
    label: "View Details",
    className:
      "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50",
  },
};

const getInitials = (name) => {
  if (!name) return "DR";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

const formatAppointmentDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const PaymentCard = ({
  payment,
  detailsBasePath = "/profile/payment",
  pendingAction = "appointment",
  displayPerson = "doctor",
  subtitleText,
}) => {
  const navigate = useNavigate();
  const status = String(payment.status || "Pending").toLowerCase();
  const doctorName =
    typeof payment.doctor === "string"
      ? payment.doctor
      : payment.doctor?.name || "Doctor";
  const patientName =
    typeof payment.patient === "string"
      ? payment.patient
      : payment.patient?.name || "Patient";
  const primaryName = displayPerson === "patient" ? patientName : doctorName;
  const specialization =
    payment.speciality || payment.doctor?.specialization || "Consultation";
  const appointmentDate =
    payment.appointmentDate || payment.appointment?.date || "Date";
  const appointmentTime =
    payment.appointmentTime || payment.appointment?.time || "Time";
  const paymentMethod = (payment.provider || "Razorpay").toUpperCase();
  const amount = payment.amount || 0;
  const avatar =
    displayPerson === "patient"
      ? payment.patient?.avatar || ""
      : payment.doctor?.avatar || "";

  const isDoctorDetailsMode = pendingAction === "details";
  const action = isDoctorDetailsMode
    ? actionConfig.doctor
    : actionConfig.patient[status] || actionConfig.patient.pending;

  const handleAction = () => {
    if (status === "pending" && pendingAction === "appointment") {
      navigate(`/profile/appointments/${payment.appointment?.id}`);
      return;
    }

    navigate(`${detailsBasePath}/${payment.id}`);
  };

  return (
    <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-100 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          {avatar ? (
            <img
              src={avatar}
              alt={primaryName}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#34d399)] text-sm font-semibold text-white">
              {getInitials(primaryName)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-slate-950">
                {primaryName}
              </h3>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                  statusStyles[status] || statusStyles.pending
                }`}
              >
                {status}
              </span>
            </div>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Stethoscope className="h-4 w-4 text-emerald-700" />
              {subtitleText || specialization}
            </p>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:min-w-107.5">
          <Meta
            icon={CalendarDays}
            label={formatAppointmentDate(appointmentDate)}
          />
          <Meta icon={CreditCard} label={paymentMethod} />
          <Meta icon={IndianRupee} label={`₹${amount}`} />
        </div>

        <button
          type="button"
          onClick={handleAction}
          className={action.className}
          aria-label={action.label}
        >
          <FileText className="h-4 w-4" />
          {action.label}
        </button>
      </div>
    </article>
  );
};

const Meta = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <span className="font-medium text-slate-700">{label}</span>
  </div>
);

export default PaymentCard;
