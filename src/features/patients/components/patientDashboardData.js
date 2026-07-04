import {
  CalendarRange,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Search,
  Star,
  Stethoscope,
  XCircle,
} from "lucide-react";

export const patientProfile = {
  name: "Aarav Mehta",
  email: "aarav.mehta@example.com",
  phone: "+91 98765 43210",
  gender: "Male",
  dob: "1997-08-14",
  city: "Ahmedabad",
  avatarFallback: "AM",
  profileCompletion: 82,
};

export const dashboardHeader = {
  greeting: "Good morning, Aarav",
  subtitle: "Here is a clear view of your appointments, doctors, and profile progress.",
  searchPlaceholder: "Search doctors or appointments",
};

export const heroContent = {
  eyebrow: "Patient dashboard",
  title: "Care coordination that stays simple",
  description:
    "Track upcoming visits, review recent bookings, and reach the right specialist without leaving your Prescripto workspace.",
  primaryAction: {
    label: "Book appointment",
    icon: CalendarRange,
  },
  secondaryAction: {
    label: "Find doctors",
    icon: Search,
  },
};

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

export const stats = [
  {
    label: "Total appointments",
    value: 12,
    note: "Across all bookings",
    delta: "+2 this month",
    icon: CalendarRange,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Upcoming",
    value: 3,
    note: "Scheduled next",
    delta: "Next in 2 days",
    icon: Clock3,
    accent: "bg-teal-50 text-teal-700",
  },
  {
    label: "Completed",
    value: 7,
    note: "Visits finished",
    delta: "2 with follow-up",
    icon: CheckCircle2,
    accent: "bg-lime-50 text-lime-700",
  },
  {
    label: "Cancelled",
    value: 2,
    note: "Appointments missed",
    delta: "1 rescheduled",
    icon: XCircle,
    accent: "bg-rose-50 text-rose-700",
  },
];

export const upcomingAppointment = {
  doctorName: "Dr. Sarah Johnson",
  specialization: "Cardiologist",
  dateLabel: "03 Jul 2026",
  timeLabel: "10:30 AM",
  hospital: "Apollo Care Clinic",
  avatarFallback: "SJ",
};

export const recentAppointments = [
  {
    id: "APT-1024",
    doctorName: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    dateLabel: "03 Jul 2026",
    timeLabel: "10:30 AM",
    hospital: "Apollo Care Clinic",
    status: "Upcoming",
  },
  {
    id: "APT-1008",
    doctorName: "Dr. Michael Chen",
    specialization: "Dermatologist",
    dateLabel: "28 Jun 2026",
    timeLabel: "04:00 PM",
    hospital: "Derma Health Studio",
    status: "Completed",
  },
  {
    id: "APT-0992",
    doctorName: "Dr. Emily Watson",
    specialization: "Neurologist",
    dateLabel: "18 Jun 2026",
    timeLabel: "11:00 AM",
    hospital: "NeuroPoint Hospital",
    status: "Completed",
  },
  {
    id: "APT-0977",
    doctorName: "Dr. James Wilson",
    specialization: "Orthopedic",
    dateLabel: "11 Jun 2026",
    timeLabel: "02:15 PM",
    hospital: "MotionCare Center",
    status: "Cancelled",
  },
];

export const recommendedDoctors = [
  {
    id: "DOC-101",
    name: "Dr. Riya Kapoor",
    specialization: "Dermatologist",
    experience: "8 years experience",
    rating: 4.8,
    reviewCount: 124,
    avatarFallback: "RK",
  },
  {
    id: "DOC-102",
    name: "Dr. Neel Shah",
    specialization: "General Physician",
    experience: "11 years experience",
    rating: 4.9,
    reviewCount: 208,
    avatarFallback: "NS",
  },
  {
    id: "DOC-103",
    name: "Dr. Meera Iyer",
    specialization: "ENT Specialist",
    experience: "6 years experience",
    rating: 4.7,
    reviewCount: 89,
    avatarFallback: "MI",
  },
];

export const recentActivity = [
  {
    id: "ACT-1",
    title: "Appointment confirmed",
    description: "Your cardiology consultation with Dr. Sarah Johnson is confirmed.",
    timeLabel: "2h ago",
    icon: CalendarRange,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "ACT-2",
    title: "Profile updated",
    description: "Contact information was refreshed for smoother appointment reminders.",
    timeLabel: "Yesterday",
    icon: CircleUserRound,
    accent: "bg-sky-50 text-sky-700",
  },
  {
    id: "ACT-3",
    title: "Review submitted",
    description: "You left a rating for Dr. Michael Chen after your visit.",
    timeLabel: "3 days ago",
    icon: Star,
    accent: "bg-amber-50 text-amber-700",
  },
];

export const sidebarNote = {
  title: "Find the right doctor faster",
  description:
    "Use specialty filters and recent reviews to narrow the best match for your next visit.",
  icon: Stethoscope,
};
