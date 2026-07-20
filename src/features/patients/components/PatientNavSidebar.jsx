import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/checkAuth";
import SidebarSupportCard from "../../../components/layouts/SidebarSupportCard";
import SwitchProfileCard from "../../../components/layouts/SwitchCard"
import BecomeDoctorCard from "../../doctors/components/BecomeDoctorCard";
import {
  Bell,
  CalendarRange,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Settings,
  Stethoscope,
  User,
  History,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: "Dashboard", to: "/profile", end: true, icon: LayoutGrid },
  { label: "Appointments", to: "/profile/appointments", icon: CalendarRange },
  { label: "Doctors", to: "/profile/doctors", icon: Stethoscope },
  {label:"Payments",to:"/profile/payment",icon:History},

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
  const { user, handleChangeActiveRole, isChangingActiveRole  } = useAuth();
  
  const navigate = useNavigate();
 
  
  const changeActiveRole = async () => {
    try {
      await handleChangeActiveRole("doctor");
      toast.success("profile changed successfully");
       navigate( "/doctor-dashboard" );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
 

  const profileName = user?.name ?? "Guest";

const profileEmail = user?.email ?? "";
  const avatarFallback = getInitials(profileName);
  const isOnlyPatient =
    user?.roles?.length === 1 && user.roles.includes("patient");

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
        {isOnlyPatient && <BecomeDoctorCard 
        onClick={() => navigate("/profile/create-doctor-profile")}/>}
{user?.roles?.includes("doctor") && (
       <SwitchProfileCard
           switchTo="Doctor"
           onSwitch={changeActiveRole}
            isLoading={isChangingActiveRole}
       />
     )}
      </div>
    </aside>
  );
};

export default PatientNavSidebar;
