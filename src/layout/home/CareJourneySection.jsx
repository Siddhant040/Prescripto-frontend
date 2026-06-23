import { CircleCheckBig } from "lucide-react";

const CareJourneySection = ({ careSteps }) => {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Care Journey
        </p>
        <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-tight">
          A homepage that tells patients exactly what they can do next.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
          The current experience now gives your project a strong first
          impression while guiding visitors toward doctors, platform
          information, and support contact.
        </p>
      </div>

      <div className="space-y-4">
        {careSteps.map((step) => (
          <div
            key={step}
            className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <CircleCheckBig className="h-5 w-5" />
            </div>
            <p className="text-base leading-7 text-slate-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareJourneySection;
