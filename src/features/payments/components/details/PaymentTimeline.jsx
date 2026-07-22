import { CheckCircle2, Circle, XCircle } from "lucide-react";

import { formatDateTime } from "./paymentDetailFallback";

const getTimeline = (payment) => {
  const status = String(payment.status || "pending").toLowerCase();

  if (status === "failed") {
    return [
      { key: "created", label: "Payment order created", date: payment.createdAt },
      { key: "failed", label: "Payment failed", date: payment.failedAt, danger: true },
    ];
  }

  if (status === "refunded") {
    return [
      { key: "created", label: "Payment order created", date: payment.createdAt },
      { key: "paid", label: "Payment completed", date: payment.paidAt },
      { key: "refunded", label: "Payment refunded", date: payment.refundedAt },
    ];
  }

  return [
    { key: "created", label: "Payment order created", date: payment.createdAt },
    { key: "paid", label: "Payment completed", date: payment.paidAt },
  ];
};

const PaymentTimeline = ({ payment }) => {
  const status = String(payment.status || "pending").toLowerCase();
  const activeKeys =
    status === "paid"
      ? ["created", "paid"]
      : status === "failed"
        ? ["created", "failed"]
        : status === "refunded"
          ? ["created", "paid", "refunded"]
          : ["created"];
  const steps = getTimeline(payment);

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Payment timeline
      </p>

      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const isActive = activeKeys.includes(step.key);
          const Icon = step.danger ? XCircle : isActive ? CheckCircle2 : Circle;

          return (
            <div key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <Icon
                  className={`h-5 w-5 ${
                    step.danger
                      ? "text-rose-600"
                      : isActive
                        ? "text-emerald-600"
                        : "text-slate-300"
                  }`}
                />
                {index < steps.length - 1 && (
                  <span className="mt-2 h-8 w-px bg-slate-200" />
                )}
              </div>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-slate-950" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDateTime(step.date)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentTimeline;
