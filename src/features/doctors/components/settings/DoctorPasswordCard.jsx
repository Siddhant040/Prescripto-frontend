import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePasswordSchema } from "../../../auth/schema/authSchema";
import PasswordField from "./PasswordField";

const DoctorPasswordCard = ({ onChangePassword, updatingPassword }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await onChangePassword(data);

      toast.success(response?.message || "Password changed successfully");
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to change password"
      );
    }
  };

  return (
    <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <LockKeyhole className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Security
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
            Change password
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <PasswordField
          label="Current Password"
          placeholder="Enter current password"
          name="currentPassword"
          register={register}
          error={errors.currentPassword}
        />

        <PasswordField
          label="New Password"
          placeholder="Enter new password"
          name="newPassword"
          register={register}
          error={errors.newPassword}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm new password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={updatingPassword}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {updatingPassword ? "Changing..." : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default DoctorPasswordCard;
