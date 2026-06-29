
import {
    LogOut,
    Mail,
    Menu,
    Stethoscope,
    UserRound,
    X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../../shared/constants/navigation";
import { useAuth } from "../../../features/auth/hooks/checkAuth";





const Header = () => {
    const { handleLogout, isLoggingOut } = useAuth();
    const onSubmit = async () => {
        try {
            await handleLogout();
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");   
            console.log(error);
        }
    }





    return (
        <>
            <header className="sticky top-0 z-30 border-b border-emerald-100/80 bg-white/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-white shadow-[0_12px_30px_rgba(15,118,110,0.28)]">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold tracking-tight">Prescripto</p>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                                Care Platform
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 md:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `rounded-full px-4 py-2 text-sm font-medium transition ${isActive
                                        ? "bg-emerald-50 text-emerald-900"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="hidden items-center gap-3 md:flex">
                       <button
    type="button"
    onClick={onSubmit}
    disabled={isLoggingOut}
    className="
        rounded-full
        border
        border-emerald-200
        bg-white/70
        backdrop-blur
        px-5
        py-2.5
        text-sm
        font-medium
        text-slate-700
        hover:border-emerald-300
        hover:bg-emerald-50
        disabled:opacity-60
    "
>
    {isLoggingOut ? "Logging out..." : "Logout"}
</button>

                        <Link
                            to="/register"
                            className="
rounded-full
bg-gradient-to-r
from-emerald-600
to-teal-500
px-6
py-2.5
text-sm
font-semibold
text-white
shadow-lg
shadow-emerald-500/25
transition
hover:-translate-y-0.5
"
                        >
                            Get Started
                        </Link>
                    </div>




                </div>
            </header>
        </>
    )
}
export default Header