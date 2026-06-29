import { Clock3, UserRound } from "lucide-react";

const DoctorSchedulePanel = ({ schedule }) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
        Today's Schedule
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        Patient consultations lined up
      </h2>

      <div className="mt-6 space-y-4">
        {schedule.map((item) => (
          <article
            key={`${item.patient}-${item.time}`}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.patient}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{item.concern}</p>
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
                Consultation ready
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DoctorSchedulePanel;
