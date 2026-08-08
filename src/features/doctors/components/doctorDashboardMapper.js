import {
  BadgeCheck,
  CalendarClock,
  Star,
  DollarSign,
  HeartPulse,
  MessageSquareMore,
  Stethoscope,
  UsersRound,
} from "lucide-react";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (value) => {
  if (typeof value === "string" && /^\d{2}:\d{2}/.test(value)) {
    const [hoursValue, minutesValue] = value.split(":");
    const hours = Number(hoursValue);
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutesValue} ${suffix}`;
  }

  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Time not available";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getAppointmentDate = (appointment) =>
  appointment?.appointmentDate || appointment?.date || appointment?.appointmentDateTime;

const getAppointmentTime = (appointment) =>
  appointment?.appointmentTime ||
  appointment?.slot?.start ||
  appointment?.appointmentDateTime ||
  appointment?.date;

const getPatient = (appointment) =>
  appointment?.patient || appointment?.patientId || appointment?.user || {};

const getDoctorName = (doctor) => {
  if (!doctor) return "Doctor";
  if (doctor.user?.name?.startsWith("Dr.")) return doctor.user.name;
  return doctor.user?.name ? `Dr. ${doctor.user.name}` : "Doctor";
};

const getAvailabilitySummary = (availability = []) => {
  const activeDays = availability.filter((item) => item?.slots?.length > 0);
  if (activeDays.length === 0) return "No slots added";
  if (activeDays.length === 7) return "All week";
  if (activeDays.length === 1) return activeDays[0].day;

  return `${activeDays[0].day} - ${activeDays[activeDays.length - 1].day}`;
};

export const mapDoctorHero = (doctor, appointments = []) => {
  const nextAppointment = appointments
    .filter((item) =>
      ["pending", "confirmed"].includes(item?.status) &&
      new Date(getAppointmentDate(item)).getTime() >= Date.now()
    )
    .sort(
      (left, right) =>
        new Date(getAppointmentDate(left)) - new Date(getAppointmentDate(right))
    )[0];

  return {
    eyebrow: "Doctor dashboard",
    title: `Welcome, ${getDoctorName(doctor)}.`,
    description:
      "Manage consultations, patient requests, reports, and daily clinic flow from a focused workspace built for doctors.",
    cards: [
      {
        icon: HeartPulse,
        label: "Next Visit",
        value: nextAppointment
          ? `${formatTime(getAppointmentTime(nextAppointment))} ${formatDate(getAppointmentDate(nextAppointment)) ===
            formatDate(new Date())
            ? "today"
            : formatDate(getAppointmentDate(nextAppointment))
          }`
          : "No visit scheduled",
      },
      {
        icon: BadgeCheck,
        label: "Status",
        value: doctor?.isVerified ? "Verified doctor" : "Verification pending",
      },
      {
        icon: Stethoscope,
        label: "Specialty",
        value: doctor?.specialization || "Specialty not added",
      },
    ],
  };
};

export const mapDoctorOverviewCards = (doctor, appointments = [], reviews = []) => {
  const todayLabel = new Date().toDateString();
  const todayAppointments = appointments.filter((item) => {
    const date = new Date(getAppointmentDate(item));
    return !Number.isNaN(date.getTime()) && date.toDateString() === todayLabel;
  });
 

  const weeklyEarnings = appointments
    .filter((item) => item?.paymentStatus === "paid")
    .reduce((total, item) => {
      const appointmentFee =
        item?.consultationFee ||
        item?.payment?.amount ||
        item?.doctor?.consultationFee ||
        doctor?.consultationFee ||
        0;

      return total + Number(appointmentFee || 0);
    }, 0);

  return [
    {
      title: "Today's Patients",
      value: String(todayAppointments.length).padStart(2, "0"),
      note: todayAppointments.length
        ? `${todayAppointments.filter((item) => item?.status === "completed").length} check-ins already completed`
        : "No patient visits scheduled today",
      icon: UsersRound,
    },
    {
      title: "Consultations",
      value: String(
        todayAppointments.filter((item) =>
          ["pending", "confirmed"].includes(item?.status)
        ).length
      ).padStart(2, "0"),
      note: todayAppointments.length
        ? "Remaining for today"
        : "Your next consultations will appear here",
      icon: CalendarClock,
    },
    {
      title: "Average Rating",
      value: reviews.length
        ? (
          reviews.reduce(
            (sum, review) => sum + Number(review.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
        : "—",
      note: reviews.length
        ? `Based on ${reviews.length} patient reviews`
        : "No patient reviews yet",
      icon: Star,
    },
    {
      title: "Estimated Earnings",
      value: formatCurrency(weeklyEarnings),
      note: reviews.length
        ? `${reviews.length} patient reviews received`
        : "This week's paid appointments",
      icon: DollarSign,
    },
  ];
};

export const mapTodaySchedule = (appointments = []) =>
  appointments
    .filter((item) => {
      const date = new Date(getAppointmentDate(item));
      return !Number.isNaN(date.getTime()) && date.toDateString() === new Date().toDateString();
    })
    .sort(
      (left, right) =>
        new Date(getAppointmentDate(left)) - new Date(getAppointmentDate(right))
    )
    .map((item) => {
      const patient = getPatient(item);

      return {
        patient: patient?.name || "Patient",
        concern:
          item?.reason ||
          item?.appointmentType ||
          item?.type ||
          "General consultation",
        time: formatTime(getAppointmentTime(item)),
        type: item?.mode || item?.consultationMode || "In Clinic",
      };
    });

export const mapDoctorQuickInfo = (doctor) => [
  { label: "Doctor ID", value: doctor?._id || "Not assigned" },
  { label: "Specialty", value: doctor?.specialization || "Not added" },
  {
    label: "Availability",
    value: getAvailabilitySummary(doctor?.availability),
  },
  {
    label: "Status",
    value: doctor?.isAvailable ? "Active" : "Unavailable",
  },
];

export const mapPatientRequests = (appointments = [], reviews = []) => {
  const pendingAppointments = appointments.filter((item) => item?.status === "pending");
  const confirmedAppointments = appointments.filter(
    (item) => item?.status === "confirmed"
  );
  const unreadReviewCount = reviews.length;

  return [
    {
      name: "New patient requests",
      detail: pendingAppointments.length
        ? `${pendingAppointments.length} appointments are still waiting for confirmation.`
        : "No new patient requests are waiting right now.",
      icon: UsersRound,
    },
    {
      name: "Confirmed consultations",
      detail: confirmedAppointments.length
        ? `${confirmedAppointments.length} confirmed visits are lined up for follow-up.`
        : "No confirmed consultations need attention at the moment.",
      icon: CalendarClock,
    },
    {
      name: "Patient reviews",
      detail: unreadReviewCount
        ? `${unreadReviewCount} published reviews are available on your profile.`
        : "No patient reviews have been added yet.",
      icon: MessageSquareMore,
    },
  ];
};
