import { ArrowRight, Headset } from "lucide-react";

const SidebarSupportCard = () => {
  return (
    <button className="group flex w-full items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-100">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Headset className="h-5 w-5" />
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">
            Need Help?
          </p>

          <p className="text-xs text-slate-500">
            Contact support
          </p>
        </div>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
    </button>
  );
};

export default SidebarSupportCard;
