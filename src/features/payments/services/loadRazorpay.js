export const loadRazorpay = () => {
    if (window.Razorpay) {
        return Promise.resolve(true);
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    return new Promise((resolve, reject) => {
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
        document.body.appendChild(script);
    });
};

// Is Razorpay already loaded?
//         │
//       Yes ─────────► return immediately
//         │
//        No
//         │
//         ▼
// Create <script>
//         │
//         ▼
// Append to document
//         │
//         ▼
// Browser downloads SDK
//         │
//         ├──────────────┐
//         ▼              ▼
// Downloaded      Download Failed
//         │              │
//  resolve(true)   reject(error)
//         │
//         ▼
// window.Razorpay is now available