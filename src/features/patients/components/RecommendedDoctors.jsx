import { Star } from "lucide-react";

const RecommendedDoctors = ({ doctors }) => {
  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Recommended doctors
          </p>
          <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-slate-950">
            Specialists you can book next
          </h2>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          Browse all doctors
        </button>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {doctors.map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_32px_rgba(15,118,110,0.08)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#ccfbf1,_#6ee7b7)] text-sm font-semibold text-emerald-900">
                {doctor.avatarFallback}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-slate-950">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{doctor.specialization}</p>
                <p className="mt-2 text-sm text-slate-500">{doctor.experience}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">{doctor.rating}</span>
              <span>from {doctor.reviewCount} reviews</span>
            </div>

            <div className="mt-4 p-2 flex gap-3">
              <button
                type="button"
                className="inline-flex  h-10 flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Book appointment
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                View profile
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecommendedDoctors;
