import { useEffect, useMemo, useState } from "react";
import { Clock3, CreditCard, IndianRupee, ReceiptText } from "lucide-react";
import PaymentFilters from "../components/PaymentFilters";
import PaymentStatCards from "../components/PaymentStatCards";
import PaymentTable from "../components/PaymentTable";
import { usePayment } from "../hooks/usePayment";

function DoctorPayment() {
  const { handleLoadPayments, payments, isLoadingPayments } = usePayment();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    handleLoadPayments(page, limit);
  }, [page, handleLoadPayments]);

  useEffect(() => {
    setPage(1);
  }, [search, status, method]);

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedStatus = status.toLowerCase();
    const normalizedMethod = method.toLowerCase();

    return payments.filter((payment) => {
      const paymentStatus = String(payment.status || "").toLowerCase();
      const paymentMethod = String(payment.provider || "razorpay").toLowerCase();
      const searchText = [
        payment.id,
        payment.patient?.name,
        payment.patient?.email,
        payment.speciality,
        payment.appointment?.id,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchText.includes(normalizedSearch);
      const matchesStatus =
        normalizedStatus === "all" || paymentStatus === normalizedStatus;
      const matchesMethod =
        normalizedMethod === "all" || paymentMethod === normalizedMethod;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, method, search, status]);

  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredPayments.slice(start, start + limit);
  }, [filteredPayments, page]);

  const summary = useMemo(() => {
    const paid = payments.filter((payment) => payment.status === "paid");
    const pending = payments.filter((payment) => payment.status === "pending");

    return {
      total: payments.length,
      earned: paid.reduce((sum, payment) => sum + payment.amount, 0),
      pending: pending.length,
      pendingAmount: pending.reduce((sum, payment) => sum + payment.amount, 0),
    };
  }, [payments]);

  const stats = [
    {
      label: "Total Payments",
      value: summary.total,
      note: "All patient transactions",
      icon: ReceiptText,
      accent: "bg-slate-100 text-slate-700",
    },
    {
      label: "Earnings",
      value: `Rs. ${summary.earned}`,
      note: "Successfully paid",
      icon: IndianRupee,
      accent: "bg-teal-50 text-teal-700",
    },
    {
      label: "Pending",
      value: summary.pending,
      note: `Rs. ${summary.pendingAmount} outstanding`,
      icon: Clock3,
      accent: "bg-amber-50 text-amber-700",
    },
    {
      label: "Pending Amount",
      value: `₹${summary.pendingAmount}`,
      note: "Outstanding amount in checkout",
      icon: CreditCard,
      accent: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Doctor payments
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
            Track patient payments and earnings.
          </h1>
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
          payments={paginatedPayments}
          loading={isLoadingPayments}
          page={page}
          limit={limit}
          total={filteredPayments.length}
          onPageChange={setPage}
          detailsBasePath="/doctor-dashboard/payment"
          pendingAction="details"
          displayPerson="patient"
          subtitleText="Consultation"
        />
      </div>
    </div>
  );
}

export default DoctorPayment;
