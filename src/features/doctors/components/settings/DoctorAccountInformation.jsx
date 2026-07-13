import {
  BadgeCheck,
  CalendarDays,
  Mail,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import SettingInfoRow from "./SettingInfoRow";

const formatDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const DoctorAccountInformation = ({ user, doctor }) => {
  const rows = [
    {
      label: "Email",
      value: user?.email || doctor?.user?.email,
      icon: Mail,
    },
    {
      label: "Role",
      value: user?.activeRole || "doctor",
      icon: UserRound,
      capitalize: true,
    },
    {
      label: "Doctor Verification",
      value: doctor?.isVerified ? "Verified Doctor" : "Pending Verification",
      icon: BadgeCheck,
    },
    {
      label: "Availability",
      value: doctor?.isAvailable ? "Available" : "Unavailable",
      icon: ShieldCheck,
    },
    {
      label: "Specialization",
      value: doctor?.specialization,
      icon: Stethoscope,
    },
    {
      label: "Member Since",
      value: formatDate(doctor?.createdAt || user?.createdAt),
      icon: CalendarDays,
    },
  ];

  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Account information
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
          Doctor access details
        </h2>
      </div>

      <div className="mt-4 grid gap-3.5">
        {rows.map((item) => (
          <SettingInfoRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            capitalize={item.capitalize}
          />
        ))}
      </div>
    </section>
  );
};

export default DoctorAccountInformation;
