import { Trash2 } from "lucide-react";

const AvailabilitySlotRow = ({
  register,
  dayIndex,
  slotIndex,
  onRemove,
  errors,
}) => {
  const slotErrors = errors?.availability?.[dayIndex]?.slots?.[slotIndex];

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Start
        </span>
        <input
          type="time"
          {...register(`availability.${dayIndex}.slots.${slotIndex}.start`, {
            required: "Start time is required",
          })}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
        />
        {slotErrors?.start && (
          <p className="mt-1 text-xs text-red-500">
            {slotErrors.start.message}
          </p>
        )}
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          End
        </span>
        <input
          type="time"
          {...register(`availability.${dayIndex}.slots.${slotIndex}.end`, {
            required: "End time is required",
          })}
          className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
        />
        {slotErrors?.end && (
          <p className="mt-1 text-xs text-red-500">{slotErrors.end.message}</p>
        )}
      </label>

      <button
        type="button"
        onClick={onRemove}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-red-100 px-3 text-red-600 transition hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AvailabilitySlotRow;
