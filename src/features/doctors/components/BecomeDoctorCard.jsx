import { ChevronRight, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeDoctorCard = ({ onClick }) => {
  const Component = onClick ? "button" : Link;
  const props = onClick
    ? { type: "button", onClick }
    : { to: "/profile/create-doctor-profile" };

  return (
    <Component
      {...props}
      className="group flex w-full items-center justify-between rounded-2xl border border-emerald-100 bg-[linear-gradient(135deg,_#ecfdf5,_#f8fafc)] px-4 py-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-white shadow-[0_10px_20px_rgba(15,118,110,0.16)]">
          <Stethoscope className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Become a Doctor
          </p>
          <p className="text-xs text-slate-500">
            Create doctor profile
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
    </Component>
  );
};

export default BecomeDoctorCard;
