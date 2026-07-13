const CreateDoctorField = ({
  label,
  hint,
  error,
  children,
  className = "",
}) => {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>

      {children}

      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}

      {error && <p className="mt-1.5 text-sm text-red-500">{error.message}</p>}
    </label>
  );
};

export default CreateDoctorField;
