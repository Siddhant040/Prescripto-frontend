const DashboardQuickActions = ({ actions }) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-slate-950">
            Quick actions
          </h2>
          <p className="mt-1 text-[15px] text-slate-600">
            Start common tasks without opening another page first.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="group min-h-[120px] rounded-[20px] border border-emerald-100/70 bg-white p-5 text-left shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_32px_rgba(15,118,110,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${action.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-950">
                {action.title}
              </h3>
              <p className="mt-1 text-sm leading-5 text-slate-600 line-clamp-1">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardQuickActions;
