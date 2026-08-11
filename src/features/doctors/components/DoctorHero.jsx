const DoctorHero = ({ content }) => {
  const heroCards = content?.cards || [];

  return (
    <section className="rounded-[2.25rem] bg-[linear-gradient(135deg,#111827_0%,#0f766e_55%,#34d399_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-100/80">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-emerald-50/90">
            {content.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[25rem]">
          {heroCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"
              >
                <Icon className="h-5 w-5 text-emerald-100" />
                <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 text-sm text-emerald-50/80">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DoctorHero;
