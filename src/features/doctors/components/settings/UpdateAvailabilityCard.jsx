import { CalendarClock } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AvailabilityDayCard from "./AvailabilityDayCard";
import { zodResolver } from "@hookform/resolvers/zod";
import {availabilitySchema} from "../../schema/UpdateSlots.schema";
import { useDoctor } from "../../hooks/useDoctor";
import { AuthContext } from "../../../../shared/context/AuthContext";
import { useContext } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultAvailability = daysOfWeek.map((day) => ({
  day,
  slots: [],
}));

const buildSevenDayAvailability = (availability = []) => {
  return daysOfWeek.map((day) => {
    const savedDay = availability.find((item) => item.day === day);

    return {
      day,
      slots: savedDay?.slots || [],
    };
  });
};

const getSavedSlots = (availability = []) => {
  return availability
    .map((item) => ({
      day: item.day,
      slots: item.slots || [],
    }))
    .filter((item) => item.slots.length > 0);
};

const UpdateAvailabilityCard = ({ doctor,refreshDoctor }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    mode: "onChange",
    defaultValues: {
      availability: defaultAvailability,
    },
  });

  useEffect(() => {
    reset({
      availability: buildSevenDayAvailability(doctor?.availability),
    });
  }, [doctor, reset]);

 

  const {
   handleUpdateSlots,
  updatingSlots,
  
  } = useDoctor();

  const onSubmit = async (data) => {
    try {
    const response = await handleUpdateSlots(data);
    if(response.success){
    await refreshDoctor();
    }
    toast.success(response?.message || 'Slots updated successfully');
    
    
      
    } catch (error) {
      toast.error("Unable to update slots");
      
    }
  
  };

  const savedSlots = getSavedSlots(doctor?.availability);

  return (
    <section className="flex h-[680px] w-full flex-col rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <CalendarClock className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Slot availability
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
              Update booking hours
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Add working days and time ranges. Each range should use 24-hour
              time, and start time must be before end time.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 shrink-0 rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Current selected slots
        </p>

        {savedSlots.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-500">
            You don't have selected slots for appointments.
          </p>
        ) : (
          <div className="mt-3 max-h-28 overflow-y-auto pr-1">
            <div className="flex flex-wrap gap-2">
              {savedSlots.map((item) =>
                item.slots.map((slot, index) => (
                  <span
                    key={`${item.day}-${slot.start}-${slot.end}-${index}`}
                    className="inline-flex items-center rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {item.day}: {slot.start} - {slot.end}
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex min-h-0 flex-1 flex-col"
      >
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-4 xl:grid-cols-2">
            {daysOfWeek.map((day, dayIndex) => (
              <AvailabilityDayCard
                key={day}
                control={control}
                register={register}
                day={day}
                dayIndex={dayIndex}
                errors={errors}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 shrink-0 border-t border-slate-100 pt-4">
          <button
            type="submit"
            disabled={updatingSlots}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updatingSlots ? "Preparing..." : "Save Availability"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateAvailabilityCard;
