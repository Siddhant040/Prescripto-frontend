import { useState } from "react";
import { CreditCard, Loader2, ReceiptText, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import {
  createPaymentOrder,
  getMyPayments,
  verifyPayment
} from "../../services/paymentServices";

const PaymentTest = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [verifyData, setVerifyData] = useState(null);
  const [payments, setPayments] = useState([]);

  const handleCreateOrder = async (event) => {
    event.preventDefault();

    if (!appointmentId.trim()) {
      toast.error("Appointment ID is required");
      return;
    }

    try {
      setIsCreating(true);
      setVerifyData(null);

      const response = await createPaymentOrder({
        appointmentId: appointmentId.trim(),
        provider: "razorpay",
        currency: "INR"
      });

      setOrderData(response.data);
      toast.success(response.message || "Payment order ready");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not create payment order"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenCheckout = () => {
    const providerOrder = orderData?.providerOrder;

    if (!providerOrder) {
      toast.error("Create a payment order first");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay checkout script is not loaded");
      return;
    }

    const options = {
      key: providerOrder.keyId,
      amount: providerOrder.amount,
      currency: providerOrder.currency,
      name: "Prescripto",
      description: "Doctor appointment payment",
      order_id: providerOrder.id,
      handler: async (razorpayResponse) => {
        try {
          const response = await verifyPayment({
            providerOrderId: razorpayResponse.razorpay_order_id,
            providerPaymentId: razorpayResponse.razorpay_payment_id,
            providerSignature: razorpayResponse.razorpay_signature
          });

          setVerifyData(response.data);
          toast.success(response.message || "Payment verified");
          await handleLoadPayments();
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment verification failed"
          );
        }
      },
      modal: {
        ondismiss: () => {
          toast("Payment window closed");
        }
      },
      theme: {
        color: "#0f766e"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleLoadPayments = async () => {
    try {
      setIsLoadingPayments(true);
      const response = await getMyPayments();
      setPayments(response.data?.payments || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load payments");
    } finally {
      setIsLoadingPayments(false);
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,_#f4fbf8_0%,_#f8fafc_42%,_#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Razorpay Test
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Appointment payment checkout
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Log in as the patient who owns the appointment, create an order, and
            open Razorpay Checkout from the returned backend order.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Create payment order
                </h2>
                <p className="text-sm text-slate-500">
                  Uses `/payment/create-order`
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Appointment ID
                </label>
                <input
                  value={appointmentId}
                  onChange={(event) => setAppointmentId(event.target.value)}
                  placeholder="Paste appointment _id"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isCreating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ReceiptText className="h-4 w-4" />
                  )}
                  Create Order
                </button>

                <button
                  type="button"
                  onClick={handleOpenCheckout}
                  disabled={!orderData?.providerOrder}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Open Checkout
                </button>
              </div>
            </form>

            {orderData ? (
              <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <pre className="overflow-auto">
                  {JSON.stringify(orderData, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Payment status
                </h2>
                <p className="text-sm text-slate-500">
                  Verify response and recent payments
                </p>
              </div>

              <button
                type="button"
                onClick={handleLoadPayments}
                disabled={isLoadingPayments}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoadingPayments ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ReceiptText className="h-4 w-4" />
                )}
                Load
              </button>
            </div>

            {verifyData ? (
              <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="mb-2 text-sm font-semibold text-emerald-950">
                  Verified payment
                </p>
                <pre className="overflow-auto text-xs leading-6 text-emerald-950">
                  {JSON.stringify(verifyData, null, 2)}
                </pre>
              </div>
            ) : null}

            <div className="space-y-3">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-950">
                        {payment.currency} {payment.amount}
                      </p>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                        {payment.status}
                      </span>
                    </div>
                    <p className="mt-2 break-all text-xs text-slate-500">
                      {payment.providerOrderId}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                  No payments loaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentTest;
