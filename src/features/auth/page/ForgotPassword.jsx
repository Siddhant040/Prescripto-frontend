import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { forgotPasswordSchema } from "../schema/authSchema";
import { useAuth } from "../hooks/checkAuth";

export default function ForgotPassword() {
  const { handleForgotPassword,isForgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await handleForgotPassword(data.email);

      toast.success(
        response.message || "Password reset link sent successfully."
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to send password reset email."
      );
    }
  };

  const onInvalid = (formErrors) => {
    console.log(formErrors);
    toast.error("Please fix the highlighted fields before submitting");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#e2e8f0_45%,_#cbd5e1_100%)] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <div className="border-b border-slate-200/70 px-8 pb-6 pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Account Recovery
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Forgot Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter the email associated with your account and we'll send you a
            link to reset your password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-5 px-8 py-8"
          noValidate
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
            />

            <p className="mt-1 min-h-5 text-sm text-rose-500">
              {touchedFields.email ? errors.email?.message || "" : ""}
            </p>
          </div>

          <button
            type="submit"
            disabled={isForgotPassword  }
            className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isForgotPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}