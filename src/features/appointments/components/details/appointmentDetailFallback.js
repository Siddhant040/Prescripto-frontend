import {
  CalendarDays,
  Clock3,
  Fingerprint,
  IndianRupee,
  Mail,
  Phone,
  ReceiptIndianRupee,
  UserRound,
  VenusAndMars,
  CircleX,
  LocationEdit,
} from "lucide-react";
import {
  formatAppointmentDate,
  formatAppointmentTime,
} from "../appointmentUiData";

export const appointmentDetailFallback = {
  id: "apt-1",
  date: "2026-07-18T10:30:00.000Z",
  status: "confirmed",
  clinicName: "Apollo Hospital",
  bookingDate: "2026-07-10T09:15:00.000Z",
  paymentStatus: "Pending",
  patientPhone: "Not added",
  patientGender: "Not added",
  patientAge: "Not added",
  doctor: {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    consultationFee: 700,
    avatar: "",
    email: "sarah.johnson@example.com",
  },
  patient: {
    name: "Aarav Mehta",
    email: "aarav@example.com",
    avatar: "",
  },
};

export const getAppointmentInfoRows = (appointment) => [
  {
    label: "Date",
    value: formatAppointmentDate(appointment.date),
    icon: CalendarDays,
  },
  {
    label: "Time",
    value: formatAppointmentTime(appointment.date),
    icon: Clock3,
  },
  {
    label: "Appointment ID",
    value: appointment.id,
    icon: Fingerprint,
  },
  {
    label: "Status",
    value: appointment.status,
    icon: CircleX,
  },
  {
    label: "Consultation Fee",
    value: `Rs. ${appointment.doctor?.consultationFee || 0}`,
    icon: IndianRupee,
  },
  {
    label: "Payment Status",
    value: appointment.paymentStatus || "Not Initiated",
    icon: ReceiptIndianRupee,
  },
];

export const getPatientInfoRows = (appointment) => [
  {
    label: "Name",
    value: appointment.patient?.name,
    icon: UserRound,
  },
  {
    label: "Email",
    value: appointment.patient?.email,
    icon: Mail,
  },
  {
    label: "Phone",
    value: appointment.patient.phone,
    icon: Phone,
  },
  {
    label: "Gender",
    value: appointment.patient.gender,
    icon: VenusAndMars,
  },
  {
    label: "Date of Birth",
    value:  formatAppointmentDate(appointment.patient.dateOfBirth),
    icon: UserRound,
  },
  {
    label: "Address",
    value:  appointment.patient.address,
    icon: LocationEdit,
  },
];
