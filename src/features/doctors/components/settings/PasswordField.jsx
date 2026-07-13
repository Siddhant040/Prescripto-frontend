const PasswordField = ({ label, placeholder, register, name, error }) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <input
        type="password"
        placeholder={placeholder}
        {...register(name)}
        className={`mt-2 h-11 w-full rounded-2xl border px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 ${
          error ? "border-red-500" : "border-slate-200"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </label>
  );
};

export default PasswordField;
