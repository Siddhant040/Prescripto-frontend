import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const getInitials = (name) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const DoctorCard = ({
  doctor,
  basePath = "/doctors",
}) => {
  const name = doctor.user?.name ?? "Doctor";
  const initials = getInitials(name) || "DR";
  const specialization = doctor.specialization ?? "Specialist";
  const rating = doctor.rating ?? 0;
  const reviews = doctor.totalReviews ?? 0;
  const experience = doctor.experience ?? 0;
  const location = doctor.clinicAddress ?? "Clinic address not added";
  const fee = doctor.consultationFee ?? 0;

  return (
    <article className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_16px_32px_rgba(15,118,110,0.08)]">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-xl font-semibold text-white shadow-[0_12px_24px_rgba(15,118,110,0.18)]">
          {initials}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-base font-semibold text-slate-950">{name}</h3>
        <p className="mt-1 text-sm text-slate-500">{specialization}</p>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1 font-medium text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            {rating}
          </span>
          <span>({reviews})</span>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          {experience} Years Experience
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-emerald-700" />
            {location}
          </p>
          <p className="text-sm font-semibold text-emerald-700">
            Rs. {fee}
          </p>
        </div>

        <Link
           to={`${basePath}/${doctor._id}`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full border border-emerald-200 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default DoctorCard;
