import {
  ArrowRight,
  Clock3,
  HeartPulse,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../../../shared/assets/hero.png";

const HeroSection = ({ metrics }) => {
  return (
    <section className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.16),_transparent_34%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Patient care, designed to feel lighter
          </div>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-slate-950 sm:text-6xl">
            Find trusted doctors and book care without the usual friction.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Prescripto brings discovery, scheduling, and patient access into one
            calm experience so healthcare feels more organized from the very
            first click.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/doctors"
             className="
inline-flex items-center justify-center
rounded-full
bg-gradient-to-r from-emerald-600 to-teal-500
px-6 py-3.5
text-sm font-semibold text-white
border border-emerald-500/30

transition-all duration-300
hover:from-emerald-700
hover:to-teal-600

hover:-translate-y-0.5
"
            >
              Explore Doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/90 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-950 hover:bg-white"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/80 bg-white/70 px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur"
              >
                <p className="text-3xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-6 h-20 w-20 rounded-full bg-emerald-200/50 blur-2xl" />
          <div className="absolute bottom-10 right-8 h-24 w-24 rounded-full bg-teal-300/40 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,_#0f172a_0%,_#134e4a_58%,_#34d399_100%)] p-8 text-white shadow-[0_35px_80px_rgba(15,23,42,0.22)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-100/80">
                  Smart Care Access
                </p>
                <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-tight">
                  One place for doctor discovery, platform trust, and easier
                  support access.
                </h2>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
                <HeartPulse className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_rgba(255,255,255,0.03))] p-8">
              <img
                src={heroImage}
                alt="Abstract healthcare platform illustration"
                className="mx-auto w-full max-w-xs drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-2">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Clear doctor discovery</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-emerald-50/85">
                  Doctor browsing is designed to feel clear instead of
                  overwhelming.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-2">
                    <UsersRound className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Built for patient trust</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-emerald-50/85">
                  A friendlier front door for care journeys that usually start
                  with uncertainty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
