import { BadgeCheck, ClipboardList, UserCog } from "lucide-react";

const DoctorSidebar = ({ quickInfo, requests }) => {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-5 w-5 text-emerald-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Doctor Status
          </h2>
        </div>

        <div className="mt-6 grid gap-4">
          {quickInfo.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-5 w-5 text-emerald-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Priority Queue
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          {requests.map((item) => (
            <article
              key={item.name}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
            >
              <p className="text-sm font-semibold text-slate-950">{item.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-3">
          <UserCog className="h-5 w-5 text-emerald-800" />
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">
            Workspace Ready
          </h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This doctor dashboard is UI-only for now, so we can connect live
          patients, schedules, and approvals later.
        </p>
      </section>
    </div>
  );
};

export default DoctorSidebar;
