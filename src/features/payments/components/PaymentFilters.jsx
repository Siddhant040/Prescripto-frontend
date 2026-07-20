import { Filter, Search } from "lucide-react";

const PaymentFilters = ({
  search,
  onSearch,
  status,
  onStatusChange,
  method,
  onMethodChange,
}) => {
  return (
    <section className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_180px_180px_auto]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search doctor, receipt, appointment..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />
        </label>

        <FilterSelect
          label="Status"
          value={status}
          onChange={onStatusChange}
          options={["All", "Paid", "Pending", "Failed"]}
        />

        <FilterSelect
          label="Method"
          value={method}
          onChange={onMethodChange}
          options={["All", "Razorpay"]}
        />

        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 transition hover:border-emerald-200 hover:bg-emerald-100"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>
    </section>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);

export default PaymentFilters;
