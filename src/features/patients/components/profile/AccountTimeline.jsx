import { Clock3 } from "lucide-react";
import InfoRow from "./InfoRow";
import { formatDate, getProfileFromUser } from "./profileUtils";

const AccountTimeline = ({ user, createdLabel = "Created" }) => {
  const profile = getProfileFromUser(user);

  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] xl:col-span-2">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Account timeline
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
          System information
        </h2>
      </div>

      <div className="mt-4 grid gap-3.5 md:grid-cols-2">
        <InfoRow
          icon={Clock3}
          label={createdLabel}
          value={formatDate(profile.createdAt)}
        />
        <InfoRow
          icon={Clock3}
          label="Last updated"
          value={formatDate(profile.updatedAt)}
        />
      </div>
    </section>
  );
};

export default AccountTimeline;
