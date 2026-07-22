import PaymentCard from "./PaymentCard";
import Pagination from "./Pagination";
import { CreditCard } from "lucide-react";

const PaymentTable = ({
  payments,
  loading = false,
  page,
  limit,
  total,
  onPageChange,
  detailsBasePath = "/profile/payment",
  pendingAction = "appointment",
  displayPerson = "doctor",
  subtitleText,
}) => {
  return (
    <section className="flex h-[560px] flex-col overflow-hidden rounded-[20px] border border-emerald-100/70 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Payment history</h2>
          <p className="text-sm text-slate-500">
            Appointment transactions and checkout status.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {loading ? "Loading..." : `${total} records`}
        </span>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-5 pr-1">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingPaymentCard key={index} />
            ))}
          </div>
        ) : payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => (
              <PaymentCard
                key={payment.id || `${payment.appointmentId}-${payment.amount}-${payment.status}`}
                payment={payment}
                detailsBasePath={detailsBasePath}
                pendingAction={pendingAction}
                displayPerson={displayPerson}
                subtitleText={subtitleText}
              />
            ))}
          </div>
        ) : (
          <EmptyPayments />
        )}
      </div>

      {!loading && total > 0 ? (
        <Pagination page={page} limit={limit} total={total} onPageChange={onPageChange} />
      ) : null}
    </section>
  );
};

const LoadingPaymentCard = () => (
  <div className="space-y-4 rounded-[22px] border border-slate-100 bg-slate-50 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] animate-pulse">
    <div className="h-5 w-3/4 rounded-full bg-slate-200" />
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-3 flex-1">
        <div className="h-4 w-full rounded-full bg-slate-200" />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
        </div>
      </div>
      <div className="space-y-3 sm:text-right">
        <div className="h-10 w-24 rounded-full bg-slate-200" />
        <div className="h-11 w-32 rounded-2xl bg-slate-200" />
      </div>
    </div>
  </div>
);

const EmptyPayments = () => (
  <div className="flex min-h-60 flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
      <CreditCard className="h-6 w-6" />
    </span>
    <h3 className="mt-4 text-base font-semibold text-slate-950">No payments found</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
      Filtered payments will appear here once your appointment checkout is created.
    </p>
  </div>
);

export default PaymentTable;
