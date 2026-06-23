import { HeartPulse, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";

const values = [
  {
    title: "Accessible Care",
    description:
      "We want patients to find the right doctor quickly, without getting lost in a complicated process.",
    icon: Stethoscope,
  },
  {
    title: "Trust First",
    description:
      "Prescripto is shaped around clarity, reliable access, and a more confident first step into care.",
    icon: ShieldCheck,
  },
  {
    title: "Patient Focus",
    description:
      "Every page is meant to reduce confusion and help people understand where to go next.",
    icon: UsersRound,
  },
];

const About = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            About Prescripto
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-slate-950 sm:text-6xl">
            A simpler front door to healthcare for patients who need clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Prescripto is a patient-facing healthcare platform designed to help
            people discover doctors, understand specialties, and move toward the
            right care path with less stress.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            This project is focused on building a clean, trustworthy experience
            where medical access feels organized from the homepage onward.
          </p>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_28px_70px_rgba(15,23,42,0.18)] sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <HeartPulse className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">
            Why this platform matters
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Healthcare journeys often begin with uncertainty. Prescripto aims to
            replace that confusion with a calmer experience that helps patients
            explore options and connect with care more confidently.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <article
              key={value.title}
              className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {value.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default About;
