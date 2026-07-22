import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";


import PaymentDetailHero from "../components/details/PaymentDetailHero";
import PaymentInfoGrid from "../components/details/PaymentInfoGrid";
import PaymentTimeline from "../components/details/PaymentTimeline";
import {
  doctorPaymentDetailFallback,
  getAppointmentInfoRows,
  getPaymentInfoRows,
  getPeopleInfoRows,
} from "../components/details/paymentDetailFallback";
import { usePayment } from "../hooks/usePayment";
import { useEffect } from "react";

function DoctorPaymentDetails() {
  const { id } = useParams();
   const { paymentDetail, paymentLoading,handleGetPaymentById } = usePayment();
  
  
    const payment = paymentDetail;
    console.log(payment);
  
    useEffect(() => {
      handleGetPaymentById(id);
    }, [id]);
    if(!payment){
      return <div>Loading</div>;
    }
    if (paymentLoading) {
      return <div>Loading</div>;
    }

  return (
    <div className="w-full px-1 pb-1">
      <Link
        to="/doctor-dashboard/payment"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Payments
      </Link>

      <div className="mb-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
          Payment details
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
          Review patient payment and appointment transaction details.
        </h1>
      </div>

      <div className="space-y-4">
        <PaymentDetailHero payment={payment} focus="patient" />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <PaymentInfoGrid
            title="Payment information"
            rows={getPaymentInfoRows(payment)}
          />
          <PaymentInfoGrid
            title="Appointment information"
            rows={getAppointmentInfoRows(payment)}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <PaymentInfoGrid
            title="Patient and doctor"
            rows={getPeopleInfoRows(payment)}
          />
          <PaymentTimeline payment={payment} />
        </div>

       
      </div>
    </div>
  );
}

export default DoctorPaymentDetails;
