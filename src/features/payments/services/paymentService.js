import { openRazorpayCheckout } from "./razorpay.services";
import { toast } from "react-hot-toast";

export const handlePaynow = async ({
  appointment,
  user,
  handleCreateOrder,
  handleVerifyPayment,
  handleGetAppointmentbyId,
}) => {
  if (!appointment) {
    toast.error("No appointment available for payment.");
    return;
  }

  try {
    const order = await handleCreateOrder({
      appointmentId: appointment._id || appointment.id,
      provider: "razorpay",
      currency: "INR",
    });

    if (!order?.providerOrder) {
      throw new Error("Invalid payment order response");
    }

    const options = {
      key: order.providerOrder.keyId || order.key,
      amount: order.providerOrder.amount,
      currency: order.providerOrder.currency,
      order_id: order.providerOrder.id,
      name: "Prescripto",
      description: "Appointment Payment",
      prefill: {
        name: user?.fullName || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      theme: {
        color: "#2563eb",
      },
    };

  try {
  const paymentResponse = await openRazorpayCheckout(options);

  await handleVerifyPayment(paymentResponse);

  toast.success("Payment Successful");
} finally {
  if (handleGetAppointmentbyId) {
    await handleGetAppointmentbyId(appointment._id || appointment.id);
  }
}

   
  } catch (error) {
    toast.error(error.message || "Payment failed.");
    throw error;
  }
};