import { Clock3, CreditCard, IndianRupee, ReceiptText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PaymentFilters from "../components/PaymentFilters";
import PaymentStatCards from "../components/PaymentStatCards";
import PaymentTable from "../components/PaymentTable";
import { usePayment } from "../hooks/usePayment";


const PatientPaymentPage = () => {


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10
    ;

  const {
    payments,
    isLoadingPayments,
    handleLoadPayments,
  } = usePayment();

  useEffect(() => {
    handleLoadPayments(page, 10);
  }, [page]);

  

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedStatus = status.toLowerCase();
    const normalizedMethod = method.toLowerCase();

    return payments.filter((payment) => {
      const paymentStatus = String(payment.status || "Pending").toLowerCase();
      const paymentMethod = String(payment.method || payment.provider || "Razorpay").toLowerCase();
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

  const paymentSummary = useMemo(() => {
    const paidPayments = payments.filter(
      (payment) => String(payment.status || "").toLowerCase() === "paid"
    );
    const pendingPayments = payments.filter(
      (payment) => String(payment.status || "").toLowerCase() === "pending"
    );

    return {
      total: payments.length,
      paidAmount: paidPayments.reduce((total, payment) => total + (payment.amount || 0), 0),
      pendingAmount: pendingPayments.reduce((total, payment) => total + (payment.amount || 0), 0),
      paidCount: paidPayments.length,
      pendingCount: pendingPayments.length,
    };
  }, [payments]);

  const stats = [
    {
      label: "Total Payments",
      value: paymentSummary.total,
      note: "All payments in your account",
      icon: ReceiptText,
      accent: "bg-slate-100 text-slate-700",
    },
    {
      label: "Paid Amount",
      value: `₹${paymentSummary.paidAmount}`,
      note: `${paymentSummary.paidCount} payments collected`,
      icon: IndianRupee,
      accent: "bg-teal-50 text-teal-700",
    },
    {
      label: "Pending Payments",
      value: paymentSummary.pendingCount,
      note: "Payments waiting for completion",
      icon: Clock3,
      accent: "bg-amber-50 text-amber-700",
    },
    {
      label: "Pending Amount",
      value: `₹${paymentSummary.pendingAmount}`,
      note: "Outstanding amount in checkout",
      icon: CreditCard,
      accent: "bg-amber-50 text-amber-700",
    },
  ];


  if (isLoadingPayments) {
    return <div>Loading...</div>;
  }


  return (
    <div className="w-full px-1 pb-1">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            My payments
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-950">
            Manage your payments
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        <PaymentStatCards stats={stats} />
        <PaymentFilters
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          method={method}
          onMethodChange={(value) => {
            setMethod(value);
            setPage(1);
          }}
        />
        <PaymentTable
          payments={paginatedPayments}
          loading={isLoadingPayments}
          page={page}
          limit={limit}
          total={filteredPayments.length}
          onPageChange={setPage}

        />
      </div>
    </div>
  );
};

export default PatientPaymentPage;
