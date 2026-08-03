import {
  CalendarRange,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Search,
  Stethoscope,
  XCircle
} from "lucide-react";

const statusLabelMap = {
  pending: "Upcoming",
  confirmed: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
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

export const formatDate = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatTime = (value) => {
  if (typeof value === "string" && /^\d{2}:\d{2}/.test(value)) {
    const [hourValue, minuteValue] = value.split(":");
    const hour = Number(hourValue);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minuteValue} ${suffix}`;
  }

  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getAppointmentDoctor = (appointment) =>
  appointment?.doctor || appointment?.doctorId || appointment?.doctorProfile || {};

const getCityFromAddress = (address = "") => {
  if (!address) return "Not added";
  return address.split(",").map((part) => part.trim()).filter(Boolean)[0] || address;
};

const calculateProfileCompletion = (user) => {
  const fields = [
    user?.name,
    user?.email,
    user?.phone,
    user?.gender,
    user?.dateOfBirth,
    user?.address,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
};

export const mapPatientProfile = (user) => ({
  name: user?.name || "Patient",
  email: user?.email || "Not added",
  phone: user?.phone || "Not added",
  gender: user?.gender || "Not added",
  dob: user?.dateOfBirth || "",
  city: getCityFromAddress(user?.address),
  avatarFallback: getInitials(user?.name),
  profileCompletion: calculateProfileCompletion(user),
});

export const mapHeroContent = (upcomingAppointment, stats) => ({
  eyebrow: "Patient dashboard",
  title: "Care coordination that stays simple",
  description:
    upcomingAppointment?.id
      ? "Track your upcoming visit, review recent bookings, and reach the right specialist without leaving your Prescripto workspace."
      : "You do not have an upcoming appointment yet. Find a verified doctor and book your next consultation.",
  primaryAction: {
    label: "View appointments",
    icon: CalendarRange,
  },
  secondaryAction: {
    label: "Find doctors",
    icon: Search,
  },
  nextVisit: upcomingAppointment,
  totalAppointments: stats.total,
  upcomingCount: stats.upcoming,
  profileCompletion: stats.profileCompletion,
});

export const quickActions = [
  {
    title: "Find doctors",
    description: "Browse specialists by expertise and availability.",
    icon: Search,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Book appointment",
    description: "Reserve your next consultation in a few steps.",
    icon: CalendarRange,
    accent: "bg-teal-50 text-teal-700",
  },
  {
    title: "My appointments",
    description: "Review upcoming, completed, and cancelled visits.",
    icon: Clock3,
    accent: "bg-sky-50 text-sky-700",
  },
  {
    title: "Edit profile",
    description: "Keep your contact details and account data current.",
    icon: CircleUserRound,
    accent: "bg-amber-50 text-amber-700",
  },
];

export const mapAppointment = (appointment) => {
  const doctor = getAppointmentDoctor(appointment);
  const doctorUser = doctor?.user || {};
  const doctorName = doctor.name || doctorUser.name;

  return {
    id: appointment?._id || appointment?.id,
    doctorName: doctorName || "Doctor",
    specialization: doctor.specialization || "Specialist",
    dateLabel: formatDate(appointment?.appointmentDate || appointment?.date),
    timeLabel: formatTime(
      appointment?.appointmentTime || appointment?.slot?.start || appointment?.date
    ),
    hospital: doctor.clinicAddress || "Clinic details not available",
    status: statusLabelMap[appointment?.status] || "Upcoming",
    avatarFallback: getInitials(doctorName),
    avatar:appointment?.doctor?.avatar
  };
};

export const getDashboardStats = (appointments, profileCompletion) => {
  const upcoming = appointments.filter((item) =>
    ["pending", "confirmed"].includes(item.status)
  ).length;
  const completed = appointments.filter((item) => item.status === "completed").length;
  const cancelled = appointments.filter((item) => item.status === "cancelled").length;

  return {
    total: appointments.length,
    upcoming,
    completed,
    cancelled,
    profileCompletion,
    cards: [
      {
        label: "Total appointments",
        value: appointments.length,
        note: "Across all bookings",
        delta: "All time",
        icon: CalendarRange,
        accent: "bg-emerald-50 text-emerald-700",
      },
      {
        label: "Upcoming",
        value: upcoming,
        note: "Scheduled next",
        delta: upcoming ? "Active" : "None",
        icon: Clock3,
        accent: "bg-teal-50 text-teal-700",
      },
      {
        label: "Completed",
        value: completed,
        note: "Visits finished",
        delta: completed ? "Done" : "No visits",
        icon: CheckCircle2,
        accent: "bg-lime-50 text-lime-700",
      },
      {
        label: "Cancelled",
        value: cancelled,
        note: "Appointments cancelled",
        delta: cancelled ? "Review" : "Clear",
        icon: XCircle,
        accent: "bg-rose-50 text-rose-700",
      },
    ],
  };
};

export const getUpcomingAppointment = (appointments) => {
  const now = Date.now();
  const upcoming = appointments
    .filter((item) => ["pending", "confirmed"].includes(item.status))
    .sort(
      (a, b) =>
        new Date(a.appointmentDate || a.date) - new Date(b.appointmentDate || b.date)
    )
    .find((item) => new Date(item.appointmentDate || item.date).getTime() >= now);

  return upcoming ? mapAppointment(upcoming) : null;
};

export const mapRecommendedDoctors = (doctors = []) =>
  console.log("doctors",doctors) ||
  doctors.slice(0, 3).map((doctor) => ({
    id: doctor._id,
    name: doctor.user?.name || "Doctor",
    specialization: doctor.specialization || "Specialist",
    experience: `${doctor.experience || 0} years experience`,
    rating: doctor.rating || 0,
    reviewCount: doctor.totalReviews || 0,
    avatarFallback: getInitials(doctor.user?.name),
    avatar: doctor.user.avatar,
  }));

export const mapRecentActivity = (appointments = []) =>
  appointments.slice(0, 3).map((appointment) => {
    const doctor = getAppointmentDoctor(appointment);
    const doctorName = doctor.name || doctor.user?.name || "Doctor";

    return {
      id: appointment._id || appointment.id,
      title:
        appointment.status === "completed"
          ? "Appointment completed"
          : appointment.status === "cancelled"
            ? "Appointment cancelled"
            : "Appointment scheduled",
      description: `${doctorName} - ${doctor.specialization || "Consultation"}`,
      timeLabel: formatDate(appointment.appointmentDate || appointment.date),
      icon: CalendarRange,
      accent: "bg-emerald-50 text-emerald-700",
    };
  });

export const sidebarNote = {
  title: "Find the right doctor faster",
  description:
    "Use specialty filters and recent reviews to narrow the best match for your next visit.",
  icon: Stethoscope,
};
