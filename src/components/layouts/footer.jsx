import { Link } from "react-router-dom";
import { navItems } from "../../shared/constants/navigation";
import { Mail } from "lucide-react";


const footer = () => {
    return(
        <>
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
        </>
    )
}

export default footer