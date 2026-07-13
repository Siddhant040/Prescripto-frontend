const SettingInfoRow = ({ icon: Icon, label, value, capitalize = false }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>
        <p
          className={`mt-1 truncate text-[15px] font-medium text-slate-900 ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

export default SettingInfoRow;
