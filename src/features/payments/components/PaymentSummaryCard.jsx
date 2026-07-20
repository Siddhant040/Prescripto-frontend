import { CreditCard, ShieldCheck } from "lucide-react";

const PaymentSummaryCard = ({ totalPaid, transactionCount, pendingAmount }) => {
  return (
    <section className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="relative p-5 sm:p-6">
        <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-full bg-emerald-50" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.24)]">
              <CreditCard className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Patient Payments
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                My payments
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Track appointment payments, retry pending dues, and review
                successful transactions from one place.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            <SummaryMetric label="Paid" value={`Rs. ${totalPaid}`} />
            <SummaryMetric label="Pending" value={`Rs. ${pendingAmount}`} />
            <SummaryMetric label="Transactions" value={transactionCount} />
          </div>
        </div>

        <div className="relative mt-5 flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="h-4 w-4" />
          Razorpay-ready secure checkout
        </div>
      </div>
    </section>
  );
};

const SummaryMetric = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
  </div>
);

export default PaymentSummaryCard;
