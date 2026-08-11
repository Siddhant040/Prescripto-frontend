import { loadRazorpay } from "./loadRazorpay";

export const openRazorpayCheckout = async (options) => {
  await loadRazorpay();

  return new Promise((resolve, reject) => {
    let settled = false;
    let checkout;

    const cleanup = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    const resolveOnce = (value) => {
      if (settled) return;

      settled = true;
      cleanup();
      resolve(value);
    };

    const rejectOnce = (error) => {
      if (settled) return;

      settled = true;
      cleanup();
      reject(error);
    };

    const razorpayOptions = {
      ...options,

      handler: (response) => {
        resolveOnce({
          providerOrderId: response.razorpay_order_id,
          providerPaymentId: response.razorpay_payment_id,
          providerSignature: response.razorpay_signature,
        });
      },

      modal: {
        ondismiss: () => {
          rejectOnce(new Error("Payment cancelled by user"));
        },
      },
    };

    checkout = new window.Razorpay(razorpayOptions);

    checkout.on("payment.failed", (response) => {
      const message =
        response?.error?.description || "Payment failed";

      // Explicitly close Razorpay after failed payment
      checkout.close();

      rejectOnce(new Error(message));
    });

    checkout.open();
  });
};