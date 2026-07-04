const DashboardStatCards = ({ stats }) => {
  return (
    <section>
      <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-slate-950">
            Appointment overview
          </h2>
          <p className="mt-1 text-[15px] text-slate-600">
            A simple snapshot of your current booking activity.
          </p>
        </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="min-h-[140px] rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(15,118,110,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {stat.delta}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-1 text-[36px] font-semibold leading-none tracking-tight text-slate-950">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-600">{stat.note}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardStatCards;
