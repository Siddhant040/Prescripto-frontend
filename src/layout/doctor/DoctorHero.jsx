import { BadgeCheck, HeartPulse, Stethoscope } from "lucide-react";

const DoctorHero = () => {
  return (
    <section className="rounded-[2.25rem] bg-[linear-gradient(135deg,_#111827_0%,_#0f766e_55%,_#34d399_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-100/80">
            Doctor Dashboard
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Welcome, Dr. Aisha Kapoor.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-emerald-50/90">
            Manage consultations, patient requests, reports, and daily clinic
            flow from a focused workspace built for doctors.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[25rem]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <HeartPulse className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Next Visit</p>
            <p className="mt-1 text-sm text-emerald-50/80">10:30 AM today</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <BadgeCheck className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Status</p>
            <p className="mt-1 text-sm text-emerald-50/80">Verified doctor</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <Stethoscope className="h-5 w-5 text-emerald-100" />
            <p className="mt-3 text-sm font-medium text-white">Specialty</p>
            <p className="mt-1 text-sm text-emerald-50/80">Cardiology</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHero;
