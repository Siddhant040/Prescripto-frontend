import { createPaymentOrder, getMyPayments, verifyPayment, getPaymentById, downloadReceipt } from "../../../api/payment.api";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const usePayment = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoadingPayments, setIsLoadingPayments] = useState(false);
    const [payments, setPayments] = useState([]);
    const [paymentDetail, setPaymentDetail] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleLoadPayments = useCallback(async (page = 1, limit = 10) => {
        setIsLoadingPayments(true);
        try {
            const response = await getMyPayments({ page, limit });
            const loadedPayments = response.data?.payments || response.payments || [];
            setPayments(loadedPayments);
            return loadedPayments;
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not load payments");
            return [];
        } finally {
            setIsLoadingPayments(false);
        }
    }, []);

    const handleCreateOrder = useCallback(async (paymentData) => {
        setIsCreating(true);
        try {
            const response = await createPaymentOrder(paymentData);
            return response.data;
        } catch (error) {
            toast.error(error.response?.message || "Could not create payment order");
        } finally {
            setIsCreating(false);
        }
    }, []);

    const handleVerifyPayment = useCallback(async (paymentData) => {
        setIsVerifying(true);
        try {
            const response = await verifyPayment(paymentData);
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Could not verify payment"
            );
            throw error;
        } finally {
            setIsVerifying(false);
        }
    }, []);

    const handleGetPaymentById = useCallback(async (id) => {
        setPaymentLoading(true);
        try {
            const response = await getPaymentById(id);
            setPaymentDetail(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        } finally {
            setPaymentLoading(false);
        }
    }, []);

    const downloadPaymentReceipt = useCallback(async (paymentId) => {
        setIsDownloading(true);

        try {
            const blob = await downloadReceipt(paymentId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `receipt-${paymentId}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

            toast.success("Receipt downloaded successfully.");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to download receipt."
            );
        } finally {
            setIsDownloading(false);
        }
    }, []);

    return {
        handleVerifyPayment,
        isVerifying,
        isCreating,
        handleCreateOrder,
        handleLoadPayments,
        handleGetPaymentById,
        isLoadingPayments,
        paymentDetail,
        paymentLoading,
        downloadPaymentReceipt,
        isDownloading,
        payments,
    };
};


