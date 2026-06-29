const PrescriptionsPanel = ({ prescriptions }) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
        Prescriptions
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        Current medications
      </h2>

      <div className="mt-6 space-y-4">
        {prescriptions.map((item) => (
          <article
            key={item.name}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.instruction}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Active
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-emerald-700">
              {item.refill}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PrescriptionsPanel;
