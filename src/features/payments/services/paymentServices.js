import api from "../../../api/axios";

export const createPaymentOrder = async (paymentData) => {
  const response = await api.post("/payment/create-order", paymentData);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payment/verify", paymentData);
  return response.data;
};

export const getMyPayments = async () => {
  const response = await api.get("/payment/me");
  return response.data;
};
