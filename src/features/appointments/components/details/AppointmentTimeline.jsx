import { CheckCircle2, Circle } from "lucide-react";

const timelineByStatus = {
  pending: ["booked"],
  confirmed: ["booked", "confirmed"],
  completed: ["booked", "confirmed", "completed"],
  cancelled: ["booked", "cancelled"],
};

const AppointmentTimeline = ({ status }) => {
  const activeSteps = timelineByStatus[status] 
  const steps =
    status === "cancelled"
      ? [
          { key: "booked", label: "Appointment Booked" },
          { key: "cancelled", label: "Cancelled" },
        ]
      : [
          { key: "booked", label: "Appointment Booked" },
          { key: "confirmed", label: "Confirmed" },
          { key: "completed", label: "Completed" },
        ];

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Appointment timeline
      </p>

      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const isActive = activeSteps.includes(step.key);
          const Icon = isActive ? CheckCircle2 : Circle;

          return (
            <div key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-emerald-600" : "text-slate-300"
                  }`}
                />
                {index < steps.length - 1 && (
                  <span className="mt-2 h-8 w-px bg-slate-200" />
                )}
              </div>
              <p
                className={`text-sm font-semibold ${
                  isActive ? "text-slate-950" : "text-slate-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AppointmentTimeline;
