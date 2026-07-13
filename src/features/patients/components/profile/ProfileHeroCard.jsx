import { useRef } from "react";
import { toast } from "react-hot-toast";
import {
  BadgeCheck,
  Camera,
  ShieldCheck,
  UserRound,
  Star,
  MessageSquare,
} from "lucide-react";
import { formatStatus, getInitials, getProfileFromUser } from "./profileUtils";

const ProfileHeroCard = ({
  user,
  doctor = null,
  uploadAvatar,
  uploadingAvatar,
  label = "Patient profile",
  roleIcon: RoleIcon = UserRound,
  displayNamePrefix = "",
}) => {
  const fileInputRef = useRef(null);
  const profile = getProfileFromUser(user);
  const initials = getInitials(profile.name);
  const completionFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.gender,
    profile.dateOfBirth,
    profile.address,

    doctor?.specialization,
    doctor?.experience,
    doctor?.consultationFee,
    doctor?.qualifications?.length,
    doctor?.clinicAddress,
    doctor?.bio,
  ];
  const completion = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  );

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const response = await uploadAvatar(file);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Avatar upload failed");
    }
  };

  return (
    <section className=" flex h-full flex-col rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-16 w-16 shrink-0">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-xl font-semibold text-white">
              {initials}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <button
            type="button"
            disabled={uploadingAvatar}
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-[0_10px_22px_rgba(15,118,110,0.28)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploadingAvatar ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {label}
          </p>
          <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-slate-950">
            {displayNamePrefix}
            {profile.name}
          </h1>
          <p className="mt-1 truncate text-[15px] text-slate-500">
            {profile.email}
          </p>

          <div className="mt-4 flex flex-wrap gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-700">
              <RoleIcon className="h-3.5 w-3.5" />
              {profile.role}
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${profile.isEmailVerified
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
                }`}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              {profile.isEmailVerified ? "Email verified" : "Email pending"}
            </span>
            {doctor ? (
              <>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${doctor.isAvailable
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {doctor.isAvailable ? "Available" : "Unavailable"}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {doctor.rating?.toFixed(1) ?? "0.0"}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {doctor.totalReviews ?? 0} Reviews
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                {formatStatus(profile.isActive)}
              </span>
            )}

          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">

      </div>
      {/* <div className="mt-10 border-t border-slate-200 pt-8"> */}


      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Profile completion
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Based on fields available in your account model.
            </p>
          </div>
          <p className="text-xl font-semibold text-emerald-700">
            {completion}%
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,_#10b981,_#14b8a6)]"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ProfileHeroCard;
