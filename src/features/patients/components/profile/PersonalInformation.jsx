import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react";
import InfoRow from "./InfoRow";
import { formatDate, getProfileFromUser } from "./profileUtils";

const PersonalInformation = ({ user, onEdit }) => {
  const profile = getProfileFromUser(user);

  return (
    <section className="flex h-full flex-col rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="mt-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Account details
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
              Personal information
            </h2>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-4 grid gap-3.5 md:grid-cols-2">
          <InfoRow icon={Mail} label="Email" value={profile.email} />
          <InfoRow icon={Phone} label="Phone" value={profile.phone} />
          <InfoRow icon={UserRound} label="Gender" value={profile.gender} />
          <InfoRow
            icon={CalendarDays}
            label="Date of birth"
            value={formatDate(profile.dateOfBirth)}
          />
          <div className="md:col-span-2">
            <InfoRow icon={MapPin} label="Address" value={profile.address} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
