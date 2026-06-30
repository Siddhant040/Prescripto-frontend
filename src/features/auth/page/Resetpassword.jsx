import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockKeyhole } from "lucide-react";
import { useAuth } from "../hooks/checkAuth";
import { resetPasswordSchema } from "../schema/authSchema"
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { handleResetPassword, isResettingPassword } = useAuth();
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })
    const { token } = useParams();
    const onSubmit = async (data) => {
        try {
            const response = await handleResetPassword(token, data.password);
            console.log(response);
            toast.success(response.message || "Password reset successfully");
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);;

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Unable to reset password"
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#e2e8f0_45%,_#cbd5e1_100%)] px-4 py-10">
            <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">

                {/* Header */}
                <div className="border-b border-slate-200/70 px-8 pb-6 pt-8">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
                        <LockKeyhole className="h-7 w-7" />
                    </div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Account Security
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Create a new secure password for your Prescripto account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-8 py-8">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                            {...register("password")}
                        />

                        <p className="mt-1 min-h-5 text-sm text-rose-500">
                            {/* error */}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                            {...register("confirmPassword")}
                        />

                        <p className="mt-1 min-h-5 text-sm text-rose-500">
                            {touchedFields.confirmPassword
                                ? errors.confirmPassword?.message || ""
                                : ""}

                            {/* error */}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isResettingPassword}
                        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isResettingPassword ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resetting Password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}