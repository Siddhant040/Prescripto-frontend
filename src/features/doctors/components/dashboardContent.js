import {
  CalendarClock,
  ClipboardCheck,
  DollarSign,
  UsersRound,
} from "lucide-react";

export const doctorOverviewCards = [
  {
    title: "Today's Patients",
    value: "18",
    note: "5 check-ins already completed",
    icon: UsersRound,
  },
  {
    title: "Consultations",
    value: "07",
    note: "Remaining for today",
    icon: CalendarClock,
  },
  {
    title: "Pending Notes",
    value: "04",
    note: "Need summary updates",
    icon: ClipboardCheck,
  },
  {
    title: "Estimated Earnings",
    value: "₹24k",
    note: "This week's appointments",
    icon: DollarSign,
  },
];

export const todaySchedule = [
  {
    patient: "Aarav Mehta",
    concern: "Routine cardiology follow-up",
    time: "10:30 AM",
    type: "In Clinic",
  },
  {
    patient: "Riya Sharma",
    concern: "Heart rate review",
    time: "12:15 PM",
    type: "Video Consult",
  },
  {
    patient: "Kabir Nanda",
    concern: "ECG report discussion",
    time: "03:00 PM",
    type: "In Clinic",
  },
];

export const patientRequests = [
  {
    name: "New patient request",
    detail: "2 new patients are waiting for approval this afternoon.",
  },
  {
    name: "Prescription review",
    detail: "3 medication renewals are marked for attention.",
  },
  {
    name: "Unread messages",
    detail: "5 patient questions need a response before evening.",
  },
];

export const doctorQuickInfo = [
  { label: "Doctor ID", value: "DR-1184" },
  { label: "Specialty", value: "Cardiology" },
  { label: "Availability", value: "Mon - Sat" },
  { label: "Status", value: "Active" },
];
