import { Search, SlidersHorizontal } from "lucide-react";

const DoctorFilters = ({ showSearch = true }) => {
  return (
    <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        {showSearch ? (
          <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-100/70">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors by name, specialty..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        ) : null}

        <select className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none">
          <option>Specialization</option>
          <option>Cardiologist</option>
          <option>Dermatologist</option>
          <option>Orthopedic</option>
        </select>
        <select className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none">
          <option>Experience</option>
          <option>5+ years</option>
          <option>10+ years</option>
        </select>
        <select className="h-11 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm outline-none">
          <option>Fees</option>
          <option>Under Rs. 700</option>
          <option>Rs. 700 - Rs. 900</option>
        </select>
      </div>

      <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Sort by: Popular
      </button>
    </section>
  );
};

export default DoctorFilters;
