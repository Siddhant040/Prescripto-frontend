import { ArrowRightLeft, ChevronRight } from "lucide-react";

const SwitchProfileCard = ({
  switchTo = "Patient",
  onSwitch,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onSwitch}
      disabled={isLoading}
      className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
          <ArrowRightLeft className="h-5 w-5 text-emerald-700" />
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">
            Switch Profile
          </p>

          <p className="text-xs text-slate-500">
            {isLoading ? "Switching..." : `Switch to ${switchTo}`}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
    </button>
  );
};

export default SwitchProfileCard;