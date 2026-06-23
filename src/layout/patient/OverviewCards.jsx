const OverviewCards = ({ cards }) => {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {card.value}
              </p>
            </div>
            <h2 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.note}</p>
          </article>
        );
      })}
    </section>
  );
};

export default OverviewCards;
