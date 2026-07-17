const DetailInfoGrid = ({ title, rows }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        {title}
      </p>

      <div className="mt-4 grid gap-3">
        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.label}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {row.label}
                </p>
                <p className="mt-1 break-words text-[15px] font-medium text-slate-900">
                  {row.value || "Not available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DetailInfoGrid;
