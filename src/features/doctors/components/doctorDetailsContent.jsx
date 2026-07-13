import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Star,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function DoctorDetailsContent({
  doctor,
  initials,
  availability,
  selectedDay,
  selectedSlot,
  setSelectedDay,
  setSelectedSlot,
  slotList,
  reviewList,
  similarDoctors,
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,65fr)_minmax(360px,35fr)]">
        <Panel className="h-[650px]">
          <div className="grid h-full min-h-0 gap-7 p-6 md:grid-cols-[260px_minmax(0,1fr)] lg:p-8">
            <div className="flex min-h-0 flex-col">
              <div className="flex h-[300px] shrink-0 items-center justify-center rounded-3xl bg-[radial-gradient(circle_at_50%_30%,_#a7f3d0_0%,_#dcfce7_45%,_#f8fafc_100%)]">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#047857,_#14b8a6)] text-5xl font-bold text-white shadow-[0_24px_45px_rgba(5,150,105,0.25)] ring-8 ring-white">
                  {initials}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <InfoPill
                  icon={Star}
                  label="Rating"
                  value={doctor.rating || "New"}
                />
                <InfoPill
                  icon={CalendarDays}
                  label="Reviews"
                  value={`${doctor.totalReviews} total`}
                />
              </div>
            </div>

            <div className="flex min-h-0 flex-col">
              <div className="shrink-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified Doctor
                  </span>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      doctor.isAvailable
                        ? "bg-green-50 text-green-700"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {doctor.isAvailable
                      ? "Available today"
                      : "Currently unavailable"}
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 lg:text-5xl">
                  Dr. {doctor.user.name}
                </h1>
                <p className="mt-3 text-lg font-semibold text-emerald-700">
                  {doctor.specialization}
                </p>

                <div className="mt-6 grid gap-3 lg:grid-cols-3">
                  <HeroFact
                    icon={MapPin}
                    label="Location"
                    value={doctor.clinicAddress}
                  />
                  <HeroFact
                    icon={BriefcaseBusiness}
                    label="Experience"
                    value={`${doctor.experience} Years`}
                  />
                  <HeroFact
                    icon={GraduationCap}
                    label="Qualification"
                    value={doctor.qualifications.join(", ")}
                  />
                </div>
              </div>

              <div className="mt-6 min-h-0 flex-1 rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-100">
                <h2 className="text-base font-semibold text-slate-950">
                  About Doctor
                </h2>
                <div className="mt-3 max-h-[210px] overflow-y-auto pr-2">
                  <p className="text-sm leading-7 text-slate-600">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Slot Generation" className="h-[650px]">
          <div className="flex h-[calc(650px-4rem)] min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="grid gap-3">
                {availability.map((daySchedule) => (
                  <button
                    key={daySchedule._id}
                    type="button"
                    onClick={() => {
                      setSelectedDay(daySchedule);
                      setSelectedSlot(daySchedule.slots[0] || null);
                    }}
                    className={`rounded-3xl p-4 text-left ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      selectedDay?._id === daySchedule._id
                        ? "bg-emerald-600 text-white ring-emerald-600 shadow-[0_14px_28px_rgba(5,150,105,0.2)]"
                        : "bg-white text-slate-800 ring-emerald-100 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-semibold">
                        {daySchedule.day}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          selectedDay?._id === daySchedule._id
                            ? "bg-white/15 text-white"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {daySchedule.slots.length} Slot(s)
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-5">
              <p className="mb-3 text-sm font-semibold text-slate-950">
                Selected time slots
              </p>
              <div className="flex max-h-[128px] flex-wrap gap-3 overflow-y-auto pr-1">
                {slotList.map((slot) => (
                  <button
                    key={slot._id}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
                      selectedSlot?._id === slot._id
                        ? "bg-emerald-600 text-white ring-emerald-600"
                        : "bg-white text-slate-700 ring-emerald-100 hover:bg-emerald-50"
                    }`}
                  >
                    {slot.start} - {slot.end}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <section className="flex h-[110px] items-center justify-between gap-4 overflow-hidden rounded-3xl border border-emerald-100 bg-white px-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Ready to Book
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Confirm a slot and continue with appointment booking.
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-sm text-slate-500">Consultation Fee</p>
          <p className="text-2xl font-semibold text-emerald-700">
            Rs. {doctor.consultationFee}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 px-7 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(5,150,105,0.22)] transition hover:bg-emerald-700 hover:shadow-xl"
        >
          Book Appointment
        </button>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Patient Reviews" className="h-[520px]">
          {reviewList.length === 0 ? (
            <EmptyReviews />
          ) : (
            <div className="h-[calc(520px-4rem)] overflow-y-auto p-6">
              <div className="space-y-4">
                {reviewList.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-3xl bg-slate-50/80 p-4 ring-1 ring-slate-100 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#047857,_#14b8a6)] text-sm font-semibold text-white">
                        {review.patient.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-slate-950">
                            {review.patient.name}
                          </p>
                          <p className="text-xs font-medium text-slate-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <ReviewStars rating={review.rating} />
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </Panel>

        <Panel title="Similar Doctors" className="h-[520px]">
          <div className="h-[calc(520px-4rem)] overflow-y-auto p-6">
            <div className="space-y-4">
              {similarDoctors.map((similarDoctor) => (
                <article
                  key={similarDoctor._id}
                  className="rounded-3xl bg-white p-5 ring-1 ring-emerald-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-400 text-lg font-bold text-white shadow-md">
                      {similarDoctor.user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-slate-950">
                        {similarDoctor.user.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {similarDoctor.specialization}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                          {similarDoctor.experience} yrs exp
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 ${
                            similarDoctor.isAvailable
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {similarDoctor.isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="font-semibold text-emerald-700">
                      Rs. {similarDoctor.consultationFee}
                    </p>
                    <Link
                      to={similarDoctor.profilePath || `/doctors/${similarDoctor._id}`}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      View Profile
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

const Panel = ({ title, children, className = "" }) => (
  <section
    className={`overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] ${className}`}
  >
    {title ? (
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-6">
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
    ) : null}
    {children}
  </section>
);

const HeroFact = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
      {label}
    </p>
    <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-800">
      {value}
    </p>
  </div>
);

const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  </div>
);

const ReviewStars = ({ rating }) => (
  <div className="mt-2 flex text-amber-500">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-current" : "text-slate-200"
        }`}
      />
    ))}
  </div>
);

const EmptyReviews = () => (
  <div className="flex h-[calc(520px-4rem)] flex-col items-center justify-center p-8 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
      <UserRound className="h-6 w-6" />
    </span>
    <p className="mt-4 text-base font-semibold text-slate-950">No reviews yet.</p>
    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      Patient feedback will appear here after completed appointments.
    </p>
  </div>
);

export default DoctorDetailsContent;
