import { Download, RefreshCw } from "lucide-react";
import { usePayment } from "../../hooks/usePayment";

const PaymentActions = ({ payment }) => {
  const status = String(payment.status || "pending").toLowerCase();

  const { downloadPaymentReceipt, isDownloading } = usePayment();

  return (
    <section className="rounded-[20px] border border-emerald-100/70 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Payment actions
          </p>
          <p className="mt-1.5 text-sm text-slate-500">
            Connect these buttons to receipt download or retry payment later.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => downloadPaymentReceipt(payment.id)}
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-emerald-200 px-5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </button>

         
        </div>
      </div>
    </section>
  );
};

export default PaymentActions;
