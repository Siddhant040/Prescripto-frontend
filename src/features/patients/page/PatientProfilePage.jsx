import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/checkAuth";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import{updateProfileSchema} from "../schema/UpdateProfileSchema"

const getInitials = (name) => {
  if (!name) return "GU";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

const formatDate = (value) => {
  if (!value) return "Not added";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not added";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatStatus = (value) => {
  if (value === true) return "Active";
  if (value === false) return "Inactive";
  return "Unknown";
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-[15px] font-medium text-slate-900">
        {value || "Not added"}
      </p>
    </div>
  </div>
);

const PatientProfilePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",

  });
  const [isEditing, setIsEditing] = useState(false);
  const {
  updateUserProfile,
  updating,
  uploadAvatar,
  uploadingAvatar,
} = useUpdateProfile();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
      address: user.address || "",
    });
  }, [user, reset]);
  const onSubmit = async (data) => {
    try {
      const response = await updateUserProfile(data);

      toast.success(response.message);

      setIsEditing(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  const fileInputRef = useRef(null);

  
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const response = await uploadAvatar(file);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Avatar upload failed"
      );
    }
  };



  const profile = {
    name: user?.name || "Guest",
    email: user?.email || "Not added",
    role: user?.role || "patient",
    avatar: user?.avatar || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || null,
    address: user?.address || "",
    isEmailVerified: user?.isEmailVerified,
    isActive: user?.isActive,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
  const initials = getInitials(profile.name);
  const completionFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.gender,
    profile.dateOfBirth,
    profile.address,
  ];
  const completion = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  );

  return (


    <div className="w-full px-1 pb-1">
      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
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

              {/* Camera Button */}
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
                Patient profile
              </p>
              {isEditing ? (
                <input
                  type="text"
                  {...register("name")}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 text-xl font-semibold"
                />
              ) : (
                <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-slate-950">
                  {profile.name}
                </h1>
              )}
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
              <p className="mt-1 truncate text-[15px] text-slate-500">
                {profile.email}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-700">
                  <UserRound className="h-3.5 w-3.5" />
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
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {formatStatus(profile.isActive)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5">
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
        </section>

        <section className="flex h-full flex-col rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4"
          >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Account details
              </p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
                Personal information
              </h2>
            </div>
            
            {isEditing ? (
              <button
                type="submit"
                disabled={updating}
                className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Edit Profile
              </button>
            )}
          </div>
         

            <div className="mt-4 grid gap-3.5 md:grid-cols-2">
              <InfoRow icon={Mail} label="Email" value={profile.email} />

              {isEditing ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Phone
                  </label>

                  <input
                    type="text"
                    {...register("phone")}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              ) : (
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={profile.phone}
                />
              )}
              {isEditing ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Gender
                  </label>

                  <select
                    {...register("gender")}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              ) : (
                <InfoRow
                  icon={UserRound}
                  label="Gender"
                  value={profile.gender}
                />
              )}
              {isEditing ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  />

                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              ) : (
                <InfoRow
                  icon={CalendarDays}
                  label="Date of birth"
                  value={formatDate(profile.dateOfBirth)}
                />
              )}
              <div className="md:col-span-2">
                {isEditing ? (
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Address
                    </label>

                    <textarea
                      rows={3}
                      {...register("address")}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                    />

                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="md:col-span-2">
                    <InfoRow
                      icon={MapPin}
                      label="Address"
                      value={profile.address}
                    />
                  </div>
                )}
              </div>
            </div>
            </form>
        </section>

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
              label="Created"
              value={formatDate(profile.createdAt)}
            />
            <InfoRow
              icon={Clock3}
              label="Last updated"
              value={formatDate(profile.updatedAt)}
              />
          </div>
        </section>
      </div>
    </div >
  );
};

export default PatientProfilePage;
