import {
  CalendarDays,
  Clock3,
  CreditCard,
  FileText,
  IndianRupee,
  Mail,
  ReceiptText,
  Stethoscope,
  UserRound,
} from "lucide-react";

export const paymentDetailFallback = {
  id: "PMT-1001",
  amount: 500,
  currency: "INR",
  status: "paid",
  provider: "razorpay",
  providerOrderId: "order_sample_1001",
  providerPaymentId: "pay_sample_1001",
  paidAt: "2026-07-20T10:40:00.000Z",
  failedAt: null,
  refundedAt: null,
  failureReason: "",
  refundReason: "",
  createdAt: "2026-07-20T10:30:00.000Z",
  updatedAt: "2026-07-20T10:40:00.000Z",
  appointment: {
    id: "APT-1001",
    date: "2026-07-20T10:30:00.000Z",
    status: "confirmed",
  },
  patient: {
    id: "PAT-1001",
    name: "Shanu Jadoun",
    email: "shanu@example.com",
    avatar: "",
  },
  doctor: {
    id: "DOC-1001",
    name: "Dr. Rahul Sharma",
    email: "rahul@example.com",
    avatar: "",
    specialization: "Cardiologist",
    consultationFee: 500,
  },
};

export const doctorPaymentDetailFallback = {
  id: "DPMT-2001",
  amount: 800,
  currency: "INR",
  status: "paid",
  provider: "razorpay",
  providerOrderId: "order_doctor_sample_2001",
  providerPaymentId: "pay_doctor_sample_2001",
  paidAt: "2026-07-21T09:20:00.000Z",
  failedAt: null,
  refundedAt: null,
  failureReason: "",
  refundReason: "",
  createdAt: "2026-07-21T09:10:00.000Z",
  updatedAt: "2026-07-21T09:20:00.000Z",
  appointment: {
    id: "APT-2001",
    date: "2026-07-21T09:00:00.000Z",
    status: "confirmed",
  },
  patient: {
    id: "PAT-2001",
    name: "Aarav Mehta",
    email: "aarav@example.com",
    avatar: "",
  },
  doctor: {
    id: "DOC-2001",
    name: "Dr. Ansh",
    email: "ansh@example.com",
    avatar: "",
    specialization: "Cardiologist",
    consultationFee: 800,
  },
};

export const getInitials = (name = "") => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "NA";
};

export const formatDateTime = (value) => {
  const date = new Date(value);

  if (!value || Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDate = (value) => {
  const date = new Date(value);

  if (!value || Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatCurrency = (amount, currency = "INR") => {
  if (amount === null || amount === undefined) {
    return "Not available";
  }

  return `${currency === "INR" ? "Rs." : currency} ${amount}`;
};

export const getPaymentInfoRows = (payment) => [
  {
    label: "Payment ID",
    value: payment.id,
    icon: ReceiptText,
  },
  {
    label: "Provider",
    value: payment.provider,
    icon: CreditCard,
  },
  {
    label: "Provider Order",
    value: payment.providerOrderId,
    icon: FileText,
  },
  {
    label: "Provider Payment",
    value: payment.providerPaymentId,
    icon: FileText,
  },
  {
    label: "Created",
    value: formatDateTime(payment.createdAt),
    icon: CalendarDays,
  },
  {
    label: "Updated",
    value: formatDateTime(payment.updatedAt),
    icon: Clock3,
  },
];

export const getAppointmentInfoRows = (payment) => [
  {
    label: "Appointment ID",
    value: payment.appointment?.id,
    icon: FileText,
  },
  {
    label: "Appointment Date",
    value: formatDateTime(payment.appointment?.date),
    icon: CalendarDays,
  },
  {
    label: "Appointment Status",
    value: payment.appointment?.status,
    icon: Clock3,
  },
  {
    label: "Consultation Fee",
    value: formatCurrency(payment.doctor?.consultationFee, payment.currency),
    icon: IndianRupee,
  },
];

export const getPeopleInfoRows = (payment) => [
  {
    label: "Patient",
    value: payment.patient?.name,
    icon: UserRound,
  },
  {
    label: "Patient Email",
    value: payment.patient?.email,
    icon: Mail,
  },
  {
    label: "Doctor",
    value: payment.doctor?.name,
    icon: Stethoscope,
  },
  {
    label: "Specialization",
    value: payment.doctor?.specialization,
    icon: Stethoscope,
  },
];
