import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const workspaceLinks = [
  { label: "Dashboard", to: "/profile" },
  { label: "Appointments", to: "/profile/appointments" },
  { label: "Doctors", to: "/doctors" },
  { label: "Settings", to: "/profile" },
];

const supportLinks = [
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
  { label: "Login", to: "/login" },
];

const PatientFooter = () => {
  return (
    <footer className="overflow-hidden rounded-[2rem] border border-emerald-950/40 bg-slate-950 text-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
      <div className="grid gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="max-w-md">
          <p className="text-lg font-semibold tracking-tight text-white">
            Prescripto
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            A calm patient workspace to manage appointments, discover trusted
            doctors, and keep your account ready for every visit.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Workspace
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            {workspaceLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Reach Us
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            {supportLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
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

      <div className="border-t border-slate-800 px-5 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        2026 Prescripto. Patient dashboard experience.
      </div>
    </footer>
  );
};

export default PatientFooter;
