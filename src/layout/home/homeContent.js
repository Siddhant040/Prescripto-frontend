import { CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";

export const highlights = [
  {
    title: "Verified Specialists",
    description:
      "Explore experienced doctors across key specialties with transparent profiles and availability.",
    icon: Stethoscope,
  },
  {
    title: "Smooth Booking",
    description:
      "Book visits in a few taps with a patient flow built to feel simple, fast, and stress-free.",
    icon: CalendarDays,
  },
  {
    title: "Trusted Follow-up",
    description:
      "Keep appointments, care history, and next actions in one place instead of scattered chats and notes.",
    icon: ShieldCheck,
  },
];

export const metrics = [
  { value: "50+", label: "specialties ready to list" },
  { value: "10k+", label: "future patients supported" },
  { value: "24/7", label: "appointment access experience" },
];

export const careSteps = [
  "Search doctors by specialty and fit.",
  "Learn about the platform and how it supports patient access.",
  "Contact the admin team directly whenever you need help.",
];

export const specialtyCards = [
  {
    title: "General Medicine",
    note: "First-stop care for ongoing health needs and everyday concerns.",
  },
  {
    title: "Dermatology",
    note: "Personalized skin care support with a clearer path to treatment.",
  },
  {
    title: "Pediatrics",
    note: "Thoughtful care experiences designed for children and parents.",
  },
  {
    title: "Cardiology",
    note: "Heart-focused guidance backed by easier follow-up and scheduling.",
  },
];

export const featuredDoctors = [
  {
    id: "aisha-kapoor",
    name: "Dr. Aisha Kapoor",
    specialty: "Cardiologist",
    experience: "12 years experience",
    rating: 4.9,
    review:
      "She explained every step clearly and made the whole consultation feel calm and reassuring.",
  },
  {
    id: "rahul-mehta",
    name: "Dr. Rahul Mehta",
    specialty: "Dermatologist",
    experience: "9 years experience",
    rating: 4.8,
    review:
      "Very patient, very clear, and the treatment plan was easy to follow from day one.",
  },
  {
    id: "neha-sharma",
    name: "Dr. Neha Sharma",
    specialty: "Pediatrician",
    experience: "11 years experience",
    rating: 4.9,
    review:
      "Wonderful with children and great at helping parents feel confident after the visit.",
  },
];
