import { CalendarCheck2, CheckCircle2, Clock3, XCircle } from "lucide-react";

const statConfig = [
  { key: "today", label: "Today", icon: CalendarCheck2, className: "bg-emerald-50 text-emerald-700" },
  { key: "pending", label: "Pending", icon: Clock3, className: "bg-amber-50 text-amber-700" },
  { key: "completed", label: "Completed", icon: CheckCircle2, className: "bg-teal-50 text-teal-700" },
  { key: "cancelled", label: "Cancelled", icon: XCircle, className: "bg-rose-50 text-rose-700" },
];

const DoctorAppointmentStats = ({ stats }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map((item) => {
        const Icon = item.icon;

        return (
          <section
            key={item.key}
            className="rounded-[20px] border border-emerald-100/70 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {stats[item.key]}
                </p>
              </div>
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.className}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DoctorAppointmentStats;
