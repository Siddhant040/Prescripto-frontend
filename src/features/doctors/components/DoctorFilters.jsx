import { Search } from "lucide-react";

const DoctorFilters = ({
  filters,
  setFilters,
  specializations = [],
  experienceOptions = [],
  feeOptions = [],
  sortOptions = [],
  showSearch = true,
}) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        {showSearch && (
          <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-100/70">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={filters.search}
              onChange={(e) =>
                handleChange("search", e.target.value)
              }
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        )}

        <select
          value={filters.specialization}
          onChange={(e) =>
            handleChange("specialization", e.target.value)
          }
          className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none"
        >
          <option value="">All Specializations</option>
          {specializations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={filters.experience}
          onChange={(e) =>
            handleChange("experience", e.target.value)
          }
          className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none"
        >
          <option value="">Any Experience</option>
          {experienceOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={filters.fee}
          onChange={(e) =>
            handleChange("fee", e.target.value)
          }
          className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none"
        >
          <option value="">Any Fee</option>
          {feeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <select
        value={filters.sort}
        onChange={(e) => handleChange("sort", e.target.value)}
        className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm outline-none"
      >
        {sortOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </section>
  );
};

export default DoctorFilters;