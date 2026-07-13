import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import AvailabilitySlotRow from "./AvailabilitySlotRow";

const AvailabilityDayCard = ({
  control,
  register,
  day,
  dayIndex,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${dayIndex}.slots`,
  });

  return (
    <div className="flex h-[270px] flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <input
            type="hidden"
            value={day}
            {...register(`availability.${dayIndex}.day`)}

          />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Day
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
            {day}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => append({ start: "09:00", end: "10:00" })}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <Plus className="h-4 w-4" />
            Add slot
          </button>
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {fields.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-sm font-medium text-slate-400">
            No slots
          </div>
        ) : (
          fields.map((field, slotIndex) => (
            <AvailabilitySlotRow
              key={field.id}
              register={register}
              dayIndex={dayIndex}
              slotIndex={slotIndex}
              onRemove={() => remove(slotIndex)}
              errors={errors}
            />
          ))
        )}
      </div>
      {errors.availability?.[dayIndex]?.slots?.message && (
        <p className="mt-2 text-sm text-red-500">
          {errors.availability[dayIndex].slots.message}
        </p>
      )}
    </div>
  );
};

export default AvailabilityDayCard;
