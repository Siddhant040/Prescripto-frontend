import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/checkAuth";
import SidebarSupportCard from "./SidebarSupportCard";
import {
  Bell,
  CalendarRange,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Settings,
  Stethoscope,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: "Dashboard", to: "/profile", end: true, icon: LayoutGrid },
  { label: "Appointments", to: "/profile/appointments", icon: CalendarRange },
  { label: "Doctors", to: "/doctors", icon: Stethoscope },

];

const getInitials = (name) => {
  if (!name) return "AM";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};


const PatientNavSidebar = () => {
  const { user, handleLogout, isLoggingOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  
  const onSubmit = async () => {
    try {
      await handleLogout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const profileName = user?.name ?? "Guest";

const profileEmail = user?.email ?? "";
  const avatarFallback = getInitials(profileName);

  return (
    <aside className="sticky top-3 flex max-h-[calc(100vh-1.5rem)] min-h-[calc(100vh-1.5rem)] flex-col rounded-[24px] border border-slate-200 bg-white px-4 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <Link to="/profile" className="flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-white shadow-[0_10px_22px_rgba(15,118,110,0.2)]">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight text-slate-950">
            Prescripto
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Patient Care
          </p>
        </div>
      </Link>

      <nav className="mt-7 shrink-0 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          if (!item.to) {
            return (
              <button
                key={item.label}
                type="button"
                className="group flex h-12 w-full items-center gap-3 rounded-2xl px-3 text-left text-[15px] font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-slate-950"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-white group-hover:text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group flex h-12 items-center gap-3 rounded-2xl px-3 text-[15px] font-medium transition ${isActive
                  ? "bg-[linear-gradient(135deg,_#0f766e,_#14b8a6)] text-white shadow-[0_12px_24px_rgba(15,118,110,0.2)]"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-slate-950"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${isActive
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-emerald-700"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto shrink-0 space-y-4">
        <SidebarSupportCard />

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-2.5 py-2 transition hover:border-emerald-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-sm font-semibold text-white">
              {avatarFallback}
            </div>
            <div className="hidden pr-1 text-left sm:block">
              <p className="text-sm font-semibold text-slate-950">{profileName}</p>
              <p className="text-xs text-slate-500">{profileEmail}</p>
            </div>
             <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""
                    }`}
                />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 bottom-[calc(100%+0.6rem)] z-40 w-52 rounded-[20px] border border-emerald-100 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile/me");
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                <User className="h-4 w-4" />
                My Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile/settings");
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </button>

              <div className="my-2 h-px bg-slate-100" />
              <button
                type="button"
                onClick={async () => {
                  setIsMenuOpen(false);
                  await onSubmit();
                }}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
};

export default PatientNavSidebar;
