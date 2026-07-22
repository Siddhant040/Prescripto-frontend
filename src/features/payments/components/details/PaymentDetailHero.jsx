import { CreditCard, IndianRupee, ReceiptText, Stethoscope, UserRound } from "lucide-react";
import {
  formatCurrency,
  formatDateTime,
  getInitials,
} from "./paymentDetailFallback";

const statusClasses = {
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  failed: "bg-rose-50 text-rose-700 ring-rose-200",
  refunded: "bg-slate-100 text-slate-700 ring-slate-200",
};

const dotClasses = {
  paid: "bg-emerald-500",
  pending: "bg-amber-500",
  failed: "bg-rose-500",
  refunded: "bg-slate-500",
};

const PaymentDetailHero = ({ payment, focus = "doctor" }) => {
  const status = String(payment.status || "pending").toLowerCase();
  const person = focus === "patient" ? payment.patient || {} : payment.doctor || {};
  const personLabel = focus === "patient" ? "Patient payment" : "Doctor payment";
  const PersonIcon = focus === "patient" ? UserRound : Stethoscope;

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#0f766e,_#34d399)] text-lg font-semibold text-white">
              {getInitials(person.name)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-950">
                {person.name || personLabel}
              </h2>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                  statusClasses[status] || statusClasses.pending
                }`}
              >
                {status}
              </span>
            </div>

            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <PersonIcon className="h-4 w-4" />
              {focus === "patient"
                ? payment.patient?.email || "Patient"
                : payment.doctor?.specialization || "Specialist"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Appointment: {formatDateTime(payment.appointment?.date)}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[460px]">
          <HeroMetric
            icon={IndianRupee}
            label="Amount"
            value={formatCurrency(payment.amount, payment.currency)}
          />
          <HeroMetric
            icon={CreditCard}
            label="Provider"
            value={payment.provider || "Razorpay"}
          />
          <HeroMetric icon={ReceiptText} label="Receipt" value={payment.id} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-600">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClasses[status] || dotClasses.pending}`} />
        {status === "paid"
          ? `Paid on ${formatDateTime(payment.paidAt)}`
          : status === "failed"
            ? payment.failureReason || "Payment failed"
            : status === "refunded"
              ? payment.refundReason || "Payment refunded"
              : "Payment is waiting for completion"}
      </div>
    </section>
  );
};

const HeroMetric = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
      <Icon className="h-4 w-4" />
    </span>
    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      {label}
    </p>
    <p className="mt-1 truncate text-[15px] font-semibold text-slate-950">
      {value || "Not available"}
    </p>
  </div>
);

export default PaymentDetailHero;
