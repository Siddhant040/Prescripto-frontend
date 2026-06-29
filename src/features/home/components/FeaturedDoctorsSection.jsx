import { ArrowRight, Quote, Star, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedDoctorsSection = ({ doctors }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Our Best Doctors
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Trusted specialists patients love coming back to.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A featured selection of doctors with strong patient feedback to make
            the homepage feel more trustworthy and human.
          </p>
        </div>

        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-800"
        >
          View all doctors
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-medium text-emerald-700">
                    {doctor.specialty}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {doctor.experience}
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                {doctor.rating}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={`${doctor.id}-${index}`}
                  className="h-4 w-4 fill-current"
                />
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
              <Quote className="h-5 w-5 text-emerald-700" />
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {doctor.review}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDoctorsSection;
