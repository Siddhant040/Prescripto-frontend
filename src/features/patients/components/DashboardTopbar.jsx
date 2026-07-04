const DashboardTopbar = ({ greeting, subtitle }) => {
  return (
    <section className="pb-1">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
        Overview
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-[2.5rem]">
        {greeting}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
        {subtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          3 upcoming appointments
        </span>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          82% profile complete
        </span>
      </div>
    </section>
  );
};

export default DashboardTopbar;
