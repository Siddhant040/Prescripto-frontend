import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendedDoctors = ({ doctors }) => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/doctors")}
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          Browse all doctors
        </button>
      </div>

      {doctors.length === 0 ? (
        <div className="mt-4 rounded-[20px] border border-dashed border-emerald-100 bg-white p-6 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <p className="font-semibold text-slate-950">No doctors available</p>
          <p className="mt-2 text-sm text-slate-600">
            Recommended doctors will appear here when profiles are available.
          </p>
        </div>
      ) : null}

      <div className="mt-4 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {doctors.map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_32px_rgba(15,118,110,0.08)]"
          >
            <div className="flex items-start gap-4">
              {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
              {doctor.avatarFallback}
            </div>
          )}
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

            <div className="mt-4 flex gap-3 p-2">
              <button
                type="button"
                onClick={() => navigate(`/profile/doctors/${doctor.id}`)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Book appointment
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecommendedDoctors;
