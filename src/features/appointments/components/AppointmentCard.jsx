import { CalendarDays, Clock3, IndianRupee, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import {
  formatAppointmentDate,
  formatAppointmentTime,
  getInitials,
} from "./appointmentUiData";

const statusClasses = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-teal-50 text-teal-700 ring-teal-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const AppointmentCard = ({ appointment }) => {
  const doctor = appointment.doctor || {};

  return (
    <article className="rounded-[20px] border border-slate-100 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-100 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
              {getInitials(doctor.name)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-slate-950">
                {doctor.name || "Doctor"}
              </h3>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                  statusClasses[appointment.status] || statusClasses.pending
                }`}
              >
                {appointment.status}
              </span>
            </div>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Stethoscope className="h-4 w-4 text-emerald-700" />
              {doctor.specialization || "Specialist"}
            </p>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:min-w-[430px]">
          <Meta
            icon={CalendarDays}
            label={formatAppointmentDate(appointment.date)}
          />
          <Meta icon={Clock3} label={formatAppointmentTime(appointment.date)} />
          <Meta
            icon={IndianRupee}
            label={`Rs. ${doctor.consultationFee || 0}`}
          />
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          <Link to={`/profile/appointments/${appointment.id}`}>
          View details
          </Link>
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

export default AppointmentCard;
