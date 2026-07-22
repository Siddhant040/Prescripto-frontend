export const downloadReceipt = async (paymentId) => {

    const response = await api.get(
        `/payment/${paymentId}/receipt`,
        {
            responseType: "blob",
        }
    );

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");

    link.href = url;

    link.download = `receipt-${paymentId}.pdf`;

    link.click();

    window.URL.revokeObjectURL(url);
};