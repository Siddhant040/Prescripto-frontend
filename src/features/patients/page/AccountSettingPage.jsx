import {
    BadgeCheck,
    CalendarDays,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UserRound,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/checkAuth";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../auth/schema/authSchema";


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

const accountRows = (user) => [
    {
        label: "Email",
        value: user?.email || "Not available",
        icon: Mail,
    },
    {
        label: "Role",
        value: user?.role || "patient",
        icon: UserRound,
        capitalize: true,
    },
    {
        label: "Account Status",
        value: user?.isActive === false ? "Inactive" : "Active",
        icon: ShieldCheck,
    },
    {
        label: "Email Verification",
        value: user?.isEmailVerified ? "Verified" : "Pending",
        icon: BadgeCheck,
    },
    {
        label: "Member Since",
        value: formatDate(user?.createdAt),
        icon: CalendarDays,
    },
];

const AccountInfoRow = ({ item }) => {
    const Icon = item.icon;

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {item.label}
                </p>
                <p
                    className={`mt-1 truncate text-[15px] font-medium text-slate-900 ${item.capitalize ? "capitalize" : ""
                        }`}
                >
                    {item.value}
                </p>
            </div>
        </div>
    );
};

const PasswordField = ({
    label,
    placeholder,
    register,
    name,
    error,
}) => (
    <label className="block">
        <span className="text-sm font-medium text-slate-700">
            {label}
        </span>

        <input
            type="password"
            placeholder={placeholder}
            {...register(name)}
            className={`mt-2 h-11 w-full rounded-2xl border px-4 text-sm outline-none ${error
                    ? "border-red-500"
                    : "border-slate-200"
                }`}
        />

        {error && (
            <p className="mt-1 text-sm text-red-500">
                {error.message}
            </p>
        )}
    </label>
);


const AccountSettingPage = () => {
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
    })

    
    const { user, handleChangePassword, updatingPassword } = useAuth();

    const onSubmit = async (data) => {
        try {
            const response = await handleChangePassword(data);
            toast.success(response.message || "Password changed successfully")
            reset()
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Unable to change password"
            );
        }
    }

    return (
        <div className="w-full px-1 pb-1">
            <div className="mb-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    Account settings
                </p>
                <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
                    Manage your account security and preferences.
                </h1>
            </div>

            <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <section className="rounded-[20px] border border-emerald-100/80 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                    <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                            Account information
                        </p>
                        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-slate-950">
                            Profile access details
                        </h2>
                    </div>

                    <div className="mt-4 grid gap-3.5">
                        {accountRows(user).map((item) => (
                            <AccountInfoRow key={item.label} item={item} />
                        ))}
                    </div>
                </section>

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

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-5 space-y-4">
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
                            {updatingPassword
                                ? "Changing..."
                                : "Change Password"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AccountSettingPage;
