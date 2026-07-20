import {
  CalendarDays,
  CreditCard,
  FileText,
  IndianRupee,
  RotateCcw,
} from "lucide-react";

const statusStyles = {
  Paid: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-100 bg-amber-50 text-amber-700",
  Failed: "border-rose-100 bg-rose-50 text-rose-700",
  paid: "border-emerald-100 bg-emerald-50 text-emerald-700",
  pending: "border-amber-100 bg-amber-50 text-amber-700",
  failed: "border-rose-100 bg-rose-50 text-rose-700",
};

const actionText = {
  Paid: "View Receipt",
  Pending: "Pay Now",
  Failed: "Retry Payment",
  paid: "View Receipt",
  pending: "Pay Now",
  failed: "Retry Payment",
};

const PaymentTable = ({ payments }) => {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Payment history
          </h2>
          <p className="text-sm text-slate-500">
            Appointment transactions and checkout status.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {payments.length} records
        </span>
      </div>

      <div className="max-h-[520px] overflow-y-auto p-4">
        {payments.length > 0 ? (
          <div className="space-y-3">
            {payments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </div>
        ) : (
          <EmptyPayments />
        )}
      </div>
    </section>
  );
};

const PaymentRow = ({ payment }) => {
  const status = payment.status || "Pending";
  const doctorName =
    typeof payment.doctor === "string"
      ? payment.doctor
      : payment.doctor?.name || "Doctor";
  const specialization =
    payment.speciality || payment.doctor?.specialization || "Consultation";
  const appointmentDate =
    payment.appointmentDate || payment.appointment?.date || "Date";
  const paymentMethod = payment.method || payment.provider || "Razorpay";

  return (
    <article className="rounded-[22px] border border-slate-100 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
            <CreditCard className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-950">
                {doctorName}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                  statusStyles[status] || "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {specialization}
            </p>

            <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem icon={FileText} value={payment.id || "Payment ID"} />
              <InfoItem
                icon={CalendarDays}
                value={`${appointmentDate} ${payment.appointmentTime || ""}`}
              />
              <InfoItem icon={CreditCard} value={paymentMethod} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:justify-end">
          <div className="rounded-2xl bg-white px-4 py-3 text-left shadow-sm sm:text-right">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Amount
            </p>
            <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-slate-950 sm:justify-end">
              <IndianRupee className="h-4 w-4" />
              {payment.amount || 0}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            {status === "Failed" || status === "failed" ? (
              <RotateCcw className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {actionText[status] || "View"}
          </button>
        </div>
      </div>
    </article>
  );
};

const InfoItem = ({ icon: Icon, value }) => (
  <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white px-3 py-1.5">
    <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
    <span className="truncate">{value}</span>
  </span>
);

const EmptyPayments = () => (
  <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
      <CreditCard className="h-6 w-6" />
    </span>
    <h3 className="mt-4 text-base font-semibold text-slate-950">
      No payments found
    </h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      Payments matching your filters will appear here after you connect your API
      data.
    </p>
  </div>
);

export default PaymentTable;
