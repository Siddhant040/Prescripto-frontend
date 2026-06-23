import { useEffect, useState } from "react";
import {
  LogOut,
  Mail,
  Menu,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import PatientNavSidebar from "../components/patient/PatientNavSidebar";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Doctors", to: "/doctors" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const MainLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDashboardRoute =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/doctor-dashboard");

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f4fbf8_0%,_#f8fafc_38%,_#ffffff_100%)] text-slate-950">
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
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {isDashboardRoute ? (
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => setIsSidebarOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 transition hover:bg-emerald-100"
                aria-label="Patient profile"
              >
                <UserRound className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {isDashboardRoute ? (
        <>
          <div
            className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition ${
              isSidebarOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <div
            className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform border-l border-emerald-100 bg-white/95 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.2)] backdrop-blur-xl transition duration-300 sm:max-w-md ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                  Dashboard Menu
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  Account access
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <PatientNavSidebar currentPath={location.pathname} />
          </div>
        </>
      ) : null}

      <footer className="border-t border-emerald-100 bg-slate-950 text-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div className="max-w-md">
            <p className="text-lg font-semibold tracking-tight text-white">
              Prescripto
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              A calm, connected space to discover trusted doctors, understand
              your care options, and reach out with confidence.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Explore
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <Link to="/" className="block transition hover:text-white">
                Home
              </Link>
              <Link to="/doctors" className="block transition hover:text-white">
                Doctors
              </Link>
              <Link to="/about" className="block transition hover:text-white">
                About
              </Link>
              <Link to="/contact" className="block transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Reach Us
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <Link to="/login" className="block transition hover:text-white">
                Login
              </Link>
              <Link to="/register" className="block transition hover:text-white">
                Register
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Contact Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
