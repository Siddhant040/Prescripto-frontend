import { useMemo, useState } from "react";
import { Clock3, CreditCard, IndianRupee, ReceiptText, XCircle } from "lucide-react";

import PaymentFilters from "../components/PaymentFilters";
import PaymentStatCards from "../components/PaymentStatCards";
import PaymentTable from "../components/PaymentTable";

const fallbackPayments = [
  {
    id: "PMT-1001",
    doctor: "Dr. Rahul Sharma",
    speciality: "Cardiologist",
    appointmentDate: "20 Jul 2026",
    appointmentTime: "10:30 AM",
    amount: 500,
    currency: "INR",
    method: "Razorpay",
    status: "Paid",
    createdAt: "18 Jul 2026",
  },
  {
    id: "PMT-1002",
    doctor: "Dr. Amit Gupta",
    speciality: "Dermatologist",
    appointmentDate: "22 Jul 2026",
    appointmentTime: "02:00 PM",
    amount: 800,
    currency: "INR",
    method: "Razorpay",
    status: "Pending",
    createdAt: "18 Jul 2026",
  },
  {
    id: "PMT-1003",
    doctor: "Dr. Neha Singh",
    speciality: "Orthopedic",
    appointmentDate: "25 Jul 2026",
    appointmentTime: "11:45 AM",
    amount: 1200,
    currency: "INR",
    method: "Razorpay",
    status: "Failed",
    createdAt: "17 Jul 2026",
  },
    {
    id: "PMT-1001",
    doctor: "Dr. Rahul Sharma",
    speciality: "Cardiologist",
    appointmentDate: "20 Jul 2026",
    appointmentTime: "10:30 AM",
    amount: 500,
    currency: "INR",
    method: "Razorpay",
    status: "Paid",
    createdAt: "18 Jul 2026",
  },
  {
    id: "PMT-1003",
    doctor: "Dr. Neha Singh",
    speciality: "Orthopedic",
    appointmentDate: "25 Jul 2026",
    appointmentTime: "11:45 AM",
    amount: 1200,
    currency: "INR",
    method: "Razorpay",
    status: "Failed",
    createdAt: "17 Jul 2026",
  },
];

const PatientPaymentPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return fallbackPayments.filter((payment) => {
      const searchText = [
        payment.doctor,
        payment.speciality,
        payment.id,
        payment.appointmentDate,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchText.includes(normalizedSearch);
      const matchesStatus = status === "All" || payment.status === status;
      const matchesMethod = method === "All" || payment.method === method;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [method, search, status]);

  const paymentSummary = useMemo(() => {
    const paid = fallbackPayments.filter((payment) => payment.status === "Paid");
    const pending = fallbackPayments.filter(
      (payment) => payment.status === "Pending"
    );
    const failed = fallbackPayments.filter(
      (payment) => payment.status === "Failed"
    );

    return {
      paidAmount: paid.reduce((total, payment) => total + payment.amount, 0),
      pendingAmount: pending.reduce(
        (total, payment) => total + payment.amount,
        0
      ),
      total: fallbackPayments.length,
      paid: paid.length,
      pending: pending.length,
      failed: failed.length,
    };
  }, []);

  const stats = [
    {
      label: "Total",
      value: paymentSummary.total,
      note: "All transactions",
      icon: CreditCard,
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Paid",
      value: `Rs. ${paymentSummary.paidAmount}`,
      note: `${paymentSummary.paid} completed`,
      icon: IndianRupee,
      accent: "bg-teal-50 text-teal-700",
    },
    {
      label: "Pending",
      value: paymentSummary.pending,
      note: `Rs. ${paymentSummary.pendingAmount} due`,
      icon: Clock3,
      accent: "bg-amber-50 text-amber-700",
    },
    {
      label: "Failed",
      value: paymentSummary.failed,
      note: "Need attention",
      icon: XCircle,
      accent: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            My payments
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
            Manage appointment payments and receipts.
          </h1>
        </div>

        <div className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700">
          <ReceiptText className="h-4 w-4" />
          Rs. {paymentSummary.paidAmount} Paid
        </div>
      </div>

      <div className="space-y-4">
        <PaymentStatCards stats={stats} />
        <PaymentFilters
          search={search}
          onSearch={setSearch}
          status={status}
          onStatusChange={setStatus}
          method={method}
          onMethodChange={setMethod}
        />
        <PaymentTable
          payments={filteredPayments}
          page={1}
          limit={10}
          total={filteredPayments.length}
        />
      </div>
    </div>
  );
};

export default PatientPaymentPage;
