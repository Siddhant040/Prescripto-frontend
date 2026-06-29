import { ArrowRight, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const SpecialtiesSection = ({ specialtyCards }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="rounded-[2.25rem] border border-emerald-100 bg-[linear-gradient(180deg,_#ffffff_0%,_#ecfdf5_100%)] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Popular Specialties
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
              Care categories patients expect to find first.
            </h2>
          </div>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-800"
          >
            Browse all doctors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {specialtyCards.map((specialty) => (
            <article
              key={specialty.title}
              className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_16px_35px_rgba(15,23,42,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                {specialty.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {specialty.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
