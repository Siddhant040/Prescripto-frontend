import { Link } from "react-router-dom";
import {
  CalendarDays,
  Star,
  UserRound,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "text-slate-300"
        }`}
      />
    ))}

    <span className="ml-2 text-sm font-semibold text-slate-700">
      {rating.toFixed(1)}
    </span>
  </div>
);

const Meta = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>

    <span className="font-medium text-slate-700">
      {label}
    </span>
  </div>
);

const DoctorReviewCard = ({ review }) => {
  const patient = review.patient;

  return (
    <article className="rounded-[20px] border border-slate-100 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] transition hover:border-emerald-100 hover:shadow-[0_14px_28px_rgba(15,23,42,0.06)]">

      <div className="flex flex-col gap-5">

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">

            {patient.avatar ? (
              <img
                src={patient.avatar}
                alt={patient.name}
                className="h-14 w-14 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
                {getInitials(patient.name)}
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {patient.name}
              </h3>

              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <UserRound className="h-4 w-4 text-emerald-700" />
                Patient
              </p>
            </div>

          </div>

          <StarRating rating={review.rating} />

        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquare className="h-4 w-4 text-emerald-700" />
            Patient Feedback
          </div>

          <p className="text-sm leading-7 text-slate-600">
            {review.review || "No written review provided."}
          </p>

        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="grid gap-3 sm:grid-cols-2">

            <Meta
              icon={CalendarDays}
              label={format(
                new Date(review.appointment.date),
                "dd MMM yyyy"
              )}
            />

            <Meta
              icon={CalendarDays}
              label={`Reviewed ${format(
                new Date(review.createdAt),
                "dd MMM yyyy"
              )}`}
            />

          </div>

          <Link
            to={`/doctor-dashboard/appointments/${review.appointment.id}`}
            className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            View Appointment
          </Link>

        </div>

      </div>

    </article>
  );
};

export default DoctorReviewCard;