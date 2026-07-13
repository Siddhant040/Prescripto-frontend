import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../../auth/schema/authSchema";

const EditPersonalInformation = ({
  user,
  updateUserProfile,
  updating,
  onCancel,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
  });

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
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <section className="flex h-full flex-col rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Account details
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
              Personal information
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <input type="hidden" {...register("name")} />

        <div className="mt-4 grid gap-3.5 md:grid-cols-2">
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
        </div>
      </form>
    </section>
  );
};

export default EditPersonalInformation;
