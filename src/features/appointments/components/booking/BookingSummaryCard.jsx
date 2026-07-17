import { IndianRupee, Loader2 } from "lucide-react";

const BookingSummaryCard = ({ fee, loading,disabled, onConfirm }) => {
  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Consultation Fee
          </p>
          <p className="mt-1 flex items-center gap-1 text-3xl font-semibold text-emerald-700">
            <IndianRupee className="h-6 w-6" />
            {fee}
          </p>
        </div>
      </div>

       <button
      type="button"
      onClick={onConfirm}
      disabled={disabled}
      className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition ${
        disabled
          ? "cursor-not-allowed bg-emerald-400"
          : "bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Booking...
        </>
      ) : (
        "Confirm Appointment"
      )}
    </button>
    </section>
  );
};

export default BookingSummaryCard;
