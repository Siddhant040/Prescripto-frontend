const PaymentStatCards = ({ stats }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.accent}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-slate-500">
                {stat.label}
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold text-slate-950">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-slate-500">{stat.note}</p>
          </article>
        );
      })}
    </div>
  );
};

export default PaymentStatCards;
