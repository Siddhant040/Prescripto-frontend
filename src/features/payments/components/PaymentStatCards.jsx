const PaymentStatCards = ({ stats }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <section
            key={stat.label}
            className="rounded-[20px] border border-emerald-100/70 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
              </div>

              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.accent}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">{stat.note}</p>
          </section>
        );
      })}
    </div>
  );
};

export default PaymentStatCards;
