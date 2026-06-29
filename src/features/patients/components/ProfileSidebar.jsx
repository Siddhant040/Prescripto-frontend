import { HeartPulse, Shield, UserRound } from "lucide-react";

const ProfileSidebar = ({ healthSummary, recentActivity }) => {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-white">
            <UserRound className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Aarav Mehta
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Patient ID: PR-20481
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {healthSummary.map((item) => (
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

        <div className="mt-6 flex items-center gap-3 rounded-[1.5rem] bg-emerald-50 p-4 text-emerald-900">
          <Shield className="h-5 w-5" />
          <p className="text-sm font-medium">
            Profile is 92% complete and ready for future account actions.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-3">
          <HeartPulse className="h-5 w-5 text-emerald-700" />
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Recent Activity
          </h2>
        </div>

        <div className="mt-6 space-y-5">
          {recentActivity.map((item) => (
            <article
              key={`${item.title}-${item.time}`}
              className="border-l-2 border-emerald-200 pl-4"
            >
              <p className="text-sm font-semibold text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                {item.time}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileSidebar;
