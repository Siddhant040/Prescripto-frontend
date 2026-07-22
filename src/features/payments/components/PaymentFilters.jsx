import { Search } from "lucide-react";

const PaymentFilters = ({
  search,
  onSearch,
  status,
  onStatusChange,
  method,
  onMethodChange,
}) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_160px_160px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search doctor, receipt, appointment..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
          />
        </label>

        <FilterSelect
          label="Status"
          value={status}
          onChange={onStatusChange}
          options={["All", "Pending", "Paid", "Failed", "Refunded"]}
        />

        <FilterSelect
          label="Method"
          value={method}
          onChange={onMethodChange}
          options={["All", "Razorpay"]}
        />
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
      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default PaymentFilters;
