import { CalendarDays, Clock3, MapPin } from "lucide-react";

const AppointmentMeta = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <span>{label}</span>
  </div>
);

const UpcomingAppointmentCard = ({ appointment }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Upcoming appointment
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {appointment.doctorName}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{appointment.specialization}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
          {appointment.avatarFallback}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <AppointmentMeta icon={CalendarDays} label={appointment.dateLabel} />
        <AppointmentMeta icon={Clock3} label={appointment.timeLabel} />
        <AppointmentMeta icon={MapPin} label={appointment.hospital} />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Reschedule
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
        >
          Cancel appointment
        </button>
      </div>
    </section>
  );
};

export default UpcomingAppointmentCard;
