import { CalendarDays, Clock3, UserRound } from "lucide-react";

const EmptyTodaySchedule = () => (
  <div className="flex h-[420px] flex-col items-center justify-center px-8 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <CalendarDays className="h-8 w-8" />
    </div>

    <h3 className="mt-5 text-lg font-semibold text-slate-900">
      No appointments today
    </h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      Your schedule is clear for today. New appointments will appear here once
      they're booked.
    </p>
  </div>
);

const DoctorSchedulePanel = ({ schedule = [] }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">
          Today's Schedule
        </h2>
      </div>

      {schedule.length === 0 ? (
        <EmptyTodaySchedule />
      ) : (
        <div className="mt-3 space-y-3">
          {schedule.map((item) => (
            <article
              key={`${item.patient}-${item.time}`}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 transition hover:border-emerald-200 hover:bg-white"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.patient}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {item.concern}
                  </p>
                </div>

                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  {item.type}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {item.time}
                </span>

                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  Consultation Ready
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorSchedulePanel;