import { Loader2 } from "lucide-react";

const AppointmentActions = ({
  onReschedule,
  onCancel,
  appointment,
  isCancelling,
  isRescheduling = false,
  onPayNow,
  isPaid  ,
  isCreating = false,
}) => {

  console.log({
  status: appointment.status,
  paymentStatus: appointment.paymentStatus,
  isPaid,
});
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      {appointment.status === "confirmed" && !isPaid && (
  <button
    type="button"
    onClick={onPayNow}
    disabled={isCreating}
    className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
  >
    {isCreating ? "Processing..." : "Pay Now"}
  </button>
)}
{appointment.status === "confirmed" && isPaid && (
  <span className="inline-flex h-11 items-center justify-center rounded-full bg-green-100 px-6 text-sm font-semibold text-green-700">
    Payment Completed
  </span>
)}


      <button
        type="button"
        disabled={isCancelling}
        onClick={() => onCancel(appointment.id)}
        className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
      > {isCancelling ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Cancelling...
          </>
        ) : (
          "Cancel"
        )}
      </button>
      <button
        type="button"
        disabled={isRescheduling}
        onClick={() => onReschedule(appointment.id)}
        className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        {isRescheduling ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Rescheduling...
          </>
        ) : (
          "Reschedule"
        )}
      </button>
    </div>
  );
};

export default AppointmentActions;
