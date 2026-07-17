import { Stethoscope } from "lucide-react";
import { getInitials } from "../appointmentUiData";

const statusClasses = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-teal-50 text-teal-700 ring-teal-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const indicatorClasses = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  completed: "bg-teal-50 text-teal-700",
  cancelled: "bg-rose-50 text-rose-700",
};

const indicatorDot = {
  pending: "bg-amber-500",
  confirmed: "bg-emerald-500",
  completed: "bg-teal-500",
  cancelled: "bg-rose-500",
};

const AppointmentDetailHero = ({ appointment }) => {
  const doctor = appointment.doctor || {};

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-lg font-semibold text-white">
              {getInitials(doctor.name)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-950">
                {doctor.name || "Doctor"}
              </h2>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                  statusClasses[ appointment.status] 
                }`}
              >
                {appointment.status }
              </span>
            </div>

            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Stethoscope className="h-4 w-4" />
              {doctor.specialization || "Specialist"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              { doctor.clinicAddress || "Clinic details not available"}
            </p>
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            indicatorClasses[appointment.status] || "bg-emerald-50 text-emerald-700"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full ${
              indicatorDot[appointment.status] || "bg-emerald-500"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetailHero;
