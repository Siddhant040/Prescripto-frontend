import { CalendarDays, Clock3 } from "lucide-react";
import { formatBookingDate, formatBookingTime } from "./bookingFallbackData";

const SelectedSlotCard = ({ selectedDate, selectedSlot }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Selected slot
      </p>

      <div className="mt-4 grid gap-3">
        <SlotMeta icon={CalendarDays} label={formatBookingDate(selectedDate)} />
        <SlotMeta icon={Clock3} label={formatBookingTime(selectedSlot)} />
      </div>
    </section>
  );
};

const SlotMeta = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-sm font-semibold text-slate-900">{label}</p>
    </div>
  );
};

export default SelectedSlotCard;
