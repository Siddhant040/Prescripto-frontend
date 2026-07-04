const DashboardHeroCard = ({ content }) => {
  const PrimaryIcon = content.primaryAction.icon;
  const SecondaryIcon = content.secondaryAction.icon;

  return (
    <section className="relative overflow-hidden rounded-[20px] border border-emerald-200/60 bg-[linear-gradient(135deg,_#065f46_0%,_#0f766e_58%,_#14b8a6_100%)] p-6 text-white shadow-[0_16px_36px_rgba(15,118,110,0.18)]">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight">
            Your care, appointments, and doctors in one place
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-emerald-50/90">
            {content.description}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-emerald-800 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <PrimaryIcon className="h-4 w-4" />
              {content.primaryAction.label}
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <SecondaryIcon className="h-4 w-4" />
              {content.secondaryAction.label}
            </button>
          </div>
        </div>

        <div className="hidden rounded-[20px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm lg:block">
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/80">
            Next visit
          </p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-semibold">03 Jul 2026</p>
              <p className="mt-1 text-sm text-emerald-100/80">
                Dr. Sarah Johnson
              </p>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
              10:30 AM
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-semibold">12</p>
              <p className="text-xs text-emerald-100/75">Total</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-semibold">3</p>
              <p className="text-xs text-emerald-100/75">Upcoming</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-lg font-semibold">82%</p>
              <p className="text-xs text-emerald-100/75">Profile</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroCard;
