import {
  Activity,
  CalendarClock,
  ClipboardPlus,
  FileText,
} from "lucide-react";

export const overviewCards = [
  {
    title: "Upcoming Visits",
    value: "03",
    note: "Next appointment in 2 days",
    icon: CalendarClock,
  },
  {
    title: "Prescriptions",
    value: "08",
    note: "2 refills need attention",
    icon: ClipboardPlus,
  },
  {
    title: "Reports",
    value: "14",
    note: "Lab and consultation history",
    icon: FileText,
  },
  {
    title: "Health Score",
    value: "86%",
    note: "Steady care follow-up this month",
    icon: Activity,
  },
];

export const upcomingAppointments = [
  {
    doctor: "Dr. Aisha Kapoor",
    specialty: "Cardiologist",
    date: "28 May 2026",
    time: "10:30 AM",
    mode: "In Clinic",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Rahul Mehta",
    specialty: "Dermatologist",
    date: "31 May 2026",
    time: "04:15 PM",
    mode: "Video Consult",
    status: "Upcoming",
  },
];

export const prescriptions = [
  {
    name: "Atorvastatin 10mg",
    instruction: "1 tablet after dinner",
    refill: "Refill in 5 days",
  },
  {
    name: "Vitamin D3",
    instruction: "1 capsule every Sunday",
    refill: "Enough for 3 weeks",
  },
  {
    name: "Skin Care Gel",
    instruction: "Apply nightly",
    refill: "Refill requested",
  },
];

export const healthSummary = [
  { label: "Blood Group", value: "B+" },
  { label: "Allergies", value: "Penicillin" },
  { label: "Primary Goal", value: "Routine heart check-ups" },
  { label: "Insurance", value: "Active" },
];

export const recentActivity = [
  {
    title: "Consultation completed",
    description: "Follow-up visit with Dr. Aisha Kapoor finished successfully.",
    time: "Yesterday",
  },
  {
    title: "Prescription updated",
    description: "A new medication note was added to your treatment plan.",
    time: "2 days ago",
  },
  {
    title: "Report uploaded",
    description: "Blood work summary is now available in your history.",
    time: "5 days ago",
  },
];
