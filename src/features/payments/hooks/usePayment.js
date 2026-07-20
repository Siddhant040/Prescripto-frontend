import { createPaymentOrder, getMyPayments, verifyPayment, getPaymentById } from "../../../api/payment.api";
import { useState } from "react";
import toast from "react-hot-toast";

export const usePayment = () => {
    const [isCreating, setIsCreating] = useState(false);

    const [isVerifying, setIsVerifying] = useState(false);
    const[paymentloading, setPaymentLoading] = useState(false);
    const [payments, setPayments] = useState([]);

    const handleCreateOrder = async (paymentData) => {
        setIsCreating(true);
        try {
            const response = await createPaymentOrder(paymentData);
            ;


            return response.data;

        } catch (error) {
            toast.error(error.response?.message || "Could not create payment order");
        } finally {
            setIsCreating(false);
        }
    };
    const handleVerifyPayment = async (paymentData) => {
        setIsVerifying(true);
        try {
            const response = await verifyPayment(paymentData);
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Could not create payment order"
            );
            throw error;
        } finally {
            setIsVerifying(false);
        }
    };
    const handleGetPaymentById = async (id) => {
        setPaymentLoading(true);
        try {
            const response = await getPaymentById(id);
            setPayments(response.data)
            return response.data;
        } catch (error) {
           console.log(error);
            
        } finally {
            setPaymentLoading(false);
        }
    };


    return {
        handleVerifyPayment,
        isVerifying,
        isCreating,
        handleCreateOrder,
        handleGetPaymentById,
        paymentloading,
        payments

    };

}


