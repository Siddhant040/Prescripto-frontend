import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppointmentMeta = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <span>{label}</span>
  </div>
);

const UpcomingAppointmentCard = ({ appointment }) => {
  console.log(appointment);
  const navigate = useNavigate();
  if (!appointment) {
    return (
      <section className="rounded-[20px] border border-dashed border-emerald-100/70 bg-white p-5 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Upcoming appointment
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          No upcoming appointment
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Book a consultation with a verified doctor to see it here.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Upcoming appointment
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {appointment.doctorName}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{appointment.specialization}</p>
        </div>
       {appointment.avatar ? (
            <img
              src={appointment.avatar}
              alt={appointment.doctorName}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
              {appointment.avatarFallback}
            </div>
          )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <AppointmentMeta icon={CalendarDays} label={appointment.dateLabel} />
        <AppointmentMeta icon={Clock3} label={appointment.timeLabel} />
        <AppointmentMeta icon={MapPin} label={appointment.hospital} />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={()=>navigate(`/profile/appointments/${appointment.id}`)}
          className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          View Details
        </button>
       
      </div>
    </section>
  );
};

export default UpcomingAppointmentCard;
