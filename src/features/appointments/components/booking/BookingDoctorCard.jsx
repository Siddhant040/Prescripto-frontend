import { IndianRupee, Stethoscope } from "lucide-react";
import { getInitials } from "../appointmentUiData";

const BookingDoctorCard = ({ doctor }) => {
  console.log("doctor", doctor);
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-4">
        {doctor.user.avatar ? (
          <img
            src={doctor.user.avatar}
            alt={doctor.user.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-lg font-semibold text-white">
            {getInitials(doctor.name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-950">
           {`Dr.${doctor.user.name}`}
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Stethoscope className="h-4 w-4" />
            {doctor.specialization}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <IndianRupee className="h-4 w-4 text-emerald-700" />
            Rs. {doctor.consultationFee} Consultation
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingDoctorCard;
