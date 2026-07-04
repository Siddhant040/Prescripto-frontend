import { Headset } from "lucide-react";

const SidebarSupportCard = () => {
  return (
    <div className="rounded-[20px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-4 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Headset className="h-5 w-5" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">Need Help?</h3>

      <p className="mt-2 text-sm leading-5 text-slate-600">
        Need assistance with appointments or account access? Our support team is
        here to help.
      </p>

      <button className="mt-4 w-full rounded-xl border border-emerald-600 px-4 py-2.5 text-sm font-medium text-emerald-700 transition duration-200 hover:bg-emerald-600 hover:text-white">
        Contact Support
      </button>
    </div>
  );
};

export default SidebarSupportCard;
