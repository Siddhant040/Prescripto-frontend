import { BadgeCheck, ClipboardCheck, Stethoscope } from "lucide-react";

const CreateDoctorHero = () => {
  return (
    <section className="overflow-hidden rounded-[24px] border border-emerald-100/80 bg-[linear-gradient(135deg,_#064e3b,_#0f766e_55%,_#14b8a6)] p-6 text-white shadow-[0_18px_38px_rgba(15,118,110,0.18)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50">
            <Stethoscope className="h-4 w-4" />
            Doctor onboarding
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your doctor profile
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50/90">
            Add your specialization, clinic details, qualifications, and
            consultation fee so patients can understand your practice.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
          <HeroStep
            icon={ClipboardCheck}
            title="Profile review"
            text="Your doctor details can be reviewed before public listing."
          />
          <HeroStep
            icon={BadgeCheck}
            title="Verified listing"
            text="Verification status is handled separately by admin flow."
          />
        </div>
      </div>
    </section>
  );
};

const HeroStep = ({ icon: Icon, title, text }) => {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-emerald-50/80">{text}</p>
    </div>
  );
};

export default CreateDoctorHero;
