import { CalendarDays, ChevronRight, Clock3, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({
  profile,
  upcomingAppointment,
  activity,
  note,
}) => {
  const NoteIcon = note.icon;

  const navigate = useNavigate();
  const upcomingAvatarFallback = upcomingAppointment?.avatarFallback || "AM";

  return (
    <div className="space-y-5">
      <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Profile completion
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              Keep your account booking-ready
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">
            {profile.profileCompletion}%
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,_#10b981,_#14b8a6)]"
              style={{ width: `${profile.profileCompletion}%` }}
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Ready
          </span>
        </div>

        <div className="mt-4 grid gap-3 rounded-2xl bg-emerald-50/60 p-4 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Phone</span>
            <span className="font-medium text-slate-900">{profile.phone}</span>
          </div>
          <div className="h-px bg-emerald-100" />
          <div className="flex items-center justify-between">
            <span>City</span>
            <span className="font-medium text-slate-900">{profile.city}</span>
          </div>
          <div className="h-px bg-emerald-100" />
          <div className="flex items-center justify-between">
            <span>Gender</span>
            <span className="font-medium text-slate-900">{profile.gender}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              profile.profileCompletion === 100
                ? "/profile/me"
                : "/profile/edit"
            )
          }
          className={`mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${profile.profileCompletion === 100
            ? "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            : "border-emerald-200 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50"
            }`}
        >
          {profile.profileCompletion === 100
            ? "View Profile"
            : "Complete Profile"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </section>

      <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Next appointment
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              {upcomingAppointment?.doctorName || "No upcoming appointment"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {upcomingAppointment?.specialization || "Book a visit to see it here"}
            </p>
          </div>
          {upcomingAppointment?.avatar ? (
            <img
              src={upcomingAppointment.avatar}
              alt={upcomingAppointment.doctorName}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
              {upcomingAvatarFallback}
            </div>
          )}
        </div>

        {upcomingAppointment ? (
          <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-emerald-700" />
              <span>{upcomingAppointment.dateLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-emerald-700" />
              <span>{upcomingAppointment.timeLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-700" />
              <span>{upcomingAppointment.hospital}</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Your next confirmed or pending appointment will appear here.
          </div>
        )}
      </section>

      <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Recent activity
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              Latest account events
            </h2>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {activity.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              No recent appointment activity yet.
            </div>
          ) : activity.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.id} className="flex gap-4">
                <span
                  className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${item.accent}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <span className="text-xs text-slate-400">{item.timeLabel}</span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-[20px] border border-emerald-100/70 bg-[linear-gradient(180deg,_#ecfdf5_0%,_#ffffff_100%)] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <NoteIcon className="h-5 w-5" />
        </span>
        <h2 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
          {note.title}
        </h2>
        <p className="mt-2 text-sm leading-5 text-slate-600">{note.description}</p>
        <button
          type="button"
          onClick={() => navigate("/profile/doctors")}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Explore doctors
        </button>
      </section>
    </div>
  );
};

export default DashboardSidebar;
