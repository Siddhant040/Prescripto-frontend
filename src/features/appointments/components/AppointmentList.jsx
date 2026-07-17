import { ChevronLeft, ChevronRight } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({ appointments, page, limit, total }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <section className="flex h-[560px] flex-col rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Appointment list
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
            All appointments
          </h2>
        </div>

        <p className="text-sm font-medium text-slate-500">
          {total} records
        </p>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        {appointments.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 text-sm font-medium text-slate-500">
            No appointments found.
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-emerald-600 px-3 text-sm font-semibold text-white"
          >
            {page}
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppointmentList;
