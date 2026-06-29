import {
  BellRing,
  CalendarRange,
  CreditCard,
  HeartHandshake,
  FileHeart,
  LayoutGrid,
  MessageSquareText,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard Overview", icon: LayoutGrid, active: true },
  { label: "Appointments", icon: CalendarRange },
  { label: "Medical Reports", icon: FileHeart },
  { label: "Notifications", icon: BellRing },
  { label: "Messages", icon: MessageSquareText },
  { label: "Billing", icon: CreditCard },
  { label: "Settings", icon: Settings },
];

const dashboardLinks = [
  { label: "Patient Dashboard", to: "/profile", icon: LayoutGrid },
  { label: "Doctor Dashboard", to: "/doctor-dashboard", icon: HeartHandshake },
];

const PatientNavSidebar = ({ currentPath }) => {
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
        Patient Menu
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
        Basic options
      </h2>

      <div className="mt-6 space-y-2">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.to;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex w-full items-center gap-3 rounded-[1.25rem] px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  isActive
                    ? "bg-white text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </NavLink>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-[1.25rem] px-4 py-3 text-left text-sm font-medium transition ${
                item.active
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  item.active
                    ? "bg-white text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-800">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Doctor Status
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              Eligible to apply
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Switch into a doctor workspace UI and prepare your professional
              dashboard setup later.
            </p>
          </div>
        </div>

        <Link
          to="/doctor-dashboard"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Become a Doctor
        </Link>
      </div>
    </aside>
  );
};

export default PatientNavSidebar;
