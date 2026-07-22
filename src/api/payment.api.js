import api from "./axios";

export const createPaymentOrder = async (paymentData) => {
  const response = await api.post("/payment/create-order", paymentData);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payment/verify", paymentData);
  return response.data;
};

export const getMyPayments = async({
  page = 1,
  limit = 10,
  

}={})=>{
  

  const response = await api.get("/payment/me",{
        params:{
            page,
            limit,
        }
    });
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await api.get(`/payment/${id}`);
  return response.data;
};

export const downloadReceipt = async (paymentId) => {
  const response = await api.get(
    `/payment/${paymentId}/receipt`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};