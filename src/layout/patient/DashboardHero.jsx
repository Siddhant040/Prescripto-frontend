import { Bell, CalendarCheck2, Settings } from "lucide-react";

const DashboardHero = () => {
  return (
    <section className="rounded-[2.25rem] bg-[linear-gradient(135deg,_#0f172a_0%,_#134e4a_58%,_#34d399_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-100/80">
            Patient Dashboard
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Welcome back, Aarav.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-emerald-50/90">
            Keep track of your appointments, prescriptions, reports, and care
            updates from one calm dashboard experience.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[24rem]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <CalendarCheck2 className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Next Visit</p>
            <p className="mt-1 text-sm text-emerald-50/80">28 May, 10:30 AM</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <Bell className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Alerts</p>
            <p className="mt-1 text-sm text-emerald-50/80">2 reminders waiting</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <Settings className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Profile</p>
            <p className="mt-1 text-sm text-emerald-50/80">Personal details ready</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
