const DoctorCategoryStrip = ({ categories, activeCategoryId, onCategoryChange }) => {
  return (
    <section className="rounded-[18px] border border-emerald-100/80 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-slate-950">
          Browse by Category
        </h2>
        <button
          type="button"
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          View all
        </button>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`flex min-w-[150px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition duration-200 ${
                isActive
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.18)]"
                  : "border-slate-100 bg-white text-slate-950 shadow-sm hover:border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isActive ? "bg-white/15 text-white" : category.accent
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {category.name}
                </span>
                <span
                  className={`mt-0.5 block text-xs ${
                    isActive ? "text-emerald-50" : "text-slate-500"
                  }`}
                >
                  {category.count} Doctors
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default DoctorCategoryStrip;
