import { Phone, Stethoscope, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { formatAppointmentTime } from "../appointmentUiData";
import { getInitials } from "./doctorAppointmentUiData";

const statusClasses = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-teal-50 text-teal-700 ring-teal-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const DoctorAppointmentCard = ({ appointment }) => {
  const patient = appointment.patient || {};

  return (
    <article className="rounded-[20px] border border-slate-100 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-100 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)]">
      <div className="grid gap-4 lg:grid-cols-[100px_minmax(0,1fr)_auto] lg:items-center">
        <p className="text-lg font-semibold text-emerald-700">
          {formatAppointmentTime(appointment.date)}
        </p>

        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
            {getInitials(patient.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-950">
              {patient.name || "Patient"}
            </h3>
            
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Phone className="h-4 w-4 text-emerald-700" />
              {patient.phone || "Phone not available"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
              statusClasses[appointment.status] || statusClasses.pending
            }`}
          >
            {appointment.status}
          </span>

          <Link
            to={`/doctor-dashboard/appointments/${appointment.id}`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            View Details
          </Link>

       
        </div>
      </div>
    </article>
  );
};

export default DoctorAppointmentCard;
