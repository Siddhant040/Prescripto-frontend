export const appointmentStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const sampleAppointments = [
  {
    id: "apt-1",
    date: "2026-07-18T10:30:00.000Z",
    status: appointmentStatus.CONFIRMED,
    doctor: {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      consultationFee: 700,
      avatar: "",
    },
  },
  {
    id: "apt-2",
    date: "2026-07-20T14:00:00.000Z",
    status: appointmentStatus.PENDING,
    doctor: {
      name: "Dr. Michael Chen",
      specialization: "Dermatology",
      consultationFee: 500,
      avatar: "",
    },
  },
  {
    id: "apt-3",
    date: "2026-06-29T11:00:00.000Z",
    status: appointmentStatus.COMPLETED,
    doctor: {
      name: "Dr. Emily Watson",
      specialization: "Neurology",
      consultationFee: 900,
      avatar: "",
    },
  },
  {
    id: "apt-4",
    date: "2026-06-22T16:15:00.000Z",
    status: appointmentStatus.CANCELLED,
    doctor: {
      name: "Dr. James Wilson",
      specialization: "Orthopedic",
      consultationFee: 650,
      avatar: "",
    },
  },
  {
    id: "apt-5",
    date: "2026-07-25T09:00:00.000Z",
    status: appointmentStatus.CONFIRMED,
    doctor: {
      name: "Dr. Priya Patel",
      specialization: "General Physician",
      consultationFee: 400,
      avatar: "",
    },
  },
];

export const getAppointmentStats = (appointments) => {
  const upcomingStatuses = [
    appointmentStatus.PENDING,
    appointmentStatus.CONFIRMED,
  ];

  return {
    upcoming: appointments.filter((item) => upcomingStatuses.includes(item.status))
      .length,
    completed: appointments.filter(
      (item) => item.status === appointmentStatus.COMPLETED
    ).length,
    cancelled: appointments.filter(
      (item) => item.status === appointmentStatus.CANCELLED
    ).length,
    total: appointments.length,
  };
};

export const formatAppointmentDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatAppointmentTime = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const getInitials = (name) => {
  if (!name) return "DR";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};
