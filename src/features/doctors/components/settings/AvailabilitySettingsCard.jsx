import { Activity, Power } from "lucide-react";

const AvailabilitySettingsCard = ({ isAvailable, onToggle }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Availability
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
              Patient booking status
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isAvailable}
          className={`relative h-8 w-14 rounded-full transition ${
            isAvailable ? "bg-emerald-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-500 shadow transition ${
              isAvailable ? "left-7 text-emerald-700" : "left-1"
            }`}
          >
            <Power className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-sm font-semibold text-slate-950">
          {isAvailable ? "Available for appointments" : "Not accepting bookings"}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Toggle this when you want patients to see your booking availability
          across the platform.
        </p>
      </div>
    </section>
  );
};

export default AvailabilitySettingsCard;
