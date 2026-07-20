
import { loadRazorpay } from "./loadRazorpay";

export const openRazorpayCheckout = async (options)=>{

   await loadRazorpay();
return new Promise((resolve, reject) => {

    const razorpayOptions ={
        ...options,
        handler : (response) => {
            resolve({
                        providerOrderId: response.razorpay_order_id,
                        providerPaymentId: response.razorpay_payment_id,
                        providerSignature: response.razorpay_signature,
                    });
        },
        modal : {
            ondismiss : () => {
                reject(new Error("Payment cancelled by user"));
            }
        }
    }


    const checkout = new window.Razorpay(razorpayOptions);
checkout.on("payment.failed", (response) => {
    reject(new Error(response.error.description || "Payment failed"));
});
      
checkout.open();
})


}


// const handleOpenCheckout = () => {
//     const providerOrder = orderData?.providerOrder;

//     if (!providerOrder) {
//       toast.error("Create a payment order first");
//       return;
//     }

//     if (!window.Razorpay) {
//       toast.error("Razorpay checkout script is not loaded");
//       return;
//     }

//     const options = {
//       key: providerOrder.keyId,
//       amount: providerOrder.amount,
//       currency: providerOrder.currency,
//       name: "Prescripto",
//       description: "Doctor appointment payment",
//       order_id: providerOrder.id,
//       handler: async (razorpayResponse) => {
//         try {
//           const response = await verifyPayment({
//             providerOrderId: razorpayResponse.razorpay_order_id,
//             providerPaymentId: razorpayResponse.razorpay_payment_id,
//             providerSignature: razorpayResponse.razorpay_signature
//           });

//           setVerifyData(response.data);
//           toast.success(response.message || "Payment verified");
//           await handleLoadPayments();
//         } catch (error) {
//           toast.error(
//             error.response?.data?.message || "Payment verification failed"
//           );
//         }
//       },
//       modal: {
//         ondismiss: () => {
//           toast("Payment window closed");
//         }
//       },
//       theme: {
//         color: "#0f766e"
//       }
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };