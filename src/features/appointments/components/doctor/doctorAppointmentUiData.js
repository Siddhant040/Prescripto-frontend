import {
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  Stethoscope,
  UserRound,
  VenusAndMars,
} from "lucide-react";
import {
  formatAppointmentDate,
  formatAppointmentTime,
} from "../appointmentUiData";

export const doctorAppointmentStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};



export const getDoctorAppointmentStats = (appointments) => {
  const today = new Date();

  return {
    today: appointments.filter(
      (item) => new Date(item.date).toDateString() === today.toDateString()
    ).length,
    pending: appointments.filter((item) => item.status === "pending").length,
    completed: appointments.filter((item) => item.status === "completed")
      .length,
    cancelled: appointments.filter((item) => item.status === "cancelled")
      .length,
  };
};

export const getPatientAge = (dateOfBirth) => {
  if (!dateOfBirth) return "Not available";

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return "Not available";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return `${age} Years`;
};

export const getDoctorAppointmentInfoRows = (appointment) => [
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
    label: "Status",
    value: appointment.status,
    icon: Stethoscope,
  },
];

export const getDoctorPatientInfoRows = (appointment) => [
  {
    label: "Age",
    value: getPatientAge(appointment.patient?.dateOfBirth),
    icon: UserRound,
  },
  {
    label: "Gender",
    value: appointment.patient?.gender,
    icon: VenusAndMars,
  },
  {
    label: "Phone",
    value: appointment.patient?.phone,
    icon: Phone,
  },
  {
    label: "Email",
    value: appointment.patient?.email,
    icon: Mail,
  },
];

export const getInitials = (name) => {
  if (!name) return "PT";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};
