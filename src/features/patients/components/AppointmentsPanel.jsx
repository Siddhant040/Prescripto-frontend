import { CalendarDays, Clock3, MapPin } from "lucide-react";

const AppointmentsPanel = ({ appointments }) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Upcoming Appointments
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Your next scheduled visits
          </h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
        >
          View all
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {appointments.map((appointment) => (
          <article
            key={`${appointment.doctor}-${appointment.date}-${appointment.time}`}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {appointment.doctor}
                </h3>
                <p className="mt-1 text-sm font-medium text-emerald-700">
                  {appointment.specialty}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {appointment.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {appointment.time}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {appointment.mode}
                  </span>
                </div>
              </div>

              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                {appointment.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AppointmentsPanel;
