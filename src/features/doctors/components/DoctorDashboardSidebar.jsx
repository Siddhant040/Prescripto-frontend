import { ChevronRight } from "lucide-react";

const DoctorDashboardSidebar = ({ quickInfo = [], requests = [] }) => {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
          Quick info
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Practice snapshot
        </h2>

        <div className="mt-6 space-y-3">
          {quickInfo.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-950">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Patient requests
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Follow-ups to review
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            View all
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {requests.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.name}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Open appointment queue
          <ChevronRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
};

export default DoctorDashboardSidebar;
